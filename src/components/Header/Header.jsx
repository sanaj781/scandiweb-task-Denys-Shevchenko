import React, { Component } from "react";
import "css/header.css";
import Actions from "./Actions/Actions";
import { ReactComponent as BrandIconLogo } from "icons/BrandIcon.svg";
import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
class Header extends Component {
  render() {
    const {
      categories,
      currencies,
      cartLength,
      activeCategory,
      activeCurrency,
      onCategoryChange,
      onCurrencyChange,
      onCartOverlayChange,
      cartItems,
      cartTotalPrice,
      cartOverlayStatus,
      addToCart,
      deleteFromCart,
    } = this.props;
    return (
      <header>
        <Navigation
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
        />
        <Link to="/">
          <BrandIconLogo />
        </Link>
        <Actions
          cartItems={cartItems}
          cartTotalPrice={cartTotalPrice}
          cartOverlayStatus={cartOverlayStatus}
          cartLength={cartLength}
          currencies={currencies}
          activeCurrency={activeCurrency}
          onCurrencyChange={onCurrencyChange}
          onCartOverlayChange={onCartOverlayChange}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
        />
      </header>
    );
  }
}

export default Header;
