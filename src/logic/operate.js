import Big from "big.js";

export default function operate(numberOne, numberTwo, operation) {
  const one = Big(numberOne || "0");
  const two = Big(
    numberTwo || (operation === "÷" || operation === "x" ? "1" : "0"),
  );

  switch (operation) {
    case "+":
      return one.plus(two).toString();

    case "-":
      return one.minus(two).toString();

    case "x":
      return one.times(two).toString();

    case "÷":
      if (two.eq(Big("0"))) {
        // Use Big.js .eq() method to check for equality
        alert("Divide by 0 error");
        return "0";
      } else {
        return one.div(two).toString();
      }

    default:
      throw Error(`Unknown operation '${operation}'`);
  }
}
