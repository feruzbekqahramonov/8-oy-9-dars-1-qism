import React from "react";

function Card(props) {
  return (
    <div className="w-1/4 shadow-xl rounded-lg p-8">
      <img className="h-[150px]" src={props.cars.image} alt="" />
      <h3>{props.cars.title}</h3>
      <p>{props.cars.start_production}</p>
      <p>{props.cars.class}</p>
    </div>
  );
}

export default Card;
