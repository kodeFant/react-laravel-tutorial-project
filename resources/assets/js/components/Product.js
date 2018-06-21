import React from "react";

const Product = props => {
  const divStyle = {
    display: "flex",
    flexDirection: "column",
    width: "65%",
    margin: "30px 10px 10px 30px"
  };

  // If the props product is null, return Product doesn't exist
  if (!props.product) {
    return <div style={divStyle}>Product Does Not exist</div>;
  }

  //Else, display the product data
  return (
    <div style={divStyle}>
      <h2> {props.product.title} </h2>
      <p> {props.product.description} </p>
      <h3>
        {" "}
        Status {props.product.availability ? "Available" : "Out of stock"}{" "}
      </h3>
      <h3> Price: {props.product.price} </h3>
      <button onClick={props.toggleEdit}>Edit</button>
      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
};

export default Product;
