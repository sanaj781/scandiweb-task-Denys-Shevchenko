import React, { Component } from "react";
import { Query } from "@apollo/client/react/components/Query";
import { gql } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Header from "components/Header/Header";
import ContentArea from "components/ContentArea/ContentArea";
import Loader from "components/Loader";

class App extends Component {
  //Ref for attaching and reseting timer for smooth CartOverlay apearing/disapearin - used in handleCartOverlay event handler method
  OverlayRef = React.createRef();
  componentDidMount() {
    //CartOverlay modal size will adapt to screen size
    window.addEventListener("resize", this.getCurrentWindowSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.getCurrentWindowSize);
  }
  componentDidUpdate(prevProps, prevState) {
    //Hide CartOverlay if user scrolls to bottom
    if (!prevState.showCartOverlay && this.state.showCartOverlay) {
      window.addEventListener("scroll", this.hideOverlayOnScroll);
    }
    // remove scroll event listener if CartOverlay was closed not by scrolling
    if (prevState.showCartOverlay && !this.state.showCartOverlay) {
      window.removeEventListener("scroll", this.hideOverlayOnScroll);
    }

    //Count cartTotalPrice if cart items or active currency were changed
    if (
      prevState.cart !== this.state.cart ||
      prevState.activeCurrency !== this.state.activeCurrency
    ) {
      this.countCartTotalPrice();
    }
  }

  state = {
    activeCategory: localStorage.getItem("activeCategory")
      ? localStorage.getItem("activeCategory")
      : this.props.categories[0].name,

    activeCurrency: localStorage.getItem("activeCurrency")
      ? JSON.parse(localStorage.getItem("activeCurrency"))
      : {
          symbol: this.props.currencies[0].symbol,
          indexOfActiveCurrency: 0,
        },

    cartLength: localStorage.getItem("cartLength")
      ? parseInt(localStorage.getItem("cartLength"))
      : 0,

    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],

    cartTotalPrice: localStorage.getItem("cartTotalPrice")
      ? localStorage.getItem("cartTotalPrice")
      : 0,

    showCartOverlay: false,

