import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyCart } from "icons/EmptyCart.svg";

class ProductCard extends Component {
  render() {
    const { addToCart, product } = this.props;
    const { id, name, inStock, gallery, brand, prices, attributes } =
      this.props.product;
    const { activeCurrency } = this.props;
    return (
      <React.Fragment>
        <div className={"product-card"}>
          {/* If there are no attributes to choose show quick shoping functionality  */}
          {inStock && attributes.length === 0 ? (
            <div
              className="add-to-cart-icon"
              onClick={() => {
                addToCart(product, attributes);
              }}
            >
              <EmptyCart />
            </div>
          ) : null}
          <Link to={`product/${id}`} className="link-wrapper">
            {/* Add opacity if product is out of stock */}

            <div className="product-card-elements">
              <div className="img-wrapper">
                <div
                  className={
                    !inStock
                      ? "opacity-out-of-stock product-card-image"
                      : "product-card-image"
                  }
                  data-outofstock={!inStock ? "out of stock" : ""}
                  style={{ backgroundImage: `url(${gallery[0]}` }}
                ></div>
              </div>
              <div className={!inStock ? "opacity-out-of-stock" : null}>
                <div className="product-card-title">{`${brand} ${name}`}</div>
                <div className="product-card-price">
                  {`${activeCurrency.symbol}${prices[
                    activeCurrency.indexOfActiveCurrency
                  ].amount.toFixed(2)}`}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductCard;
