import React, { Component } from "react";
class ProductCardDescription extends Component {
  state = {};
  render() {
    const { inStock, brand, name, activeCurrency, prices } = this.props;
    return (
      <div className={!inStock ? "opacity-out-of-stock" : null}>
        <div className="product-card-title">{`${brand} ${name}`}</div>
        <div className="product-card-price">
          {`${activeCurrency.symbol}${prices[
            activeCurrency.indexOfActiveCurrency
          ].amount.toFixed(2)}`}
        </div>
      </div>
    );
  }
}

export default ProductCardDescription;
