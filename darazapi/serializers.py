from rest_framework import serializers

from darazapi.models import Daraz


class DarazSerializer(serializers.ModelSerializer):

    class Meta:
        model = Daraz
        exclude = ('user', )
        # fields = '__all__'