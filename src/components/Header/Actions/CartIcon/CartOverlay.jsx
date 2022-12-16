import React, { Component } from "react";

import Cart from "components/ContentArea/Cart/Cart";
import "css/header.css";
class CartOverlay extends Component {
  render() {
    const {
      cartOverlayStatus,
      cartItems,
      activeCurrency,
      onCartOverlayChange,
      addToCart,
      deleteFromCart,
      cartLength,
      cartTotalPrice,
    } = this.props;

    return (
      <React.Fragment>
        <div
          className="cart-overlay-before-element"
          onMouseLeave={(e) => onCartOverlayChange("hide", e)}
        ></div>

        <div
          className={cartOverlayStatus ? "cart-overlay" : "hiden"}
          onMouseEnter={() => onCartOverlayChange("show")}
          onMouseLeave={(e) => onCartOverlayChange("hide", e)}
        >
          {cartLength > 0 ? (
            <React.Fragment>
              <h2>
                My Bag, <span>{cartLength} items</span>{" "}
              </h2>
              <Cart
                cartTotalPrice={cartTotalPrice}
                cartOverlayStatus={cartOverlayStatus}
                onCartOverlayChange={onCartOverlayChange}
                cartItems={cartItems}
                activeCurrency={activeCurrency}
                cartStyle="cartOverlay"
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
              />
            </React.Fragment>
          ) : (
            <span className="empty-cart-sign">
              Your Cart is empty. Please add some products first
            </span>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default CartOverlay;
