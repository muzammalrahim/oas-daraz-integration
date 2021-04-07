from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
import requests as httpResuest
from rest_framework.decorators import api_view

from darazapi.models import Daraz
from darazapi.serializers import DarazSerializer
from utils.utils import get_daraz_parameter


@api_view(['GET'])
def get_products(request):
    URL = 'https://api.sellercenter.daraz.pk'
    user_id = 'creative.joomdev@gmail.com'
    key = 'TNRB6j4GO3zR98IvXSUVsyVCouh2q2UMW7fWEqrbT1TJnk-spmYidZ4f'
    action = 'GetProducts'
    attr = {'Filter': 'all'}
    # 'Limit': 100,
    # 'Offset': 0,

    parameter = get_daraz_parameter(user_id, key, action, **attr)
    r = httpResuest.get(url=URL, params=parameter)
    data = r.json()
    if 'ErrorResponse' in data.keys():
        return Response(data['ErrorResponse']['Head'])
    if 'SuccessResponse' in data.keys():
        return Response(data['SuccessResponse']['Body'])


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
        return self.request.user.daraz


class DarazUpdateView(generics.UpdateAPIView):
    serializer_class = DarazSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.daraz
