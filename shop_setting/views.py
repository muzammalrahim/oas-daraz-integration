from rest_framework import generics
from shop_setting.models import ShopSetting
from shop_setting.serializers import ShopSettingSerializer


# class ShopSettingViewSet(viewsets.ModelViewSet):
#     queryset = ShopSetting.objects.all()
#     serializer_class = ShopSettingSerializer
#
#     def get_object(self):
#         return self.get_queryset().first()
#
#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_queryset().first()
#         serializer = self.get_serializer(instance)
#         return Response(serializer.data)


class GetShopSetting(generics.RetrieveUpdateAPIView):
    serializer_class = ShopSettingSerializer

    def get_object(self):
        return ShopSetting.objects.all().first()


class CreateShopSetting(generics.CreateAPIView):
    serializer_class = ShopSettingSerializer