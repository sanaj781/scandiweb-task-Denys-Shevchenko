import React, { Component } from "react";
import { ReactComponent as EmptyCart } from "icons/EmptyCart.svg";
import CartOverlay from "./CartOverlay";
class CartIcon extends Component {
  state = {};
  render() {
    const {
      onCartOverlayChange,
      cartLength,
      cartItems,
      cartTotalPrice,
      cartOverlayStatus,
      activeCurrency,
      addToCart,
      deleteFromCart,
      handleCartOverlay,
    } = this.props;
    return (
      <React.Fragment>
        <div className="cart">
          <EmptyCart
            onMouseEnter={() => onCartOverlayChange("show")}
            onMouseLeave={(e) => onCartOverlayChange("hide", e)}
          />
          {cartLength > 0 ? (
            <div
              className="cart-lenght"
              onMouseLeave={(e) => onCartOverlayChange("hide", e)}
              onMouseEnter={() => onCartOverlayChange("show")}
            >
              {cartLength}
            </div>
          ) : null}
          <CartOverlay
            cartTotalPrice={cartTotalPrice}
            cartItems={cartItems}
            cartOverlayStatus={cartOverlayStatus}
            cartLength={cartLength}
            activeCurrency={activeCurrency}
            onCartOverlayChange={onCartOverlayChange}
            addToCart={addToCart}
            deleteFromCart={deleteFromCart}
            handleCartOverlay={handleCartOverlay}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CartIcon;
