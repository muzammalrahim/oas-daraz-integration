from datetime import datetime, timedelta
from urllib.parse import urlencode
from hashlib import sha256
from hmac import HMAC
import requests as httpResuest

from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response


@csrf_exempt
def get_returned_response(request):
    return HttpResponse("This is jazz-cash returned response function.")


def card_payment(request):
    return render(request, "jazzcash/index.html")


def mobile_account_payment(request):
    return render(request, "jazzcash/mobile_account.html")


def calculate_SecureHASH(txt_refNumber, mobile_no, cnic_no, amount):
    exp_date = datetime.now() + timedelta(days=1)
    exp_date = exp_date.strftime("%Y%m%d%H%M%S")

    parameters = {
        "pp_Language": "EN",
        "pp_MerchantID": "MC19849",
        "pp_SubMerchantID": "",
        "pp_Password": "19yu2gtz32",
        "pp_BankID": "",
        "pp_ProductID": "",
        "pp_TxnRefNo": txt_refNumber,
        "pp_Amount": amount,
        "pp_TxnCurrency": "PKR",
        "pp_TxnDateTime": datetime.now().strftime("%Y%m%d%H%M%S"),
        "pp_BillReference": "billRef",
        "pp_Description": "Description of transaction",
        "pp_TxnExpiryDateTime": exp_date,
        # "pp_SecureHash": "",
        "ppmpf_1": "",
        "ppmpf_2": "",
        "ppmpf_3": "",
        "ppmpf_4": "",
        "ppmpf_5": "",
        "pp_MobileNumber": mobile_no,
        "pp_CNIC": cnic_no
    }
    # integrity_salt value
    secrete_key = '5s90w8w533'
    sorted_list = sorted(parameters.items())
    concatenated = urlencode(sorted_list)
    concatenated = f'{secrete_key}&{concatenated}'
    secrete_key = bytes(secrete_key, 'utf-8')
    parameters['pp_SecureHash'] = HMAC(secrete_key, bytes(concatenated, 'utf8'), sha256).hexdigest()
    return parameters


@api_view(['GET'])
def jazz_cash_payment(request):
    URL = "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction"
    txt_refNumber = f'T{datetime.now().strftime("%Y%m%d%H%M%S")}'
    mobile_number = "03123456789"
    cnic_no = "345678"
    amount = 500
    parameters = calculate_SecureHASH(txt_refNumber, mobile_number, cnic_no, amount)
    r = httpResuest.post(url=URL, data=parameters)
    data = r.json()
    return Response({"success": True}, status=200)