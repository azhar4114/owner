import ImageUpload from './ImageUpload';

function ListingDetail({ listing }) {
  return (
    <div>
      <h2>{listing.title}</h2>
      {/* Other listing info */}
      <ImageUpload listingId={listing.id} onUpload={() => /* refresh images */} />
    </div>
  );
}
