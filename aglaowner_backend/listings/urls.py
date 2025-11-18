from django.urls import path
from .views import ListingListCreate
from .views import ListingImageCreateAPIView, ListingListView, ListingDetailView, FavoriteListCreateView, FavoriteDestroyView, VisitRequestListCreateView

urlpatterns = [
    path('listings/', ListingListCreate.as_view(), name='listing-list-create'),
    path('listingimages/', ListingImageCreateAPIView.as_view(), name='listing-images-list-create'),
    path("listings/<int:pk>/", ListingDetailView.as_view(), name="listing-detail"),
    path("favorites/", FavoriteListCreateView.as_view(), name="favorites-list-create"),
    path("favorites/<int:pk>/", FavoriteDestroyView.as_view(), name="favorites-destroy"),
    path("visit-requests/", VisitRequestListCreateView.as_view(), name="visit-requests-list-create"),
]


