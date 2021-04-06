from user import models
from user.models import Supplier, Country
from rest_framework.filters import OrderingFilter
from user import serializers
from oas import settings
from utils.utils import get_settings
from rest_framework import viewsets
from constance import config
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from inventory.models import Enquiry, Inventory, ProductCategory, Manufacturer
from django.contrib.auth.models import Group
from rest_framework.status import (
    HTTP_200_OK
)


# Create your views here.

class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer
    filter_backends = (OrderingFilter,)

    filterset_fields = ['name', 'code']
    search_fields = ['date']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name="delete-all")
    def delete_all(self, request):
        ids = request.data.get('ids', [])
        models.Country.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = serializers.GroupSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    filter_backends = (OrderingFilter,)

    filterset_fields = ['landline_phone', ]
    search_fields = ['country__name', 'user__name', 'contact_person', 'company_name']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name='delete-all')
    def delete(self, request):
        ids = request.data.get('ids', [])
        models.Profile.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = serializers.SupplierSerializer
    filter_backends = (OrderingFilter,)

    search_fields = ['email','company_name', 'contact_person', 'landline_phone', 'mobile_Phone', 'country__name']
    filterset_fields = ['email','company_name']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name="delete-all")
    def destroy_all(self, request):
        ids = request.data.get('ids', [])
        models.Supplier.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    filter_backends = (OrderingFilter,)

    search_fields = ['user__email', 'user__first_name', 'user__last_name','country__name','mobile_Phone', 'company_name', 'contact_person', 'landline_phone']
    filterset_fields = ['user__email','country__name','mobile_Phone']

    def destroy(self, request, *args, **kwargs):
        customer = self.get_object()
        models.BillingContact.objects.filter(customer=customer).delete()
        models.ShippingContact.objects.filter(customer=customer).delete()
        return super().destroy(request, *args, **kwargs)

        
    @action(detail=False, methods=['post'], url_path='delete-all', url_name="delete-all")
    def destroy_all(self, request):
        ids = request.data.get('ids', [])
        models.BillingContact.objects.filter(customer_id__in=ids).delete()
        models.ShippingContact.objects.filter(customer_id__in=ids).delete()
        models.Customer.objects.filter(id__in=ids).delete()
        return Response(status=HTTP_200_OK)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = models.Contact.objects.all()
    serializer_class = serializers.ContactSerializer

    filterset_fields = ['company_name', 'zip_code', 'contact_person',
                        'bill_address_two', 'bill_address_one',
                        'bill_address_one']
    search_fields = ['country__name']

    @action(detail=False, methods=['post'], url_path='delete-all', url_name='delete-all')
    def delete_all(self, request):
        ids = request.data.get('id', [])
        models.Contact.objects.filter(id__in=ids)
        return Response(status=HTTP_200_OK)


class BillingContactViewSet(viewsets.ModelViewSet):
    queryset = models.BillingContact.objects.all()
    serializer_class = serializers.BillingContactSerializer


class ShippingContactViewSet(viewsets.ModelViewSet):
    queryset = models.ShippingContact.objects.all()
    serializer_class = serializers.ShippingContactSerializer


@api_view(['GET'])
def user_dashboard(request):
    enquiry_count = Enquiry.objects.count()
    inventory_count = Inventory.objects.count()
    manufactur_count = Manufacturer.objects.count()
    product_category_count = ProductCategory.objects.count()
    supplier_count = models.Supplier.objects.count()
    customer_count = models.Customer.objects.count()

    content = {
        'enquiry_count': enquiry_count,
        'inventory_count': inventory_count,
        'manufactur_count': manufactur_count,
        'product_category_count': product_category_count,
        'supplier_count': supplier_count,
        'customer_count': customer_count,

    }

    return Response(content)


class SettingViewSet(viewsets.ViewSet):

    def setting(self, request, allow_settings):
        if request.method == 'GET':
            return Response(data=get_settings(allow_settings))
        else:
            for key in request.data:
                if key in allow_settings:
                    value = request.data[key]
                    setattr(config, key, '' if value is None else value)

            return Response(data=get_settings(allow_settings))

    def create(self, request):
        allow_settings = [key for key, options in getattr(settings, 'CONSTANCE_CONFIG', {}).items()]
        return self.setting(request, allow_settings)

    def list(self, request):
        allow_settings = [key for key, options in getattr(settings, 'CONSTANCE_CONFIG', {}).items()]
        return self.setting(request, allow_settings)


def admin_panel(request):
    return render(request, 'admin/build/index.html')


@api_view(['POST'])
def oas_models(request):
    search_models = request.data.get('models')

    allowed_models = [
        'Country', 'Supplier', 'Manufacturer', 'ProductCategory'
    ]

    output = {}
    for model in search_models:
        # duplicated models will end by __{keyword}
        ending = None
        if '__' in model:
            model_, ending = model.split('__')
        else:
            model_ = model
        # check if model is allowed 
        if model_ in allowed_models:
            abmodel = globals()[model_]  # make model object
            queryset = abmodel.objects.filter()

            # apply filters on base of user params
            kwargs = {}
            maxLength = None
            for param in search_models[model]:
                if param == 'length':
                    maxLength = search_models[model][param]
                    continue
                # check if model has field mentionend in param
                # if hasattr(abmodel, param): # not work for many to many related field :(
                try:
                    kwargs['{}'.format(param)] = search_models[model][param]
                except:
                    pass
            if kwargs:
                queryset = queryset.filter(**kwargs)

            if maxLength is not None:
                queryset = queryset[:maxLength]

            # default_option = [{"id" : "", "name" : "--None--"}]
            # output[model] = default_option + list(queryset.values())
            output[model] = queryset.values()
    return Response(output, status=HTTP_200_OK)
