import React, { Component } from "react";
import { Link } from "react-router-dom";
import Attributes from "../../Attributes";

class CartItemInfo extends Component {
  render() {
    const { setClassName, item, activeCurrency, cartStyle } = this.props;
    return (
      <div className={setClassName("cart-item-info")}>
        <Link to={`../product/${item.product.id}`}>
          <div className={setClassName("brand-name")}>{item.product.brand}</div>
          <div className={setClassName("product-name")}>
            {item.product.name}
          </div>
        </Link>
        <div className={setClassName("product-price")}>
          {`${activeCurrency.symbol} ${item.product.prices[
            activeCurrency.indexOfActiveCurrency
          ].amount.toFixed(2)}`}
        </div>
        <Attributes
          attributes={item.product.attributes}
          defaultAttributes={item.attributes}
          attributesStyle={cartStyle}
        />
      </div>
    );
  }
}

export default CartItemInfo;
