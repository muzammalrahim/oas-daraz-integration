import operator
from functools import reduce

from drf_yasg import renderers
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.views import APIView

from inventory import models as inventory_model
from inventory.models import Inventory, ProductCategory, Manufacturer, ProductRating
from inventory.serializers import ProductRatingsSerializer
from shop_setting.models import ShopSetting
from user.models import Supplier
from inventory import serializers as inventory_serializer
from oas.pagination import CustomPagination
from rest_framework.decorators import api_view, action, renderer_classes
from rest_framework.status import (
    HTTP_200_OK,
)
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.request import Request
from utils import utils
from django.db.models import Count, Q
import inventory.helper as  inventory_helper
import json


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = inventory_model.Enquiry.objects.all()
    serializer_class = inventory_serializer.EnquirySerializer
    filter_backends = (OrderingFilter,)
    filterset_fields = ['part_number__part_number', 'phone_number', 'status']
    search_fields = ['country__name', 'customer__user__email', 'email_address', 'phone_number', 'status',
                     'part_number__part_number', 'created_at', 'company__company_name']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name="delete-all")
    def destroy_all(self, request):
        ids = request.data.get('ids', [])
        inventory_model.Enquiry.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class ProductEnquiryViewSet(viewsets.ModelViewSet):
    queryset = inventory_model.ProductEnquiry.objects.all()
    serializer_class = inventory_serializer.ProductEnquirySerializer
    filter_backends = (OrderingFilter,)
    filterset_fields = ['part_number__part_number', 'enquiry__status']
    search_fields = ['part_number__part_number', 'enquiry__status']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name='delete-all')
    def destry_all(self, request):
        ids = request.data.get('ids', [])
        inventory_model.ProductEnquiry.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class InventoryViewSet(viewsets.ModelViewSet):
    queryset = inventory_model.Inventory.objects.all()
    serializer_class = inventory_serializer.InventorySerializer
    pagination_class = CustomPagination
    filter_backends = (OrderingFilter,)
    filterset_fields = ['condition', 'status', 'hazmat', 'hot_sale_item', 'unit_of_measure']
    search_fields = ['part_number', 'alt_part_number', 'quantity', 'tag_date', 'unit_price',
                     'supplier__company_name', 'product_category__name', 'product_manufacturer__name']

    def retrieve(self, request: Request, *args, **kwargs):
        instance = self.get_object()
        if instance.product_title:
            titles = instance.product_title.split(' ')
        else:
            titles = instance.part_number.split(' ')

        serializer = self.get_serializer(instance)
        data = serializer.data
        # TODO: change the query
        related_products = Inventory.objects.filter(
            reduce(operator.or_,
                   (Q(part_number__icontains=x) | Q(product_title__icontains=x) for x in titles))).exclude(
            id=instance.id)[:10]

        data['related_products'] = self.get_serializer(related_products, many=True).data
        return Response(data)


@action(detail=False, methods=['post'], url_path='delete-all', url_name="delete-all")
def destroy_all(self, request, *args, **kwargs):
    ids = request.data.get('ids', [])
    inventory_model.Inventory.objects.filter(id__in=ids).delete()
    return Response(status=HTTP_200_OK)


class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = inventory_model.Manufacturer.objects.all()
    serializer_class = inventory_serializer.ManufacturerSerializer
    filter_backends = (OrderingFilter,)

    search_fields = ['name']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name='delete-all')
    def delete_all(self, request):
        ids = request.data.get('ids', [])
        inventory_model.Manufacturer.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = inventory_model.ProductCategory.objects.all()
    serializer_class = inventory_serializer.ProductCategorySerializer
    filter_backends = (OrderingFilter,)

    search_fields = ['name']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name='delete-all')
    def delete_all(self, request):
        ids = request.data.get('ids', [])
        inventory_model.ProductCategory.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


