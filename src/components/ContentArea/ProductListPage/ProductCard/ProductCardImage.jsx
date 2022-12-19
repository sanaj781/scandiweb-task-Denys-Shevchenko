import React, { Component } from "react";
class ProductCardImage extends Component {
  state = {};
  render() {
    const { inStock, gallery } = this.props;
    return (
      <div
        className={
          !inStock
            ? "opacity-out-of-stock product-card-image"
            : "product-card-image"
        }
        data-outofstock={!inStock ? "out of stock" : ""}
        style={{ backgroundImage: `url(${gallery[0]}` }}
      ></div>
    );
  }
}

export default ProductCardImage;
