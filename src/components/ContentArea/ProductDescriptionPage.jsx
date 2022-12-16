import React, { Component } from "react";
import parse from "html-react-parser";
import Attributes from "./Attributes";
import { ReactComponent as PrevImg } from "icons/previous.svg";
class ProductDescriptionPage extends Component {
  galleryThumbnailsRef = React.createRef();

  componentDidMount() {
    //reset scrolling position
    window.scrollTo({ top: 0 });
    this.galleryThumbnailsRef.current.addEventListener(
      "wheel",
      this.handleScrollThumbnails,
      {
        passive: false,
      }
    );
  }

  componentWillUnmount() {
    this.galleryThumbnailsRef.current.removeEventListener(
      "wheel",
      this.handleScrollThumbnails,
      {
        passive: false,
      }
    );
  }

  constructor(props) {
    super(props);
    //Setting up an initial state with default attribute values
    const initialState = () => {
      const productAttributes = [];
      this.props.product.attributes.forEach((attribute) => {
        const productAttribute = {};
        productAttribute["name"] = attribute.name;
        productAttribute["value"] = attribute.items[0].value;
        productAttributes.push(productAttribute);
      });
      return { productAttributes };
    };

    this.state = {
      ...initialState(),
      mainImage: this.props.product.gallery[0],
      thumbnailsRow: Math.ceil(this.props.product.gallery.length / 4),
      currentRow: 1,
    };
  }

  handleImageChange = (image) => {
    this.setState({ mainImage: image });
  };
  handleAttributeChange = (name, value) => {
    const productAttributes = this.state.productAttributes;
    productAttributes.forEach((attr) => {
      if (attr["name"] === name) {
        attr["value"] = value;
      }
    });

    this.setState({ productAttributes });
  };

  handleScrollThumbnails = (event) => {
    if (typeof event === "object") event.preventDefault();
    if (event === "down" || event.deltaY > 0) {
      if (this.state.currentRow < this.state.thumbnailsRow) {
        this.galleryThumbnailsRef.current.scrollTo({
          top: this.state.currentRow * 4 * 120,
          behavior: "smooth",
        });
        this.setState({ currentRow: this.state.currentRow + 1 });
      }
    }
    if (event === "up" || event.deltaY < 0) {
      if (this.state.currentRow > 1) {
        this.galleryThumbnailsRef.current.scrollTo({
          top: this.state.currentRow * -4 * 120,
          behavior: "smooth",
        });
        this.setState({ currentRow: this.state.currentRow - 1 });
      }
    }
  };

  render() {
    const { activeCurrency, addToCart, product } = this.props;
    return (
      <div className="product-info">
        <div className="gallery-main-image-wrapper">
          <div className="gallery" ref={this.galleryThumbnailsRef}>
            {this.state.thumbnailsRow > 1 ? (
              <div
                className="scroll-up-gallery"
                onClick={() => this.handleScrollThumbnails("up")}
              >
                <PrevImg />
              </div>
            ) : null}
            <div className="gallery-thumbnails">
              {product.gallery.map((img, index) => (
                <div
                  className="image-thumbnail"
                  style={{ backgroundImage: `url(${img}` }}
                  key={index}
                  onClick={() => this.handleImageChange(img)}
                />
              ))}
            </div>
            {this.state.thumbnailsRow > 1 ? (
              <div
                className="scroll-down-gallery"
                onClick={() => this.handleScrollThumbnails("down")}
              >
                <PrevImg />
              </div>
            ) : null}
          </div>
          <div className="main-image-wrapper">
            <div
              className="main-image"
              style={{ backgroundImage: `url(${this.state.mainImage}` }}
            ></div>
          </div>
        </div>
        <div className="product-info-wrapper">
          <h1 className="brand-name">{product.brand}</h1>
          <h2 className="product-name">{product.name}</h2>
          <Attributes
            attributes={product.attributes}
            defaultAttributes={this.state.productAttributes}
            handleAttributeChange={this.handleAttributeChange}
            attributesStyle="PDP"
          />
          <div className="price">
            <div className="price-sign">Price:</div>
            <div className="amount">
              {`${activeCurrency.symbol}${product.prices[
                activeCurrency.indexOfActiveCurrency
              ].amount.toFixed(2)}`}
            </div>
          </div>
          {product.inStock ? (
            <div
              onClick={() => addToCart(product, this.state.productAttributes)}
              className="add-to-cart"
            >
              Add to cart
            </div>
          ) : (
            <div className="add-to-cart btn-out-of-stock">Out of stock</div>
          )}
          <div className="description">{parse(product.description)}</div>
        </div>
      </div>
    );
  }
}

export default ProductDescriptionPage;
