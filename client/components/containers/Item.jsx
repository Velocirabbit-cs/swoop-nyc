import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux/es/hooks/useSelector";
import { updateItems } from "../reducers/swoopSlice";
import ItemView from "./ItemView.jsx";


const Item = () => {
  const dispatch = useDispatch();
  
  const items = useSelector((state) => {return state.swoop.items})
  const [ready, setReady] = useState(false);//can use redux state
  
  
  //function below does what the regular grabItems does in App, but returns only items in a neighborhood/borough. Takes in 2 args (strings) to filter the query on server side (via a query on the req body).
  const grabFilteredItems = async (borough,neighborhood) => {
    try {
      //fetching from item/filter router path with the queries added on
      const filteredItems = await fetch('/item/filter' + `?borough=${borough}&neighborhood=${neighborhood}`);
      console.log('fetched items...')
      filteredItems.json().then((response) => {;
      //dispatch this information to the global state
      console.log('setting ready...')
      dispatch(updateItems({response: response}));
      setReady(true)
      })
    }
    catch (err) {
      return;
    }
  };

  const populate = async () => {
    for(let i = 0; i < 10; i++){
      const loadListings = {
        title: 'Filter Test Loader',
        image:
          '/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg', //url from supabase
        description: 'A new type of cat',
        borough: 'Brooklyn',
        neighborhood: 'Bushwick',
        // dropDate: Date.now()
      };

    await fetch('/item', {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(loadListings),
    })
    }
  }

  //useselector to subscribe to the items piece of state to populate 

  //loop through the list from back to front & push all of the 

  const itemDiv = [];

  useEffect( () => {
    for (let i = items.length -1; i >= 0; i--) {
      //create a viewer to display all properties of each item
      console.log('inside of the loop')
      itemDiv.push(
        <ItemView className='itemView' item={items[i]}/>
      )
    }
  }, [ready])
  
  //do this filtering on fetch request w specified params
  //for filter form
  const [neighboorhoodValues, setNeighboorhoodValues] = useState([]);
  //this function updates the dropdown menu to display neighborhoods that correspond to the selected borough. invoked in onchange of filter-borough dropdown.
  const neighboorhoodPicker = () => {
    const borough = document.querySelector('#filter-borough') 
    if (borough.value === 'Brooklyn') {
      setNeighboorhoodValues([
        <select id='filter-neighboorhood'>
          <option value="Bedford-Stuyvesant">Bedford-Stuyvesant</option>
          <option value="Brooklyn Heights">Brooklyn Heights</option>
          <option value="Bushwick">Bushwick</option>
          <option value="Dumbo">Dumbo</option>
          <option value="Greenpoint">Greenpoint</option>
          <option value="Park Slope">Park Slope</option>
          <option value="Williamsburg">Williamsburg</option>
        </select>
      ])
    }
    if (borough.value === 'Manhattan') {
      setNeighboorhoodValues([
        <select id='filter-neighboorhood'>
          <option value="East Village">East Village</option>
          <option value="Greenwich Village">Greenwich Village</option>
          <option value="Lower East Side">Lower East Side</option>
          <option value="SoHo">SoHo</option>
          <option value="Tribeca">Tribeca</option>
          <option value="Upper East Side">Upper East Side</option>
        </select>
      ])
    }
  };
  
  //the return is the borough dropdown, which updates the neighborhood dropdown, and the filter button, which queries database to receive items based on selected borough and neighborhood.
  return (
    <div>
      <select id='filter-borough' onChange={neighboorhoodPicker}>
        <option value="default">Choose Your Borough</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Manhattan">Manhattan</option>
      </select>
      {neighboorhoodValues}
      <button onClick={populate}>Populate Bushwick</button>
      <button id='filter-button' onClick={ async () => {
        await grabFilteredItems(document.querySelector('#filter-borough').value,document.querySelector('#filter-neighboorhood').value)
      }}>Filter by Location</button>
      {ready && itemDiv}
    </div>
  )
}
export default Item;