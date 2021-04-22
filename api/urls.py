from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path, include
from inventory import views as inventory_views
from user import views as user_views
from shop_setting import views as slider_view

router = DefaultRouter()

router.register(r'user', user_views.UserViewSet)
router.register(r'group', user_views.GroupViewSet)
router.register(r'profile', user_views.ProfileViewSet)
router.register(r'supplier', user_views.SupplierViewSet)
router.register(r'customer', user_views.CustomerViewSet)

router.register(r'contact', user_views.ContactViewSet)
router.register(r'billing-contact', user_views.BillingContactViewSet)
router.register(r'shipping-contact', user_views.ShippingContactViewSet)

router.register(r'setting', user_views.SettingViewSet, basename='settings')
router.register(r'country', user_views.CountryViewSet)

router.register(r'enquiry', inventory_views.EnquiryViewSet)
router.register(r'productenquiry', inventory_views.ProductEnquiryViewSet)
router.register(r'inventory', inventory_views.InventoryViewSet)

router.register(r'manufacturer', inventory_views.ManufacturerViewSet)
router.register(r'product-category', inventory_views.ProductCategoryViewSet)

# router.register(r'shop-setting', shop_setting_views.ShopSettingViewSet)

urlpatterns = format_suffix_patterns([
    path('accounts/', include('rest_registration.api.urls'))

])

urlpatterns += [
    path('', include(router.urls)),
    path('oas-models/', user_views.oas_models),
    path('import/', inventory_views.import_data),
    path('conditions', inventory_views.get_conditions),
    path('api-auth/', include('rest_framework.urls')),
    path('daraz/', include('darazapi.urls')),
    path('shop-setting/', include('shop_setting.urls')),
    path('products/', inventory_views.get_products, name="get_products"),
    path("sliders/", slider_view.GetSlidersView.as_view(), name="sliders_view"),
    path("sliders/create/", slider_view.CreateSlidersView.as_view(), name="create_slider_view"),
    path("sliders/<int:pk>/", slider_view.UpdateSlidersView.as_view(), name="update_slider_view"),
    path('products/<int:pk>/rating/', inventory_views.product_rating_view, name="product_rating"),
    path('products/rating/<int:pk>/', inventory_views.DeleteRatingView.as_view(), name="delete_product_rating"),
]
