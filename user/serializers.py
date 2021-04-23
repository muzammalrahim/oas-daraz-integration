from rest_framework import serializers
from user import models
from django.contrib.auth.models import Group
from utils import utils
from django.contrib.auth.hashers import make_password
from django.contrib.auth.validators import UnicodeUsernameValidator
from rest_framework.validators import UniqueValidator
from . import helper as user_helper


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=models.User.objects.all())])
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        self.fields['username'].required = False

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

    def create(self, validated_data):
        password = validated_data.get('password', None)
        if password is not None:
            validated_data['password'] = make_password(password)
        validated_data['username'] = utils.generate_username(validated_data.get('first_name'), validated_data.get('last_name'))
        print('username', validated_data['username'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if self.context['request'].method == 'PATCH':
            password = validated_data.get('password', None)
            if password is not None:
                validated_data['password'] = make_password(password)
                user_helper.delete_token(instance)
        return super().update(instance, validated_data)
    class Meta:
        model = models.User
        fields = '__all__'
        extra_kwargs = {
            'username': {
                'validators': [UnicodeUsernameValidator()],
            },
        }

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'


class SupplierSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super(SupplierSerializer, self).to_representation(instance)
        related_models = ['country']

        for model in related_models:
            try:
                representation[model] = utils.to_dict(getattr(instance, model))
                # print(representation[model])
            except:
                representation[model] = None
        return representation

    class Meta:
        model = models.Supplier
        fields = '__all__'


class BillingContactSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        self.fields['customer'].required = False

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)
    class Meta:
        model = models.BillingContact
        fields = '__all__'


class ShippingContactSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        self.fields['customer'].required = False

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)
    class Meta:
        model = models.ShippingContact
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    billingcontact = BillingContactSerializer()
    shippingcontact = ShippingContactSerializer()


    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        # Instantiate the superclass normally
        response = super().__init__(*args, **kwargs)
        if self.context['request'].method not in ['POST','PATCH','PUT']:
            self.fields.pop('billingcontact')
            self.fields.pop('shippingcontact')
        return response

    def create(self, validated_data):
        user = validated_data.pop('user')
        billing_contact = validated_data.pop('billingcontact')
        shipping_contact = validated_data.pop('shippingcontact')

        user = UserSerializer(data=user)
        if user.is_valid():
            user.save()

        customer =  super().create(validated_data)

        billing_contact['customer'] = shipping_contact['customer'] = customer
        shipping_contact = ShippingContactSerializer(data=shipping_contact)
        if shipping_contact.is_valid():
            shipping_contact.save()

        billing_contact = BillingContactSerializer(data=billing_contact)
        if billing_contact.is_valid():
            billing_contact.save()

        self.fields.pop('billingcontact')
        self.fields.pop('shippingcontact')
        return customer


    def update(self, instance, validated_data):
        user = validated_data.pop('user')
        billingcontact = validated_data.pop('billingcontact')
        shippingcontact = validated_data.pop('shippingcontact')

        user = UserSerializer(data=user)
        if user.is_valid():
            user.save()

        customer =  super().update(instance, validated_data)

        billingcontact['customer'] = shippingcontact['customer'] = customer
        shippingcontact = ShippingContactSerializer(data=shippingcontact)
        if shippingcontact.is_valid():
            shippingcontact.save()

        billingcontact = BillingContactSerializer(data=billingcontact)
        if billingcontact.is_valid():
            billingcontact.save()

        self.fields.pop('billingcontact')
        self.fields.pop('shippingcontact')
        return customer


    def to_representation(self, instance):
        representation = super(CustomerSerializer, self).to_representation(instance)
        related_models = ['country', 'user']

        for model in related_models:
            try:
                representation[model] = utils.to_dict(getattr(instance, model))
            except:
                representation[model] = None
        try:
            representation['billingcontact'] = utils.to_dict(models.Contact.objects.instance_of(models.BillingContact).filter(id__in=instance.contact_set.values_list('id', flat=True)).first())
        except:
            representation['billingcontact'] = None

        try:
            representation['shippingcontact'] = utils.to_dict(models.Contact.objects.instance_of(models.ShippingContact).filter(id__in=instance.contact_set.values_list('id', flat=True)).first())
        except:
            representation['shippingcontact'] = None

        return representation


    class Meta:
        model = models.Customer
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = '__all__'