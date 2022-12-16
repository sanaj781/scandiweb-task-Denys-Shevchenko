import React, { Component } from "react";
import CartItemInfo from "./CartItemInfo";
import CartItemImage from "./CartItemImage";
class CartItem extends Component {
  render() {
    const { cartStyle, addToCart, deleteFromCart, item, activeCurrency } =
      this.props;
    const setClassName = (defaultStyle) => {
      return cartStyle === "cartPage"
        ? defaultStyle
        : `${defaultStyle}-overlay`;
    };
    return (
      <div className={setClassName("cart-item")}>
        <CartItemInfo
          setClassName={setClassName}
          item={item}
          activeCurrency={activeCurrency}
          cartStyle={cartStyle}
        />
        <CartItemImage
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          setClassName={setClassName}
          item={item}
          cartStyle={cartStyle}
        />
      </div>
    );
  }
}

export default CartItem;
