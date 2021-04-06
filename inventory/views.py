from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from inventory import models as inventory_model
from inventory.models import Inventory, ProductCategory, Manufacturer
from user.models import Supplier
from inventory import serializers as inventory_serializer
from oas.pagination import CustomPagination
from rest_framework.decorators import api_view, action
from rest_framework.status import (
	HTTP_200_OK,
)
from rest_framework.response import Response
from rest_framework.request import Request
from utils import utils
from django.db.models import Count
import inventory.helper as  inventory_helper
import json


class EnquiryViewSet(viewsets.ModelViewSet):
	queryset = inventory_model.Enquiry.objects.all()
	serializer_class = inventory_serializer.EnquirySerializer
	filter_backends = (OrderingFilter,)
	filterset_fields = ['part_number__part_number', 'phone_number','status']
	search_fields = ['country__name','customer__user__email','email_address','phone_number','status', 'part_number__part_number','created_at', 'company__company_name']

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
		ids = request.data.get('ids',[])
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
		serializer = self.get_serializer(instance)
		data = serializer.data
		data['product_image_name'] = instance.product_image.name
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
		'Inventory':['part_number','alt_part_number','short_description','condition','product_title',\
		'quantity','unit_price','tag_date', 'hazmat', 'certification',\
		'unit_of_measure', 'stock_location','turn_around_time', 'un_code','hot_sale_item','description',\
		],
	}

	# model relational fields
	import_data_relations = {
		'Inventory': {
			'product_category' : {'model': 'ProductCategory', 'field':'name', 'related_name':'product_category_id', 'additional_data':{}},
			'product_manufacturer' : {'model': 'Manufacturer', 'field':'name', 'related_name':'product_manufacturer_id', 'additional_data':{}},
			'supplier' : {'model': 'Supplier', 'field':'company_name', 'related_name':'supplier_id', 'additional_data':{}},
		},
	}

	boolean_cols = []
	integer_cols = []
	date_cols = ['tag_date']
	yes_no_cols = ['hazmat','hot_sale_item']
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
							if 'default' in allowReladedCols[relCol] and allowReladedCols[relCol]['default'] is not None:
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
								if 'fetchOnly' not in allowReladedCols[relCol] and kwargs[allowReladedCols[relCol]['field']] != '' and kwargs[allowReladedCols[relCol]['field']] is not None:
									related_model(**kwargs).save()
									finalRelatedColId = queryset.first().id
							else:
								finalRelatedColId = queryset.first().id

							setattr(obj, allowReladedCols[relCol]['related_name'], finalRelatedColId)

					obj.status = 1
					objects.append(obj)
			model = eval(model)

			inventory_helper.update_inventory(model,objects)
			model.objects.bulk_create(objects)

	return Response({'success':True, 'message':'Record has been imported suscessfully'})


@api_view(['GET'])
def get_conditions(request):
	queryset = inventory_model.Inventory.objects.filter(status=1).exclude(condition__isnull=True).values_list('condition', flat=True).distinct()
	conditions = set(list(dict.fromkeys(queryset))) | set(['NE', 'NS', 'SV', 'AR', 'FN', 'US', 'RP'])
	return Response({"conditions":conditions}, status=HTTP_200_OK)
