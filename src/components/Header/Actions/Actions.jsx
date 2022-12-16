import React, { Component } from "react";
import CartIcon from "./CartIcon/CartIcon";
import CurrencyToggler from "./CurrencyToggler/CurrencyToggler";

class Actions extends Component {
  render() {
    const {
      currencies,
      activeCurrency,
      onCurrencyChange,
      onCartOverlayChange,
      cartLength,
      cartOverlayStatus,
      cartItems,
      addToCart,
      deleteFromCart,
      cartTotalPrice,
    } = this.props;
    return (
      <div className="actions">
        <CurrencyToggler
          currencies={currencies}
          onCurrencyChange={onCurrencyChange}
          activeCurrency={activeCurrency}
          cartOverlayStatus={cartOverlayStatus}
        />
        <CartIcon
          cartTotalPrice={cartTotalPrice}
          cartItems={cartItems}
          cartOverlayStatus={cartOverlayStatus}
          cartLength={cartLength}
          activeCurrency={activeCurrency}
          onCartOverlayChange={onCartOverlayChange}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
        />
      </div>
    );
  }
}

export default Actions;
