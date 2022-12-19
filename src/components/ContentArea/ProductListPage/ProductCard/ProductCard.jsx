import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuickShoping from "./QuickShoping";
import ProductCardImage from "./ProductCardImage";
import ProductCardDescription from "./ProductCardDescription";

class ProductCard extends Component {
  render() {
    const { addToCart, product, activeCurrency } = this.props;
    const { id, name, inStock, gallery, brand, prices, attributes } =
      this.props.product;
    return (
      <div className={"product-card"}>
        <QuickShoping
          inStock={inStock}
          attributes={attributes}
          addToCart={addToCart}
          product={product}
        />
        <Link to={`product/${id}`} className="product-card-element">
          <ProductCardImage inStock={inStock} gallery={gallery} />
          <ProductCardDescription
            inStock={inStock}
            brand={brand}
            name={name}
            activeCurrency={activeCurrency}
            prices={prices}
          />
        </Link>
      </div>
    );
  }
}

export default ProductCard;
