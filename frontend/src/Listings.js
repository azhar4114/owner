import React, { useState, useRef } from 'react';
import ListingsMap from './ListingsMap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Carousel imports
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// SVG arrow components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 14,
        top: '50%',
        zIndex: 3,
        width: 36,
        height: 36,
        background: 'rgba(255,255,255,0.86)',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 2px 8px #0002',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
        fontSize: 24,
        color: '#2568d8',
        transition: 'background 0.2s',
		paddingLeft: '9px'
      }}
      onClick={onClick}
      tabIndex={0}
      aria-label="Next slide"
      type="button"
    >
      <svg width="22" height="22" viewBox="0 0 22 22"><path d="M7 4l6 7-6 7" stroke="#2568d8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 14,
        top: '50%',
        zIndex: 3,
        width: 36,
        height: 36,
        background: 'rgba(255,255,255,0.86)',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 2px 8px #0002',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
        fontSize: 24,
        color: '#2568d8',
        transition: 'background 0.2s',
		  paddingRight: '9px'
      }}
      onClick={onClick}
      tabIndex={0}
      aria-label="Previous slide"
      type="button"
    >
      <svg width="22" height="22" viewBox="0 0 22 22"><path d="M15 4l-6 7 6 7" stroke="#2568d8" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}

const pillStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 10px",
  borderRadius: "16px",
  background: "#f6f8fd",
  color: "#204181",
  fontWeight: 500,
  fontSize: "1rem",
  boxShadow: "0 1px 6px #dde7f688",
  border: "1px solid #dde6fa",
	cursor:"default"
};

