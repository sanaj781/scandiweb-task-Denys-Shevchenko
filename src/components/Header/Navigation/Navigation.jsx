import React, { Component } from "react";
import NavItem from "./NavItem";

class Navigation extends Component {
  render() {
    return (
      <nav>
        {this.props.categories.map(({ name }, index) => (
          <NavItem
            key={index}
            activeCategory={this.props.activeCategory}
            categoryName={name}
            onCategoryChange={this.props.onCategoryChange}
          />
        ))}
      </nav>
    );
  }
}

export default Navigation;
