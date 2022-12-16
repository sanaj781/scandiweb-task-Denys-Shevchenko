import React, { Component } from "react";
//Depending on received "attributesStyle" value (cartOverlay || PDP|| cartPage)
//Attributes Component will be rendered styled accordingly
class Attributes extends Component {
  render() {
    const {
      attributes,
      defaultAttributes,
      handleAttributeChange,
      attributesStyle,
    } = this.props;

    const setAttributeClassName = (name, value, type) => {
      const className =
        attributesStyle === "cartOverlay"
          ? "-overlay"
          : attributesStyle === "PDP"
          ? "-PDP"
          : attributesStyle === "cartPage"
          ? "-cartPage"
          : undefined;
      if (name && value && type) {
        //Setting styles for all attributes of an item
        for (const attribute of defaultAttributes) {
          if (attribute.name === name) {
            if (attribute.value === value) {
              if (type === "swatch") {
                return `attribute-value-swatch${className} active-attribute-value-swatch${className}`;
              } else
                return `attribute-value${className} active-attribute-value${className}`;
            } else {
              if (type === "swatch") {
                return `attribute-value-swatch${className}`;
              } else return `attribute-value${className}`;
            }
          }
        }
      } else if (name && !value && !type) return `${name}${className}`;
    };
    return (
      <div className={setAttributeClassName("item-attributes-wraper")}>
        {attributes.map(({ name, type, items }, index) => (
          <div key={index} className={setAttributeClassName("item-attribute")}>
            <div className={setAttributeClassName("attr-name")}>
              {name + ":"}
            </div>

            <div className={`${setAttributeClassName("attributes")}-${type}`}>
              {items.map(({ value }, index) => (
                <div
                  key={index}
                  //Onclick works only on PDP, doesn`t work on cartPage and cartOverlay page
                  onClick={
                    attributesStyle === "PDP"
                      ? () => handleAttributeChange(name, value)
                      : null
                  }
                  className={setAttributeClassName(name, value, type)}
                  style={type === "swatch" ? { background: value } : null}
                >
                  {type === "swatch" ? null : value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Attributes;
