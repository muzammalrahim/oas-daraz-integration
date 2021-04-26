from user.models import User
from rest_framework.authtoken.models import Token
def is_admin(user_id):
    try:
        user = User.objects.get(id=user_id)
        if user.is_superuser:
            return True
    except:
        return False


def check_user(email):
    try:
        return User.objects.get(email=email)
    except:
        return None

def delete_token(user):
    try:
        Token.objects.get(user=user).delete()
    except:
        pass