from rest_framework import generics
from .models import Favorite, Listing, ListingImage, VisitRequest
from .serializers import ListingSerializer, ListingImageSerializer, FavoriteSerializer, VisitRequestSerializer
from rest_framework import permissions


class ListingListCreate(generics.ListCreateAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        queryset = Listing.objects.all()
        ne_lat = self.request.query_params.get("ne_lat")
        ne_lng = self.request.query_params.get("ne_lng")
        sw_lat = self.request.query_params.get("sw_lat")
        sw_lng = self.request.query_params.get("sw_lng")
        if ne_lat and ne_lng and sw_lat and sw_lng:
            queryset = queryset.filter(
                latitude__lte=float(ne_lat),
                latitude__gte=float(sw_lat),
                longitude__lte=float(ne_lng),
                longitude__gte=float(sw_lng),
            )
        return queryset


class ListingImageCreateAPIView(generics.ListCreateAPIView):
    queryset = ListingImage.objects.all()
    serializer_class = ListingImageSerializer

# Listings List/Detail
class ListingListView(generics.ListAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingDetailView(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

# Favorites CRUD
class FavoriteListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoriteDestroyView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

# Visit Request CRUD
class VisitRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = VisitRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return VisitRequest.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