@api_view(['POST'])
def import_data(request):
    data = request.data.get('data')
    model = request.data.get('model')

    # models direct fields
    import_data_structure = {
        'Inventory': ['part_number', 'alt_part_number', 'short_description', 'condition', 'product_title', \
                      'quantity', 'unit_price', 'tag_date', 'hazmat', 'certification', \
                      'unit_of_measure', 'stock_location', 'turn_around_time', 'un_code', 'hot_sale_item',
                      'description', \
                      ],
    }

    # model relational fields
    import_data_relations = {
        'Inventory': {
            'product_category': {'model': 'ProductCategory', 'field': 'name', 'related_name': 'product_category_id',
                                 'additional_data': {}},
            'product_manufacturer': {'model': 'Manufacturer', 'field': 'name',
                                     'related_name': 'product_manufacturer_id', 'additional_data': {}},
            'supplier': {'model': 'Supplier', 'field': 'company_name', 'related_name': 'supplier_id',
                         'additional_data': {}},
        },
    }

    boolean_cols = []
    integer_cols = []
    date_cols = ['tag_date']
    yes_no_cols = ['hazmat', 'hot_sale_item']
    # try:
    if model in import_data_structure:
        # list of columns that are allowed to import
        allowCols = import_data_structure[model]
        allowReladedCols = import_data_relations[model]

        if data:
            # csv columns input by user
            inputCols = data.pop(0)
            data_new = inventory_helper.update_duplicates(data[0:-1])
            objects = []
            for row in data_new:
                if any(row):
                    obj = eval(model)()
                    for index, col in enumerate(inputCols):

                        if not utils.validFieldValue(obj, col, row[index]):
                            row[index] = 0
                        # return Response({'success':False, 'message':'Value of column {} is not valid at row # {}'.format(col.title(), data.index(row)+2)})
                        # check if column is allowed
                        if col in allowCols:
                            # need to set True or False for integers
                            if col in boolean_cols:
                                row[index] = True if int(row[index]) == 1 else False

                            if col in integer_cols:
                                try:
                                    row[index] = int(row[index])
                                except:
                                    row[index] = 0

                            if col in date_cols:
                                try:
                                    row[index] = utils.validate(row[index])
                                except:
                                    row[index] = None

                            # for yes no choices allowed only Yes, No
                            if col in yes_no_cols:
                                v = row[index].title()
                                if v in ['Yes', 'No']:
                                    row[index] = v
                                else:
                                    row[index] = None

                            if col == 'unit_of_measure':
                                v = row[index].upper()
                                if v in ['CM', 'BOX', 'KG']:
                                    row[index] = v
                                else:
                                    row[index] = None

                            if not row[index] or row[index] == "":
                                row[index] = None

                            setattr(obj, col, row[index])

                        # lets check if cols belongs to related model than get id
                        for relCol in allowReladedCols:
                            finalRelatedColId = None
                            related_model = globals()[allowReladedCols[relCol]['model']]
                            kwargs = {}
                            if 'default' in allowReladedCols[relCol] and allowReladedCols[relCol][
                                'default'] is not None:
                                kwargs = {allowReladedCols[relCol]['field']: allowReladedCols[relCol]['default']}
                            elif relCol in inputCols:
                                # find column index and than value
                                kwargs = {allowReladedCols[relCol]['field']: row[inputCols.index(relCol)]}

                            # check for additional column data - like for manufacuture we need to save their type also so check that
                            additional_data = allowReladedCols[relCol]['additional_data']
                            if additional_data:
                                for ad in additional_data:
                                    # check if input has data with this column name
                                    if additional_data[ad] in inputCols:
                                        # find column index and than value
                                        kwargs[ad] = row[inputCols.index(additional_data[ad])]
                                    else:
                                        # for static data
                                        kwargs[ad] = additional_data[ad]

                            queryset = related_model.objects.filter(**kwargs)

                            # check if related item not exist than create new
                            if not queryset.exists():
                                if 'fetchOnly' not in allowReladedCols[relCol] and kwargs[
                                    allowReladedCols[relCol]['field']] != '' and kwargs[
                                    allowReladedCols[relCol]['field']] is not None:
                                    related_model(**kwargs).save()
                                    finalRelatedColId = queryset.first().id
                            else:
                                finalRelatedColId = queryset.first().id

                            setattr(obj, allowReladedCols[relCol]['related_name'], finalRelatedColId)

                    obj.status = 1
                    objects.append(obj)
            model = eval(model)

            inventory_helper.update_inventory(model, objects)
            model.objects.bulk_create(objects)

    return Response({'success': True, 'message': 'Record has been imported suscessfully'})


@api_view(['GET'])
def get_conditions(request):
    queryset = inventory_model.Inventory.objects.filter(status=1).exclude(condition__isnull=True).values_list(
        'condition', flat=True).distinct()
    conditions = set(list(dict.fromkeys(queryset))) | set(['NE', 'NS', 'SV', 'AR', 'FN', 'US', 'RP'])
    return Response({"conditions": conditions}, status=HTTP_200_OK)


@api_view(['GET'])
def get_products(request, *args, **kwargs):
    search = request.query_params.get('search')
    if search:
        queryset = Inventory.objects.filter(product_title__icontains=search).values('id', 'product_title')
        return Response(queryset, status=HTTP_200_OK)
    else:
        return Response([])


class FeaturedProductsView(generics.ListAPIView):
    queryset = inventory_model.Inventory.objects.all().order_by('-created_at')
    serializer_class = inventory_serializer.InventorySerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        setting = ShopSetting.objects.all().first()
        limit = setting.featured_product
        if not limit:
            limit = 8
        return self.queryset.filter(featured_product=True)[:limit]


class BestSellerProductsView(generics.ListAPIView):
    queryset = inventory_model.Inventory.objects.filter(best_seller=True).order_by('-created_at')
    serializer_class = inventory_serializer.InventorySerializer
    pagination_class = CustomPagination


# Deprecated
class ProductRatingView(generics.CreateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = ProductRatingsSerializer
    lookup_field = "pk"

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product=self.get_object())


@api_view(['POST'])
def product_rating_view(request, pk, *args, **kwargs):
    if not request.user.is_authenticated:
        return Response({"detail": "Unauthorized user"}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = ProductRatingsSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    try:
        product = Inventory.objects.get(pk=pk)
    except Inventory.DoesNotExist:
        return Response({"detail", "not found"}, status=status.HTTP_404_NOT_FOUND)

    product_rating = ProductRating.objects.filter(user=request.user, product=product)
    if not product_rating.exists():
        serializer.save(product=product, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        serializer.instance = product_rating.first()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteRatingView(generics.DestroyAPIView):
    queryset = ProductRating.objects.all()
    lookup_field = "pk"
