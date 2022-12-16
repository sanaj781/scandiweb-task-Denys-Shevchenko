import React, { Component } from "react";
import { Link } from "react-router-dom";

class CartTotal extends Component {
  handleOrder = () => {
    localStorage.clear();
    window.location.reload();
  };
  render() {
    const {
      activeCurrency,
      cartTotalPrice,
      cartLength,
      cartStyle,
      onCartOverlayChange,
    } = this.props;

    return cartStyle === "cartPage" ? (
      <div className="cart-order-info">
        <div className="cart-total-price">
          <div className="cart-summary-name">
            <span>Tax 21%:&nbsp;</span>
            <span>Quantity:&nbsp;</span>
            <span>Total:&nbsp;</span>
          </div>
          <div className="cart-summary-amount">
            <span>{`${activeCurrency.symbol} ${(cartTotalPrice * 0.21).toFixed(
              2
            )}`}</span>
            <span>{cartLength}</span>
            <span>{`${activeCurrency.symbol} ${cartTotalPrice}`}</span>
          </div>
        </div>
        <div className="cart-order-button" onClick={this.handleOrder}>
          ORDER
        </div>
      </div>
    ) : (
      // CartOverlay
      <React.Fragment>
        <div className="total-price-overlay">
          <span className="total-overlay">Total</span>
          <span className="price-overlay">{`${activeCurrency.symbol} ${
            cartTotalPrice ? cartTotalPrice : 0
          }`}</span>
        </div>
        <div className="cart-overlay-btns-wrapper">
          <div onClick={(e) => onCartOverlayChange("hide-immediately", e)}>
            <Link to="/cart" className="view-bag">
              View Bag
            </Link>
          </div>
          <div className="check-out" onClick={this.handleOrder}>
            Check out
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CartTotal;
