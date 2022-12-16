import React, { Component } from "react";
class CurrenciesList extends Component {
  componentDidMount() {
    document.addEventListener("click", this.props.hide);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.props.hide);
  }

  render() {
    const {
      activeCurrency,
      currencies,
      onCurrencyChange,
      toggleCurrenciesList,
    } = this.props;

    const setCurrencyClassName = (currency) => {
      return currency === activeCurrency.symbol
        ? "currency active-currency "
        : "currency";
    };

    return (
      <div className="toggle-currencies-list">
        {currencies.map(({ symbol, label }, index) => (
          <div
            onClick={() => {
              onCurrencyChange(symbol);
              toggleCurrenciesList();
            }}
            key={index}
            className={setCurrencyClassName(symbol)}
          >
            {`${symbol} ${label}`}
          </div>
        ))}
      </div>
    );
  }
}

export default CurrenciesList;
