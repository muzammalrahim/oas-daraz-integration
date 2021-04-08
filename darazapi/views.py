from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
import requests as httpResuest
from rest_framework.decorators import api_view

from darazapi.models import Daraz
from darazapi.serializers import DarazSerializer
from inventory.models import Inventory
from utils.utils import get_daraz_parameter, handle_upload_url_file, get_image_from_url


# def get_category(user_id, key, categories_id):
#     URL = 'https://api.sellercenter.daraz.pk'
#     action = 'GetCategoryAttributes'
#     for id in categories_id:
#         attr = {'PrimaryCategory': id}
#         parameter = get_daraz_parameter(user_id, key, action, **attr)
#         r = httpResuest.get()
#
#     pass


@api_view(['POST'])
def get_products(request):
    URL = 'https://api.sellercenter.daraz.pk'
    # user_id = 'creative.joomdev@gmail.com'
    # key = 'TNRB6j4GO3zR98IvXSUVsyVCouh2q2UMW7fWEqrbT1TJnk-spmYidZ4f'
    action = 'GetProducts'
    attr = {'Filter': 'all'}
    serializer = DarazSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user_id = serializer.validated_data.get('userId')
        key = serializer.validated_data.get('api_key')
        parameter = get_daraz_parameter(user_id, key, action, **attr)
        r = httpResuest.get(url=URL, params=parameter)
        data = r.json()
        if 'ErrorResponse' in data.keys():
            return Response(data['ErrorResponse']['Head'])
        if 'SuccessResponse' in data.keys():
            data = (data['SuccessResponse']['Body'])
            if data['TotalProducts'] > 0:
                products = data['Products']
                # image_url = products[0]['Skus'][0]['Images'][0]
                # file = handle_upload_url_file(image_url)
                all_products = [Inventory(
                    product_title=product['Attributes']['name'],
                    short_description=product['Attributes']['short_description_en'],
                    quantity=product['Skus'][0]['quantity'],
                    unit_price=product['Skus'][0]['price'],
                    tag_date=product['Skus'][0]['special_from_date'],
                    status=1 if product['Skus'][0]['Status'] == 'active' else 0,
                    description=product['Attributes']['description'],
                    product_image=get_image_from_url(product['Skus'][0]['Images'][0]),
                    daraz_id=product['ItemId'],
                    daraz_product=True
                ) for product in products if not Inventory.objects.filter(daraz_product=True)
                    .filter(daraz_id=product['ItemId']).exists()]

                if all_products:
                    Inventory.objects.bulk_create(all_products)
                return Response({"success": True})


@api_view(['GET'])
def get_orders(request):
    URL = 'https://api.sellercenter.daraz.pk'
    user_id = 'creative.joomdev@gmail.com'
    key = 'TNRB6j4GO3zR98IvXSUVsyVCouh2q2UMW7fWEqrbT1TJnk-spmYidZ4f'
    action = 'GetOrders'
    attr = {'SortBy': 'created_at', 'SortDirection': 'DESC'}

    parameter = get_daraz_parameter(user_id, key, action, **attr)
    r = httpResuest.get(url=URL, params=parameter)
    data = r.json()
    if 'ErrorResponse' in data.keys():
        return Response(data['ErrorResponse']['Head'])
    if 'SuccessResponse' in data.keys():
        return Response(data['SuccessResponse']['Body'])


@api_view(['GET'])
def get_order(request):
    URL = 'https://api.sellercenter.daraz.pk'
    user_id = 'creative.joomdev@gmail.com'
    key = 'TNRB6j4GO3zR98IvXSUVsyVCouh2q2UMW7fWEqrbT1TJnk-spmYidZ4f'
    action = 'GetOrder'
    attr = {'OrderId': 112957238575412}

    parameter = get_daraz_parameter(user_id, key, action, **attr)
    r = httpResuest.get(url=URL, params=parameter)
    data = r.json()
    if 'ErrorResponse' in data.keys():
        return Response(data['ErrorResponse']['Head'])
    if 'SuccessResponse' in data.keys():
        return Response(data['SuccessResponse']['Body'])


class DarazCreateView(generics.CreateAPIView):
    serializer_class = DarazSerializer
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DarazCredentialView(generics.RetrieveAPIView):
    serializer_class = DarazSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        daraz_data = getattr(self.request.user, 'daraz', None)
        if daraz_data:
            return self.request.user.daraz
        else:
            return


class DarazUpdateView(generics.UpdateAPIView):
    serializer_class = DarazSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.daraz
