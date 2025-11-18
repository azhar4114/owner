from django.core.management.base import BaseCommand
from listings.models import Listing, ListingImage
from faker import Faker
import random
from django.conf import settings
import os

class Command(BaseCommand):
    help = 'Load dummy listings into the database with sample images'

    def handle(self, *args, **options):
        fake = Faker()
        property_types = ['AP', 'HS', 'CN', 'VL']

        # Define paths to the two image files
        img1 = 'listing_images/Screenshot_2025-11-12_at_1.54.03AM.png'
        img2 = 'listing_images/Screenshot_2025-11-12_at_1.54.13AM.png'
        img1_path = os.path.join(settings.MEDIA_ROOT, img1)
        img2_path = os.path.join(settings.MEDIA_ROOT, img2)

        # Check if files exist
        if not (os.path.isfile(img1_path) and os.path.isfile(img2_path)):
            self.stdout.write(self.style.ERROR("Sample images not found in media/listing_images/. Please check the paths and try again."))
            return

        for _ in range(100):
            listing = Listing.objects.create(
                title=fake.sentence(nb_words=4),
                description=fake.paragraph(nb_sentences=5),
                price=random.randint(1000000, 10000000),
                address=fake.address(),
                city=fake.city(),
                state=fake.state(),
                zipcode=fake.zipcode(),
                property_type=random.choice(property_types),
                bedrooms=random.randint(1, 5),
                bathrooms=random.randint(1, 4),
                area_sqft=random.randint(500, 5000),
                latitude=float(fake.latitude()),
                longitude=float(fake.longitude()),
                amenities=', '.join(fake.words(nb=5)),
            )

            # Create 2 images for each listing
            ListingImage.objects.create(listing=listing, image=img1)
            ListingImage.objects.create(listing=listing, image=img2)

        self.stdout.write(self.style.SUCCESS('Loaded 100 dummy listings, each with 2 images!'))
