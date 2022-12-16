import React, { Component } from "react";
import "css/loader.css";
//While information is loading this Loader is showing
class Loader extends Component {
  render() {
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  }
}

export default Loader;
