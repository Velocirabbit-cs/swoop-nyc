import React from "react";
import Item from "./Item.jsx";
import Maps from "./Maps.jsx";
import { Autocomplete } from '@react-google-maps/api';



const Listings = () => {

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Item/>
      <React.StrictMode>
        <Maps style={{borderRadius: '5px'}}/>
      </React.StrictMode>
    </div>
  )
}

export default Listings;