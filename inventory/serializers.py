from rest_framework import serializers
from inventory import models as inventory_model
from utils import utils
import base64, six, uuid
from django.core.files.base import ContentFile
from user.serializers import ContactSerializer
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


class InventorySerializer(serializers.ModelSerializer):
    product_image = Base64ImageField(max_length=None, allow_null=True, use_url=True, required=False)

    def create(self, validated_data):
        part_number = validated_data.get('part_number')
        condition = validated_data.get('condition')

        try:
            product = inventory_model.Inventory.objects.filter(part_number=part_number,condition=condition).first()
            product.quantity += validated_data.get('quantity' or 0)
            product.save()
            return product
        except:
            return inventory_model.Inventory.objects.create(**validated_data)

    def to_representation(self, instance):
        representation = super(InventorySerializer, self).to_representation(instance)
        related_models = ['product_category', 'supplier', 'product_manufacturer']

        for model in related_models:
            try:
                representation[model] = utils.to_dict(getattr(instance, model))
            except:
                representation[model] = None

        return representation



    class Meta:
        model = inventory_model.Inventory
        fields = '__all__'


class EnquirySerializer(serializers.ModelSerializer):
    # def create(self, validated_data):



    def to_representation(self, instance):
        representation = super(EnquirySerializer, self).to_representation(instance)
        related_models = ['country']

        for model in related_models:
            try:
                representation[model] = utils.to_dict(getattr(instance, model))
            except:
                representation[model] = None

        try:
            representation['part_number'] = InventorySerializer(instance.part_number, many=True).data
        except:
            representation['part_number'] = None

        try:
            representation['company'] = utils.to_dict(instance.company)
        # representation['company'] = ContactSerializer(instance.company_name).data
        except:
            representation['company'] = None

        return representation
    class Meta:
        model = inventory_model.Enquiry
        fields = '__all__'
        depth=1

class ProductEnquirySerializer(serializers.ModelSerializer):

    def to_representation(self,instance):
        representation = super(ProductEnquirySerializer, self).to_representation(instance)
        related_models = ['enquiry']

        for model in related_models:
            try:
                representation[model] = utils.to_dict(getattr(instance,model))
            except:
                representation[model] = None

        try:
            representation['part_number'] = InventorySerializer(instance.part_number).data
        except:
            representation['part_number'] = None
        return representation


    class Meta:
        model = inventory_model.ProductEnquiry
        fields = '__all__'


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = inventory_model.Manufacturer
        fields = '__all__'


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = inventory_model.ProductCategory
        fields = '__all__'
