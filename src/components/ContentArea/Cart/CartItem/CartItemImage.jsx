import React, { Component } from "react";
import { ReactComponent as PreviousIcon } from "icons/previous.svg";

class CartItemImage extends Component {
  state = {
    indexOfActiveImage: 0,
  };
  handleImageChange = (image) => {
    if (image === "next") {
      if (
        this.props.item.product.gallery.length >
        this.state.indexOfActiveImage + 1
      ) {
        const indexOfActiveImage = this.state.indexOfActiveImage + 1;
        this.setState({ indexOfActiveImage });
      } else {
        this.setState({ indexOfActiveImage: 0 });
      }
    }
    if (image === "previous") {
      if (this.state.indexOfActiveImage > 0) {
        const indexOfActiveImage = this.state.indexOfActiveImage - 1;
        this.setState({ indexOfActiveImage });
      } else {
        const indexOfActiveImage = this.props.item.product.gallery.length - 1;
        this.setState({ indexOfActiveImage });
      }
    }
  };
  render() {
    const { setClassName, item, addToCart, deleteFromCart, cartStyle } =
      this.props;

    return (
      <div className={setClassName("quantity-image")}>
        <div className={setClassName("quantity")}>
          <div
            className={setClassName("plus")}
            onClick={() => addToCart(item.product, item.attributes)}
          ></div>
          <div className={setClassName("item-qty")}>{item.qty}</div>
          <div
            className={setClassName("minus")}
            onClick={() => deleteFromCart(item.product, item.attributes)}
          ></div>
        </div>
        <div
          className={setClassName("cart-image")}
          style={{
            backgroundImage: `url(${
              item.product.gallery[this.state.indexOfActiveImage]
            }`,
          }}
        >
          {/* Showing image slider buttons on cartPage if there are more than 1 images */}
          {item.product.gallery.length > 1 && cartStyle === "cartPage" ? (
            <div className="cart-img-slider">
              <div
                className="previous-image-btn"
                onClick={() => this.handleImageChange("previous")}
              >
                <PreviousIcon />
              </div>
              <div
                className="next-image-btn"
                onClick={() => this.handleImageChange("next")}
              >
                <PreviousIcon />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default CartItemImage;
