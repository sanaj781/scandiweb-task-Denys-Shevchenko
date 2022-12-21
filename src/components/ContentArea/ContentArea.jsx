import React, { Component } from "react";
import "css/content-area.css";
import ProductListPage from "./ProductListPage/ProductListPage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductDescriptionPage from "./ProductDescriptionPage";
import Cart from "./Cart/Cart";
import WrongUrl from "./WrongUrl";
class ContentArea extends Component {
  ContentAreaRef = React.createRef();
  render() {
    const {
      products,
      activeCurrency,
      activeCategory,
      addToCart,
      deleteFromCart,
      cartItems,
      cartOverlayStatus,
      overlayBackgroundSize,
      onCartOverlayChange,
      cartTotalPrice,
      cartLength,
    } = this.props;

    //getOpacityWraperDimensions makes cartOverlay opacityWraper allways fit to the screen size
    const getOpacityWraperDimensions = () => {
      const windowSize = overlayBackgroundSize;
      const contentAreaMarginY = 160;
      const opacityWraperMarginTop = 80;
      //If content height included margin Y is less than current screen size -
      //opacityWrapper height will be the screen size minus 78px (header area), else - same size as a
      //contentArea including margin Y
      const opacityWraperHeight = this.ContentAreaRef.current
        ? this.ContentAreaRef.current.clientHeight + contentAreaMarginY <
          windowSize[0] - opacityWraperMarginTop
          ? windowSize[0] - opacityWraperMarginTop
          : this.ContentAreaRef.current.clientHeight + contentAreaMarginY
        : 0;
      const opacityWraperWidth = this.ContentAreaRef.current
        ? this.ContentAreaRef.current.clientWidth <= windowSize[1]
          ? windowSize[1]
          : this.ContentAreaRef.current.clientWidth
        : 0;
      return { opacityWraperHeight, opacityWraperWidth };
    };
    const opacityWraperHeight =
      getOpacityWraperDimensions().opacityWraperHeight;
    const opacityWraperWidth = getOpacityWraperDimensions().opacityWraperWidth;

    return (
      <React.Fragment>
        {!cartOverlayStatus ? null : (
          <div
            className="opacity-wraper"
            style={{
              height: opacityWraperHeight,
              width: opacityWraperWidth,
            }}
          ></div>
        )}
        <div className="content-area" ref={this.ContentAreaRef}>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ProductListPage
                  key={activeCategory}
                  activeCategory={activeCategory}
                  products={products}
                  activeCurrency={activeCurrency}
                  addToCart={addToCart}
                />
              }
            />
            {products.map((product, index) => (
              <Route
                key={index}
                path={`product/${product.id}`}
                element={
                  <ProductDescriptionPage
                    key={index}
                    product={product}
                    activeCurrency={activeCurrency}
                    addToCart={addToCart}
                  />
                }
              />
            ))}

            <Route
              path="/cart"
              element={
                <Cart
                  cartLength={cartLength}
                  cartTotalPrice={cartTotalPrice}
                  cartOverlayStatus={cartOverlayStatus}
                  onCartOverlayChange={onCartOverlayChange}
                  cartItems={cartItems}
                  activeCurrency={activeCurrency}
                  cartStyle="cartPage"
                  addToCart={addToCart}
                  deleteFromCart={deleteFromCart}
                />
              }
            />
            <Route path="/wrong-url" element={<WrongUrl />} />
            <Route path="*" element={<Navigate to="/wrong-url" />} />
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default ContentArea;
