import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";


const Item = () => {

  const dispatch = useDispatch();
  
  //function below does what the regular grabItems does in App, but returns only items in a neighborhood/borough. Takes in 2 args (strings) to filter the query on server side (via a query on the req body).
  const grabFilteredItems = async (borough,neighborhood) => {
    try {
      //fetching from item/filter router path with the queries added on
      const filteredItems = await fetch('/item/filter'+ new URLSearchParams({
        borough: borough,
        neighborhood: neighborhood,
      }));

      if (!getData.ok) {
      //
      }
      const jsonedFilteredItems = await filteredItems.json();
      //dispatch this information to the global state
      dispatch(updateItems({response: jsonedFilteredItems}));
    }
    catch (err) {
      return;
    }
  };

  //useselector to subscribe to the items piece of state to populate 
  const items = useSelector((state) => {return state.swoop.items})
  const [itemDiv, setItemDiv] = useState([]);//can use redux state

  //loop through the list from back to front & push all of the 
  const render = () => {
    if (items !== undefined) {
      for (let i = items.length -1; i >= 0; i--) {
        //create a viewer to display all properties of each item
        console.log('inside of the loop')
        itemDiv.push(
          <ItemView className='itemView' item={items[i]}/>
          // <div id={items[i].title} className='items-post'>
          //   <h4>{items[i].title}</h4>
          //   <img src={items[i].image} style={{height: '300px', width: '300px'}}/>
          //   <p>{items[i].location[0]},{items[i].location[1]} </p>
          //   <p>{items[i].description}</p>
          //   <p>Drop Date: {items[i].dropDate}</p>
          // </div>
        )
      }
    }
  }
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
  
  render();
  //the return is the borough dropdown, which updates the neighborhood dropdown, and the filter button, which queries database to receive items based on selected borough and neighborhood.
  return (
    <div>
      <select id='filter-borough' onChange={neighboorhoodPicker}>
        <option value="default">Choose Your Borough</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Manhattan">Manhattan</option>
      </select>
      {neighboorhoodValues}
      <button id='filter-button' onClick={ async () => {
        await grabFilteredItems(document.querySelector('#filter-borough').value,document.querySelector('#filter-neighboorhood').value)
      }}>Filter by Location</button>
      {itemDiv}
    </div>
  )
}
export default Item;