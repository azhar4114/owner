from django.db import models
from django.contrib.auth.models import User

class Listing(models.Model):
    PROPERTY_TYPE_CHOICES = [
        ('AP', 'Apartment'),
        ('HS', 'House'),
        ('CN', 'Condo'),
        ('VL', 'Villa'),
        # Add more types as needed
    ]
    FURNISHING_CHOICES = [
        ('none', 'None'),
        ('partial', 'Partially Furnished'),
        ('full', 'Fully Furnished'),
    ]
    FACING_CHOICES = [
        ('N', 'North'),
        ('S', 'South'),
        ('E', 'East'),
        ('W', 'West'),
        ('NE', 'North-East'),
        ('NW', 'North-West'),
        ('SE', 'South-East'),
        ('SW', 'South-West'),
        # Add more as needed
    ]

    title = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=100, blank=True, null=True)
    owner_phone = models.CharField(max_length=15, blank=True, null=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    zipcode = models.CharField(max_length=10, blank=True)
    property_type = models.CharField(max_length=2, choices=PROPERTY_TYPE_CHOICES, blank=True, default='AP')
    bedrooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)
    area_sqft = models.PositiveIntegerField(help_text="Area in square feet", blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    image = models.ImageField(upload_to='listing_images/', blank=True, null=True)
    amenities = models.CharField(max_length=255, blank=True, help_text="Comma-separated amenities")
    date_posted = models.DateTimeField(auto_now_add=True)

    # NEW fields for UI grid
    furnishing = models.CharField(max_length=10, choices=FURNISHING_CHOICES, default='none', blank=True)
    facing = models.CharField(max_length=2, choices=FACING_CHOICES, blank=True, null=True)
    parking = models.BooleanField(default=False, help_text="Parking available")
    available_from = models.DateField(blank=True, null=True, help_text="Date available from")

    def __str__(self):
        return self.title

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='listing_images/')
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Image for {self.listing.title}"

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "listing")  # No duplicate favorites

class VisitRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="visit_requests")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="visit_requests")
    scheduled_date = models.DateTimeField()
    status = models.CharField(
        max_length=10,
        choices=[("pending", "Pending"), ("confirmed", "Confirmed"), ("rejected", "Rejected")],
        default="pending"
    )
    message = models.TextField(blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
