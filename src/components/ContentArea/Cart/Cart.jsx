import React, { Component } from "react";
import "css/cart-overlay.css";
import CartItem from "./CartItem/CartItem";
import CartTotal from "./CartTotal";
//Depending on received "cartStyle" value (cartPage or cartOverlay), Cart Component will
//be rendered and styled accordingly
class Cart extends Component {
  render() {
    const {
      cartItems,
      activeCurrency,
      cartStyle,
      addToCart,
      deleteFromCart,
      cartTotalPrice,
      cartLength,
      onCartOverlayChange,
    } = this.props;

    return cartItems.length > 0 ? (
      <React.Fragment>
        {cartStyle === "cartPage" ? <h1 className="cart-title">Cart</h1> : null}

        <div
          className={
            cartStyle === "cartPage"
              ? "cart-items-wrapper"
              : "cart-items-wrapper-overlay"
          }
        >
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              activeCurrency={activeCurrency}
              item={item}
              cartStyle={cartStyle}
              addToCart={addToCart}
              deleteFromCart={deleteFromCart}
            />
          ))}
        </div>
        <CartTotal
          cartStyle={cartStyle}
          activeCurrency={activeCurrency}
          cartLength={cartLength}
          cartTotalPrice={cartTotalPrice}
          onCartOverlayChange={onCartOverlayChange}
        />
      </React.Fragment>
    ) : (
      <span className="empty-cart-sign">
        Your Cart is empty. Please add some products first
      </span>
    );
  }
}

export default Cart;
