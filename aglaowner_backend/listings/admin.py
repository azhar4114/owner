from django.contrib import admin
from .models import Listing, ListingImage

class ListingImageInline(admin.TabularInline):
    model = ListingImage
    extra = 1

@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    inlines = [ListingImageInline]
    list_display = ('title', 'price', 'city', 'bedrooms', 'bathrooms', 'property_type', 'date_posted')
    search_fields = ('title', 'city', 'address')
    list_filter = ('property_type', 'city', 'bedrooms')

admin.site.register(ListingImage)