// Updated ListingCard with SVG arrows
function ListingCard({ listing, setHoveredId }) {
	const [cardHovered, setCardHovered] = useState(false);
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`;
	
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true
  };

  return (
    <div
      style={{
        marginBottom: '28px',
        borderRadius: '16px',
        background: '#fff',
        boxShadow: '0 2px 18px 0 #0002',
        padding: '0 0 20px 0',
        display: 'flex',
boxShadow: cardHovered
          ? '0 6px 32px 0 #1570e422, 0 1.5px 7px 0 #5fa9e888'
          : '0 2px 18px 0 #0002',
        flexDirection: 'column',
        position: 'relative',
        borderLeft: '6px solid #5fa9e8',
		  borderLeft: cardHovered ? '6px solid #246afe' : '6px solid #5fa9e8',
        transition: 'box-shadow 0.3s, transform 0.3s',
        maxWidth: '430px',
        minWidth: '310px',
        width: '100%',
		   transform: cardHovered ? 'translateY(-6px) scale(1.024)' : 'none'
      }}
	  onMouseEnter={() => {
	          setCardHovered(true);
	          setHoveredId(listing.id);
	        }}
	        onMouseLeave={() => {
	          setCardHovered(false);
	          setHoveredId(null);
	        }}
    >
      <div style={{
        width: '100%',
        height: '260px',
        borderRadius: '12px 12px 0 0',
        overflow: 'hidden',
        background: "#eaf0fa",
        position: 'relative'
      }}>
        <SlickSlider {...sliderSettings}>
          {listing.images && listing.images.length > 0 ? listing.images.map(image =>
            <div key={image.id} style={{ width: '100%', height: '260px' }}>
              <img
                src={
                  image.image.startsWith('http')
                    ? image.image
                    : `http://localhost:8000${image.image}`
                }
                alt={image.caption || 'Property image'}
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  borderRadius: '12px 12px 0 0'
                }}
              />
            </div>
          ) : (
            <div style={{
              width: "100%",
              height: "260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f6fa"
            }}>
              <span style={{ color: "#bbb" }}>No Images Available</span>
            </div>
          )}
        </SlickSlider>
      </div>
  <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '10px 18px',
            fontSize: '1.02rem'
          }}
        >
          {listing.area_sqft && (<span style={pillStyle} title="Area"><span style={{ marginRight: 4 }}>📏</span>{listing.area_sqft} sqft</span>)}
          {listing.bathrooms && (<span style={pillStyle} title="Bathrooms"><span style={{ marginRight: 4 }}>🛁</span>{listing.bathrooms} Bath</span>)}
          {listing.furnishing && (<span style={pillStyle} title="Furnished"><span style={{ marginRight: 4 }}>🛋️</span>{listing.furnishing}</span>)}
          {listing.facing && (<span style={pillStyle} title="Facing"><span style={{ marginRight: 4 }}>🧭</span>{listing.facing}</span>)}
          {listing.parking != null && (<span style={pillStyle} title="Parking"><span style={{ marginRight: 4 }}>🚗</span>{listing.parking ? "Parking" : "No Parking"}</span>)}
          {listing.available_from && (<span style={pillStyle} title="Available from"><span style={{ marginRight: 4 }}>📅</span>{listing.available_from}</span>)}
        </div>
      <div style={{ padding: '18px 22px 4px 22px' }}>
        <h3 style={{
          fontSize: '1.23rem',
          fontWeight: 'bold',
          color: '#224a76',
          margin: '0 0 9px'
        }}>{listing.title}</h3>
        <div style={{
          margin: '0 0 8px',
          color: '#2c5e85',
          fontWeight: '600',
          fontSize: '1.11rem'
        }}>
          ₹{listing.price.toLocaleString()} <span style={{ fontSize: '0.95rem', color: '#456', fontWeight: '600' }}>— {listing.city}</span>
        </div>
        <div style={{ marginBottom: '6px', color: '#678', fontSize: '1rem', fontWeight: '600' }}>
          Bedrooms: {listing.bedrooms ?? "-"} &bull; Type: {listing.property_type ?? "-"}
        </div>
        <p style={{
          margin: '0',
          color: '#546b8b',
          fontSize: '0.99rem',
          minHeight: '22px'
        }}>{listing.description}</p>
  <div style={{ display: 'flex', gap: '10px', marginTop: '8px', alignItems: 'center' }}>
    {/* CALL */}
    {listing.owner_phone && (
      <a
        href={`tel:${listing.owner_phone}`}
        title="Call Owner"
        style={{ textDecoration: 'none', color: '#2e86de', fontWeight: '600', fontSize: 18 }}
      >
        📞 
      </a>
    )}
    
    {/* WHATSAPP */}
    {listing.owner_phone && (
      <a
        href={`https://wa.me/${listing.owner_phone}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        style={{ textDecoration: 'none', color: '#25d366', fontWeight: '600', fontSize: 19 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="auto" viewBox="0 0 48 48" >
<path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
</svg>
      </a>
    )}
    {/* FAVORITE / BOOKMARK */}
    <button
      title="Save Property"
      style={{
        background: 'none', border: 'none', cursor: 'pointer', fontSize: 21, color: '#e74c3c'
      }}
      onClick={() => alert("Saved for later!")} // TODO: connect to backend or localstorage
    >
      ❤️
    </button>
    {/* SHARE */}
    <button
      title="Share Property"
      style={{
        background: 'none', border: 'none', cursor: 'pointer', fontSize: 21, color: '#3b5998'
      }}
      onClick={() => {
        const url = window.location.origin + `/listing/${listing.id}`;
        if (navigator.share) {
          navigator.share({ title: listing.title, url });
        } else {
          navigator.clipboard.writeText(url);
          alert("Share link copied!");
        }
      }}
    >
      🔗
    </button>
    {/* SCHEDULE VISIT */}
    <button
      title="Schedule a Visit"
      style={{
        background: '#2bcbba',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '7px 15px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
      onClick={() => alert("Visit scheduled! (TODO: connect to backend)")}
    >
      🚗 Schedule Visit
    </button>
	  {listing.latitude && listing.longitude && (
	    <a
	      href={`https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`}
	      target="_blank"
	      rel="noopener noreferrer"
	      style={{
	        display: "inline-flex",
	        alignItems: "center",
	        padding: "6px 14px",
	        borderRadius: "16px",
	        background: "#e8f0ff",
	        color: "#2967ff",
	        fontWeight: 600,
	        fontSize: "1rem",
	        textDecoration: "none",
	        margin: "0 18px 10px 0",
	        boxShadow: "0 1px 5px #cfe2ff77",
	        border: "1px solid #b9d4ff",
	        cursor: "pointer"
	      }}
	    >
	      <span role="img" aria-label="View on map" style={{marginRight: 6}}>🗺️</span>
	      View on Map
	    </a>
	  )}
	  
  </div>
		
      </div>
    </div>
  );
}


function Listings() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [areaQuery, setAreaQuery] = useState('');
  const [areaResults, setAreaResults] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);
  const debounceRef = useRef();
  const [areaRequested, setAreaRequested] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [filterBedrooms, setFilterBedrooms] = useState('');
  const [filterType, setFilterType] = useState('any');

  const handleListingsChange = (visibleListings) => {
    setIsLoading(true);
    setListings(visibleListings);
    setIsLoading(false);
  };

  const filteredListings = listings.filter(l => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.city.toLowerCase().includes(search.toLowerCase()) ||
      ('' + l.price).includes(search);

    const matchesPrice = l.price >= priceRange[0] && l.price <= priceRange[1];

    let matchesBedrooms = true;
    if (filterBedrooms) {
      matchesBedrooms = l.bedrooms && parseInt(l.bedrooms) === parseInt(filterBedrooms);
    }

    let matchesType = filterType === 'any' || (l.property_type && l.property_type.toLowerCase() === filterType);

    return matchesSearch && matchesPrice && matchesBedrooms && matchesType;
  });

  function handleMyLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords;
        setMapCenter([latitude, longitude]);
        setMapZoom(13);
        setAreaRequested(c => c + 1);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          if (data && data.display_name) {
            setAreaQuery(data.display_name);
          }
        } catch (e) {}
      },
      err => {
        alert('Could not get your location.');
      }
    );
  }

  async function handleAreaInput(e) {
    const value = e.target.value;
    setAreaQuery(value);
    clearTimeout(debounceRef.current);

    if (value.length > 2) {
      debounceRef.current = setTimeout(async () => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1`
        );
        const data = await res.json();
        setAreaResults(data);
      }, 350);
    } else {
      setAreaResults([]);
    }
  }

  function handleAreaSelect(place) {
    setMapCenter([parseFloat(place.lat), parseFloat(place.lon)]);
    setMapZoom(13);
    setAreaRequested(c => c + 1);
    setAreaQuery(place.display_name);
    setAreaResults([]);
  }

  return (
    <div style={{
      background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
      minHeight: '100vh',
      padding: 0,
      fontFamily: 'Montserrat, Arial, sans-serif'
    }}>
      <header style={{
        padding: '24px 40px',
        background: '#162d50',
        color: '#fff',
        fontSize: '2.5rem',
        fontWeight: '700',
        letterSpacing: '4px',
        boxShadow: '0 2px 16px 0 #000a',
        textAlign: 'center'
      }}>
        aglaowner.in
      </header>
      <div style={{
        display: 'flex',
        gap: '2rem',
        padding: '32px',
        maxWidth: '1200px',
        margin: '0 auto',
        minWidth: '320px',
        width: '100%'
      }}>
        {/* MAP SECTION */}
        <div style={{
          flex: 2,
          position: 'relative',
          borderRadius: '14px',
          boxShadow: '0 2px 14px 0 #0002',
          overflow: 'hidden',
          background: '#fff',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '5px 0 0 0', zIndex: 10 }}>
            <button
              onClick={handleMyLocation}
              style={{
                background: '#3498db',
                color: 'white',
                border: 'none',
                padding: '9px 16px',
                borderRadius: '7px',
                fontWeight: '600',
                fontSize: 15,
                boxShadow: '0 2px 8px #0002',
                cursor: 'pointer',
                margin: '8px 8px 2px 15px'
              }}
            >
              📍 My Location
            </button>
            <input
              type="search"
              value={areaQuery}
              onChange={handleAreaInput}
              placeholder="Search by area, city, pincode (e.g., Powai, Mumbai)"
              style={{
                width: '96%',
                padding: '14px',
                fontSize: '1rem',
                borderRadius: '9px',
                border: '2px solid #5fa9e8',
                boxShadow: '0 2px 10px #ace',
                marginBottom: '10px',
                marginTop: '5px',
                marginLeft: '2%',
                zIndex: 10
              }}
              autoComplete="off"
            />
            {areaResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '52px',
                left: '2%',
                width: '96%',
                background: '#fff',
                boxShadow: '0 2px 12px #0004',
                borderRadius: '8px',
                zIndex: 50,
                maxHeight: '220px',
                overflowY: 'auto'
              }}>
                {areaResults.map((place, idx) => (
                  <div
                    key={place.place_id}
                    onClick={() => handleAreaSelect(place)}
                    style={{
                      cursor: 'pointer',
                      padding: '12px',
                      borderBottom: '1px solid #def',
                      background: idx % 2 ? '#f7fafc' : '#fff'
                    }}
                  >
                    {place.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1, minHeight: 0, zIndex: 0 }}>
            <ListingsMap
              onListingsChange={handleListingsChange}
              center={mapCenter}
              zoom={mapZoom}
              areaRequested={areaRequested}
              hoveredId={hoveredId}
            />
          </div>
        </div>
        {/* LIST CARD SECTION */}
        <div style={{
          flex: 1.3,
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: '12px',
          background: '#f4fafd',
          boxShadow: '0 2px 12px 0 #0001',
          padding: '18px'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
            <div style={{ width: 240, margin: "0 10px 16px" }}>
              <label style={{ fontWeight: '500', fontSize: 15, marginBottom: 4, display: 'block' }}>Price Range</label>
              <Slider
                range
                min={0}
                max={10000000}
                step={1000}
                allowCross={false}
                value={priceRange}
                onChange={setPriceRange}
              />
              <div style={{ fontSize: 13, marginTop: 2, color: "#456" }}>
                ₹{priceRange[0].toLocaleString()} – ₹{priceRange[1].toLocaleString()}
              </div>
            </div>
            <div style={{ width: 240, margin: "0 0 16px" }}>
              <label style={{ fontWeight: '500', fontSize: 15, marginBottom: 4, display: 'block' }}>No of Bedrooms</label>
              <input
                type="number"
                min={1}
                max={10}
                value={filterBedrooms}
                onChange={e => setFilterBedrooms(e.target.value)}
                placeholder="Bed Rooms"
                style={{ width: '70px', borderRadius: "5px", border: "1px solid #acd" }}
              />
            </div>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '6px', borderRadius: '5px' }}>
              <option value="any">Any Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, city, price..."
            style={{
              width: '98%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '7px',
              border: '2px solid #5fa9e8',
              fontSize: '1rem'
            }}
          />
          <h2 style={{
            fontWeight: '600',
            fontSize: '1.3rem',
            color: '#162d50',
            margin: '0 0 12px'
          }}>
            Listings in map view ({filteredListings.length})
          </h2>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <img src="/spinner.gif" alt="Loading..." style={{ width: 60 }} />
            </div>
          ) : filteredListings.length === 0 ? (
            <div style={{ color: '#888', padding: '24px 0', textAlign: 'center' }}>
              No listings visible in the current map region.
            </div>
          ) : (
            filteredListings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                setHoveredId={setHoveredId}
              />
            ))
          )}
        </div>
      </div>
      <footer style={{
        background: '#162d50',
        color: '#fff',
        padding: '18px 0',
        textAlign: 'center',
        fontSize: '1rem',
        letterSpacing: '2px',
        boxShadow: '0 -2px 14px 0 #000a'
      }}>
        &copy; {new Date().getFullYear()} aglaowner.in — Find property directly from the owner!
      </footer>
    </div>
  );
}

export default Listings;
