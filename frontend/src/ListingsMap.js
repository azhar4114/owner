import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

// Default and highlighted marker icons
const defaultIcon = L.divIcon({
  className: 'emoji-marker',
  html: '<div class="emoji-inner">📍</div>',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const highlightedIcon = L.divIcon({
  className: 'emoji-marker bouncing-emoji',
  html: '<div class="emoji-inner">📍</div>',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


// Only call API if bounds are actually different
function boundsChanged(prev, next) {
  if (!prev || !next) return true;
  return (
    prev._northEast.lat !== next._northEast.lat ||
    prev._northEast.lng !== next._northEast.lng ||
    prev._southWest.lat !== next._southWest.lat ||
    prev._southWest.lng !== next._southWest.lng
  );
}

// Prevent update loop
function MapBoundsHandler({ onBoundsChange }) {
  const map = useMap();

  useEffect(() => {
    const handleMoveOrZoom = () => {
      if (onBoundsChange) onBoundsChange(map.getBounds());
    };
    map.on('moveend', handleMoveOrZoom);
    map.on('zoomend', handleMoveOrZoom);

    handleMoveOrZoom();

    return () => {
      map.off('moveend', handleMoveOrZoom);
      map.off('zoomend', handleMoveOrZoom);
    };
  }, [map]);

  return null;
}

// On area/city select, programmatically pan the map
function MapPanUpdater({ center, zoom, areaRequested }) {
  const map = useMap();
  const lastArea = useRef();

  useEffect(() => {
    if (lastArea.current !== areaRequested) {
      map.setView(center, zoom || map.getZoom());
      lastArea.current = areaRequested;
    }
  }, [center, zoom, areaRequested, map]);
  return null;
}

function ListingsMap({ onListingsChange, center, zoom, areaRequested, hoveredId }) {
  const [listings, setListings] = useState([]);
  const [bounds, setBounds] = useState(null);
  const lastFetchedBounds = useRef(null);

  useEffect(() => {
    if (!bounds) return;
    if (!boundsChanged(lastFetchedBounds.current, bounds)) return;

    const timer = setTimeout(() => {
      const params = {
        ne_lat: bounds._northEast.lat,
        ne_lng: bounds._northEast.lng,
        sw_lat: bounds._southWest.lat,
        sw_lng: bounds._southWest.lng,
      };
      axios.get('http://localhost:8000/api/listings/', { params })
        .then(res => {
          setListings(res.data.results);
          if (onListingsChange) {
            onListingsChange(res.data.results);
          }
        });
      lastFetchedBounds.current = bounds;
    }, 400);

    return () => clearTimeout(timer);
  }, [bounds, onListingsChange]);

  const mapCenter = center || [20.5937, 78.9629];
  const mapZoom = zoom || 5;

  return (
    <>
      {/* Inline CSS for bounce animation */}
      <style>
        {`
			.emoji-marker .emoji-inner {
			  font-size: 2rem;
			  line-height: 1;
			  text-align: center;
			}

			.bouncing-emoji .emoji-inner {
			  animation: bounce 0.7s infinite alternate;
			}

			@keyframes bounce {
			  0% { transform: translateY(0); }
			  80% { transform: translateY(-18px); }
			  100% { transform: translateY(-12px); }
			}
			
          .bouncing-marker {
            animation: bounce 0.7s infinite alternate;
          }
        `}
      </style>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <MapPanUpdater center={mapCenter} zoom={mapZoom} areaRequested={areaRequested} />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBoundsHandler onBoundsChange={setBounds} />
        {listings.length === 0 ? null : (
          listings.map(listing =>
            listing.latitude && listing.longitude &&
            <Marker
              key={listing.id}
              position={[listing.latitude, listing.longitude]}
              icon={hoveredId === listing.id ? highlightedIcon : defaultIcon}
			  eventHandlers={{
			                mouseover: () => { /* Optionally, focus card */ },
			                mouseout: () => { /* Unfocus card */ },
			              }}
            >
              <Popup>
                <strong>{listing.title}</strong><br />
                ₹{listing.price}<br />
                {listing.city}
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </>
  );
}

export default ListingsMap;
