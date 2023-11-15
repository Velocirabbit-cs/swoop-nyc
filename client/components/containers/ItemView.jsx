import React from "react";

//__Jade: note i added a class name to image so we can style the width and height in css

//individual item card. has id 
const ItemView = (props) => {
  //_destructuring the needed properties from the respective item that parent component drills
  const {title , image , location , description , dropDate } = props.item;
  return (
    <div>
      <div id={items} className='items-post'>
        <h4>{title}</h4>
        <img src={image} className='itemImg' style={{height: '300px', width: '300px'}}/>
        <p>{location[0]},{location[1]} </p>
        <p>{description}</p>
        <p>Drop Date: {dropDate}</p>
      </div>
    </div>
  )
};

export default ItemView;