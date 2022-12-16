import React, { Component } from "react";
import ProductCard from "./ProductCard";
class ProductListPage extends Component {
  //Shows more products of current category when scrolled to the bottom of the page
  componentDidMount() {
    if (
      this.props.products.length >= this.state.renderedItems &&
      window.innerWidth >= 1440
    ) {
      this.setState({ renderedItems: Math.ceil(window.innerHeight / 700) * 3 });
    } else
      this.setState({ renderedItems: Math.ceil(window.innerHeight / 700) * 2 });

    window.addEventListener("scroll", this.loadMoreProducts);
    window.addEventListener("resize", this.loadMoreProducts);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMoreProducts);
    window.removeEventListener("resize", this.loadMoreProducts);
  }

  loadMoreProducts = (e) => {
    //If screen size changes from >1440px (3items in a row) to <1440px (2 itmes in a row)
    if (e.type === "resize" && window.innerWidth < 1440) {
      this.setState({
        renderedItems:
          this.state.renderedItems + (this.state.renderedItems % 2),
      });
    }
    //If screen size changes from <1440px (2items in a row) to >=1440px (3 items in a row)
    if (
      e.type === "resize" &&
      window.innerWidth >= 1440 &&
      this.state.renderedItems % 3 !== 0
    ) {
      this.setState({
        renderedItems:
          this.state.renderedItems + (3 - (this.state.renderedItems % 3)),
      });
    }
    //Load more items on scroll/resize
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
        document.body.offsetHeight ||
      window.innerHeight >= document.body.offsetHeight
    ) {
      if (this.props.products.length > this.state.renderedItems) {
        //render 3 more items on wide screen >=1440px (3 items in a row)
        if (window.innerWidth >= 1440) {
          const renderedItems = this.state.renderedItems + 3;
          this.setState({ renderedItems });
        }
        //render 2 more items on  screen <=1440px (2 or 1 items in a row)
        else {
          const renderedItems = this.state.renderedItems + 2;
          this.setState({ renderedItems });
        }
      }
      //Delete eventListeners when all items were rendered
      else {
        window.removeEventListener("scroll", this.loadMoreProducts);
        window.removeEventListener("resize", this.loadMoreProducts);
      }
    }
  };
  state = {
    renderedItems:
      this.props.products.length >= 6 ? 6 : this.props.products.length,
  };

  render() {
    const { activeCategory, products, activeCurrency, addToCart } = this.props;
    return (
      <React.Fragment>
        <h1 className="category-title">{activeCategory}</h1>
        <div className="product-cards-wrapper">
          {products.slice(0, this.state.renderedItems).map((product, index) => (
            <ProductCard
              activeCurrency={activeCurrency}
              key={index}
              product={product}
              addToCart={addToCart}
              quickShopingModalChange={this.handleQuickShopingModalChange}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListPage;
