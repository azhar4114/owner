from rest_framework import serializers
from .models import Listing, ListingImage, Favorite, VisitRequest

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'image', 'caption']

class ListingSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)

    class Meta:
        model = Listing
        fields = '__all__'

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ["id", "user", "listing", "created_on"]
        read_only_fields = ["id", "created_on"]

class VisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        fields = ["id", "user", "listing", "scheduled_date", "status", "message", "created_on"]
        read_only_fields = ["status", "created_on"]

