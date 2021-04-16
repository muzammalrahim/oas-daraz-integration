from rest_framework import serializers
import base64, six, uuid
from django.core.files.base import ContentFile

from shop_setting.models import ShopSetting, Slider


class Base64ImageField(serializers.ImageField):

    def to_internal_value(self, data):

        if isinstance(data, six.string_types):
            if 'data:' in data and ';base64,' in data:
                header, data = data.split(';base64,')

            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            if 'data-orig' in header:
                fname, garbage = header.split(';data:')
                garbage_val, file_name = fname.split('data-orig:')
                complete_file_name = "thumb_%s" % (file_name)
            else:
                file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
                file_extension = self.get_file_extension(file_name, decoded_file)
                complete_file_name = "%s.%s" % (file_name, file_extension,)
            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension

    def from_native(self, data):
        if isinstance(data, basestring) and data.startswith('data:image'):
            # base64 encoded image - decode
            format, imgstr = data.split(';base64,')  # format ~= data:image/X,
            ext = format.split('/')[-1]  # guess file extension

            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        return super(Base64ImageField, self).from_native(data)


class SlidersSerializer(serializers.ModelSerializer):
    image = Base64ImageField(max_length=None, allow_null=True, use_url=True, required=False)

    class Meta:
        model = Slider
        fields = "__all__"


class ShopSettingSerializer(serializers.ModelSerializer):
    logo = Base64ImageField(max_length=None, allow_null=True, use_url=True, required=False)

    # def create(self, validated_data):
    #
    #     slider_image_data = validated_data.get('slider_images', None)
    #     del validated_data['old_images']
    #     del validated_data['slider_images']
    #
    #     setting = ShopSetting.objects.create(**validated_data)
    #
    #     if slider_image_data:
    #         for img in slider_image_data:
    #             SliderImages.objects.create(setting=setting, image=img['image'])
    #
    #     return setting
    #
    # def update(self, instance, validated_data):
    #     slider_image_data = validated_data.get('slider_images', None)
    #     deleted_img = validated_data.get("old_images", None)
    #
    #     if slider_image_data:
    #         del validated_data['slider_images']
    #         for img in slider_image_data:
    #             SliderImages.objects.create(setting=instance, image=img['image'])
    #
    #     if deleted_img:
    #         del validated_data['old_images']
    #         for img in deleted_img:
    #             name = "sliders_img/" + img.get('name')
    #             img_file = instance.sliders.filter(image=name).first()
    #             img_file.image.delete()
    #             img_file.delete()
    #
    #     instance = super(ShopSettingSerializer, self).update(instance, validated_data)
    #     return instance
    #
    # def to_representation(self, instance):
    #     representation = super(ShopSettingSerializer, self).to_representation(instance)
    #     try:
    #         representation['sliders'] = SliderImagesSerializer(instance.sliders, many=True).data
    #     except:
    #         representation['sliders'] = None
    #     return representation
    #
    class Meta:
        model = ShopSetting
        fields = "__all__"