    overlayBackgroundSize: [window.innerHeight, window.innerWidth],
  };
  //When screen is resized - the size of CartOverlay modal wrapper will be adapted to screen size changes
  getCurrentWindowSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    this.setState({ overlayBackgroundSize: [height, width] });
  };
  hideOverlayOnScroll = (e) => {
    //hide CartOverlay onscroll for screens with height > 677 + 80 (CartOverlay max height+header height)
    if (e.currentTarget.scrollY > 80 && window.innerHeight > 677 + 80) {
      this.setState({
        showCartOverlay: false,
      });
      return window.removeEventListener("scroll", this.hideOverlayOnScroll);
    }
    //hide CartOverlay onscroll for screens with height < 677 + 80 (CartOverlay max height+header height)
    if (
      window.innerHeight < 677 + 80 &&
      e.currentTarget.scrollY > 677 + 80 + 50 - window.innerHeight
    ) {
      this.setState({
        showCartOverlay: false,
      });
      return window.removeEventListener("scroll", this.hideOverlayOnScroll);
    }
  };
  handleCategoryChange = (category) => {
    this.setState({ activeCategory: category });
    localStorage.setItem("activeCategory", category);
    window.scrollTo({ top: 0 });
  };
  handleCurrencyChange = (symbol) => {
    const indexOfActiveCurrency = this.props.currencies.findIndex(
      (currency) => currency.symbol === symbol
    );
    this.setState({
      activeCurrency: {
        symbol,
        indexOfActiveCurrency,
      },
    });
    localStorage.setItem(
      "activeCurrency",
      JSON.stringify({ symbol, indexOfActiveCurrency })
    );
  };
  countCartTotalPrice = () => {
    const cart = [...this.state.cart];
    let cartTotalPrice = 0;
    cart.forEach((item) => {
      cartTotalPrice +=
        item.product.prices[this.state.activeCurrency.indexOfActiveCurrency]
          .amount * item.qty;
    });
    cartTotalPrice = cartTotalPrice.toFixed(2);
    this.setState({ cartTotalPrice });
    localStorage.setItem("cartTotalPrice", cartTotalPrice);
  };
  handleAddToCart = (product, selectedAttributes) => {
    let cart = [...this.state.cart];
    //Checking if Product with same attributes is already exist in cart and getting index of this product if so
    const itemIsInCart = cart.find(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.attributes) === JSON.stringify(selectedAttributes)
    );
    //Increasing quantity of a Product in Cart if it is already in Cart
    if (itemIsInCart) {
      const itemIndex = cart.indexOf(itemIsInCart);
      cart[itemIndex]["qty"] += 1;
    }
    //Setting up new Product object and adding it to Cart
    else {
      const newCartItem = {};
      newCartItem["attributes"] = [];
      newCartItem["product"] = product;
      newCartItem["qty"] = 1;
      selectedAttributes.forEach(({ name, value }) => {
        newCartItem["attributes"].push({ name, value });
      });
      cart = [...cart, newCartItem];
    }

    //Updating state with new product and cart length
    this.setState({
      cart,
      cartLength: this.state.cartLength + 1,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartLength", this.state.cartLength + 1);
  };
  handleDeleteFromCart = (product, selectedAttributes) => {
    let cart = [...this.state.cart];
    const itemIsInCart = cart.find(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.attributes) === JSON.stringify(selectedAttributes)
    );
    if (itemIsInCart) {
      const itemIndex = cart.indexOf(itemIsInCart);
      if (cart[itemIndex]["qty"] > 1) cart[itemIndex]["qty"] -= 1;
      else cart.splice(itemIndex, 1);
      // return cart;

      this.setState({
        cart,
        cartLength: this.state.cartLength - 1,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("cartLength", this.state.cartLength - 1);
    } else console.log("item was not found in the cart");
  };

  handleCartOverlay = (action, event) => {
    //if mouse leaves CartOverlay area, but then quickly (<250ms) returns, than CartOverlay  will not be closed
    if (typeof this.OverlayRef.current.timer === "number") {
      clearTimeout(this.OverlayRef.current.timer);
      this.OverlayRef.current.timer = undefined;
    }
    //Setting a function for changing showCartOverlay state depending on action (show/hide)
    const showHideOverlay = (action, timeOut) => {
      this.OverlayRef.current.timer = setTimeout(() => {
        this.setState({ showCartOverlay: action });
        clearTimeout(this.OverlayRef.current.timer);
        this.OverlayRef.current.timer = undefined;
      }, timeOut);
    };
    if (action === "show") {
      if (!this.state.showCartOverlay) {
        showHideOverlay(true, 150);
      }
    } else if (action === "hide") {
      const beforeElementAreaClassName = "cart-overlay-before-element";
      //Do not hide CartOverlay if mouse is within a 20px area  above cartOverlay
      if (
        event.relatedTarget &&
        event.relatedTarget.className !== beforeElementAreaClassName
      ) {
        showHideOverlay(false, 250);
      }
    }
    //if ViewBag button is clicked
    else if (action === "hide-immediately") {
      this.setState({ showCartOverlay: false });
    }
  };
  render() {
    const { categories, currencies } = this.props;
    //Geting all products of active Category from BE for ContentArea->Category
    const GET_CATEGORY_PRODUCTS = gql`
      query getCategoryProducts{
        category(input: { title: "${this.state.activeCategory}" }) {
          products {
            id
              name
              inStock
              gallery
              description
              category
              attributes {
                id
                name
                type
                items {
                  displayValue
                  value
                  id
                }
              }
              prices {
                currency {
                  label
                  symbol
                }
                amount
              }
              brand

          }
        }
      }
    `;
    return (
      <BrowserRouter>
        <Header
          ref={this.OverlayRef}
          categories={categories}
          currencies={currencies}
          cartLength={this.state.cartLength}
          activeCategory={this.state.activeCategory}
          activeCurrency={this.state.activeCurrency}
          onCategoryChange={this.handleCategoryChange}
          onCurrencyChange={this.handleCurrencyChange}
          onCartOverlayChange={this.handleCartOverlay}
          cartItems={this.state.cart}
          cartTotalPrice={this.state.cartTotalPrice}
          cartOverlayStatus={this.state.showCartOverlay}
          addToCart={this.handleAddToCart}
          deleteFromCart={this.handleDeleteFromCart}
        />

        <Query query={GET_CATEGORY_PRODUCTS}>
          {({ loading, data, error }) => {
            if (loading) return <Loader />;
            if (error) {
              console.error("GraphQL connection error in App.js " + error);
              return <p>Connection error</p>;
            }
            return (
              <ContentArea
                products={data.category.products}
                activeCurrency={this.state.activeCurrency}
                activeCategory={this.state.activeCategory}
                addToCart={this.handleAddToCart}
                deleteFromCart={this.handleDeleteFromCart}
                cartItems={this.state.cart}
                cartOverlayStatus={this.state.showCartOverlay}
                overlayBackgroundSize={this.state.overlayBackgroundSize}
                onCartOverlayChange={this.handleCartOverlay}
                cartTotalPrice={this.state.cartTotalPrice}
                cartLength={this.state.cartLength}
              ></ContentArea>
            );
          }}
        </Query>
      </BrowserRouter>
    );
  }
}

export default App;
