import Big from "big.js";
import operate from "./operate";
import isNumber from "./isNumber";

export default function calculate(obj, buttonName) {
  let { total, next, operation } = obj;

  switch (buttonName) {
    case "AC":
      return { total: null, next: null, operation: null };

    case ".":
      if (next && !next.includes(".")) {
        next += ".";
      } else if (!next) {
        next = "0.";
      }
      break;

    case "%":
      if (next) {
        const value = operation ? operate(total, next, operation) : next;
        next = Big(value)
          .div(Big("100"))
          .toString();
        total = operation ? next : null;
        operation = null;
      }
      break;

    case "=":
      if (next && operation) {
        total = operate(total, next, operation);
        next = null;
        operation = null;
      }
      break;

    case "+/-":
      if (next) {
        next = (-1 * parseFloat(next)).toString();
      } else if (total) {
        total = (-1 * parseFloat(total)).toString();
      }
      break;

    default:
      if (isNumber(buttonName)) {
        if (!(buttonName === "0" && next === "0")) {
          next = next ? next + buttonName : buttonName;
          if (!operation) {
            total = null;
          }
        }
      } else {
        if (next) {
          total = operation ? operate(total, next, operation) : next;
          next = null;
        }
        operation = buttonName;
      }
  }

  return { total, next, operation };
}
