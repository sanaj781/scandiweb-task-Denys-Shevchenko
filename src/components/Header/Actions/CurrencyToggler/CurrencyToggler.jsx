import React, { Component } from "react";
import { ReactComponent as ToggleVector } from "icons/Vector.svg";
import CurrenciesList from "./CurrenciesList";

class CurrencyToggler extends Component {
  //for outside click detection in hideCurrenciesList method
  toggleRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    // hide currency list when cart overlay is active
    if (!prevProps.cartOverlayStatus && this.props.cartOverlayStatus)
      this.setState({ toggle: false });
  }
  state = {};
  //toggle button
  toggleCurrenciesList = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  //hide when clicked outsie of currency list wrapper
  hideCurrenciesList = (e) => {
    // close only if clicked outside of "currency-switcher"
    if (!this.toggleRef.current.contains(e.target)) {
      this.setState({ toggle: false });
    }
  };
  render() {
    return (
      <div
        className="currency-switcher"
        onClick={this.toggleCurrenciesList}
        onBlur={this.toggleCurrenciesList}
        ref={this.toggleRef}
      >
        <div className="currency-main">
          <div className="currency-name">
            {this.props.activeCurrency.symbol}
          </div>
          <ToggleVector
            className={this.state.toggle ? "toggler-active" : null}
          />
        </div>
        {this.state.toggle ? (
          <CurrenciesList
            currencies={this.props.currencies}
            activeCurrency={this.props.activeCurrency}
            toggleIsActive={this.state.toggle}
            onCurrencyChange={this.props.onCurrencyChange}
            toggleCurrenciesList={this.toggleCurrenciesList}
            hide={this.hideCurrenciesList}
          />
        ) : null}
      </div>
    );
  }
}
export default CurrencyToggler;
