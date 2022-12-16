import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavItem extends Component {
  render() {
    const { activeCategory, onCategoryChange, categoryName } = this.props;
    //Setting active class for choosen(active) Category
    const setNavClassName = (navItem) => {
      return navItem === activeCategory ? "nav-item active" : "nav-item";
    };
    return (
      <Link
        to="/"
        onClick={() => onCategoryChange(categoryName)}
        className={setNavClassName(categoryName)}
      >
        {categoryName}
      </Link>
    );
  }
}

export default NavItem;
