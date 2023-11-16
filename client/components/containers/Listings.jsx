import React from "react";
import Item from "./Item.jsx";
import Maps from "./Maps.jsx";
import { Autocomplete } from '@react-google-maps/api';



const Listings = () => {

  return (
    <div className="listings">
      <Item/>
      <div className='map-box'>
      <React.StrictMode>
        <Maps />
      </React.StrictMode>
      </div>
    </div>
  )
}

export default Listings;