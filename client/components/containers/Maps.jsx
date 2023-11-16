import React from "react";
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '30vw',
  height: '70vh',
};
const center = {
  lat: 40.74473571777344, // default latitude
  lng: -73.95181274414062, // default longitude
};

const Maps = ({ }) => {
    //center, zoom
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

//   const markers = [];

//   for(let i = 0; i < markerData.length; i++){
//     markers.push(<Marker position={markerData.position} />)
//   }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={{
            mapTypeControl: false,
            fullscreenControl: false,
        }
        // onLoad={}
    }
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Maps;
