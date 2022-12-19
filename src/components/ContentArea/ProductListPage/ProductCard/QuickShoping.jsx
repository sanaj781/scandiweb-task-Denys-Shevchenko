import React, { Component } from "react";
import { ReactComponent as EmptyCart } from "icons/EmptyCart.svg";

class QuickShoping extends Component {
  render() {
    const { inStock, attributes, addToCart, product } = this.props;
    // If there are no attributes to choose - show quick shoping functionality, else do not show
    return inStock && attributes.length === 0 ? (
      <div
        className="add-to-cart-icon"
        onClick={() => {
          addToCart(product, attributes);
        }}
      >
        <EmptyCart />
      </div>
    ) : null;
  }
}

export default QuickShoping;
