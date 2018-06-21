import React, { Component } from "react";
import ReactDOM from "react-dom";
import Product from "./Product";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import axios from "axios";

/* Main Component */
class Main extends Component {
  constructor() {
    super();
    //Initialize the state in the constructor
    this.state = {
      products: [],
      currentProduct: null,
      edit: false
    };
    this.handleAddProduct = this.handleAddProduct.bind(this);
    this.handleEditProduct = this.handleEditProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.toggleEditHandler = this.toggleEditHandler.bind(this);
  }

  /* componentDiMount() is a lifecycle method
   * that gets called after the component is rendered
   */
  componentDidMount() {
    /// fetch API in action
    axios.get("/api/products").then(response => {
      this.setState({ products: response.data });
    });
  }

  renderProducts() {
    const listStyle = {
      listStyle: "none",
      fontSize: "18px",
      lineHeight: "1.8em"
    };
    return this.state.products.map(product => {
      return (
        /* When using list you need to specify a key
         * attribute that is unique for each list item
         */
        <li
          style={listStyle}
          onClick={() => this.handleClick(product)}
          key={product.id}
        >
          {product.title}
        </li>
      );
    });
  }

  handleClick(product) {
    //handleClick is used to set the state
    this.setState({ currentProduct: product });
  }

  handleAddProduct(product) {
    product.price = Number(product.price);
    /* Fetch API for post request */
    axios.post("api/products", product).then(response => {
      console.log(response);
      this.setState(prevState => ({
        products: prevState.products.concat(response.data),
        currentProduct: response.data
      }));
    });
  }

  handleEditProduct(product) {
    /* Fetch API for post request */
    const currentProduct = this.state.currentProduct;
    const index = this.state.products.indexOf(currentProduct);
    axios
      .put("api/products/" + currentProduct.id, product)
      .then(response => {
        const array = this.state.products.concat();
        array[index] = product;
        console.log(response);
        this.setState(prevState => ({
          products: array,
          currentProduct: product
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleDeleteProduct() {
    const currentProduct = this.state.currentProduct;
    axios
      .delete("api/products/" + currentProduct.id)
      .then(response => {
        /* Duplicate the array and filter out the item to be deleted */
        const array = this.state.products.filter(item => {
          console.log(item !== currentProduct);
          return item !== currentProduct;
        });
        this.setState({ products: array, currentProduct: null });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleEditHandler() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const mainDivStyle = {
      display: "flex",
      flexDirection: "row"
    };

    const divStyle = {
      justifyContent: "flex-start",
      width: "35%",
      background: "#f0f0f0",
      padding: "20px 20px 20px 20px",
      margin: "30px 10px 10px 30px"
    };

    return (
      <div>
        <div style={mainDivStyle}>
          <div style={divStyle}>
            <h3>Aill products</h3>
            <ul>{this.renderProducts()}</ul>
          </div>
          <Product
            product={this.state.currentProduct}
            onDelete={this.handleDeleteProduct}
            toggleEdit={this.toggleEditHandler}
          />
          {this.state.edit ? (
            <EditProduct
              onEdit={this.handleEditProduct}
              product={this.state.currentProduct}
            />
          ) : (
            <AddProduct onAdd={this.handleAddProduct} />
          )}
        </div>
      </div>
    );
  }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";  
*/

if (document.getElementById("root")) {
  ReactDOM.render(<Main />, document.getElementById("root"));
}
