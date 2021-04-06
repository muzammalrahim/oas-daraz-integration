from django.contrib.auth.backends import ModelBackend
from user.models import User
from django.db.models import Q


class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, username=None, password=None,
                     **kwargs):
        try:  # to allow authentication through phone number or any other field, modify the below statement
            user = User.objects.get(
                Q(username__iexact=username) | Q(email__iexact=email))
        except User.DoesNotExist:
            User().set_password(password)
        except MultipleObjectsReturned:
            return User.objects.filter(email=username).order_by('id').first()
        else:
            if user.check_password(password) and self.user_can_authenticate(
                    user):
                return user

    def get_user(self, user_id):
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None
