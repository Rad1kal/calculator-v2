import calculate from "./calculate";
import chai from "chai";

chai.config.truncateThreshold = 0;
const expect = chai.expect;

function pressButtons(buttons) {
  return buttons.reduce((state, button) => {
    return calculate(state, button);
  }, {});
}

function expectButtons(buttons, expectation) {
  expect(pressButtons(buttons)).to.deep.equal(expectation);
}

describe("calculate", function() {
  const test = (buttons, expectation) => {
    it(`pressing ${buttons.join(", ")} should result in ${JSON.stringify(
      expectation,
    )}`, () => {
      expectButtons(buttons, expectation);
    });
  };

  // Adjusted tests to include complete state after calculation
  test(["6"], { total: null, next: "6", operation: undefined });
  test(["6", "6"], { next: "66", total: null, operation: undefined });
  test(["6", "+", "6"], { next: "6", total: "6", operation: "+" });
  test(["6", "+", "6", "="], { total: "12", next: null, operation: null });
  test(["0", "0", "+", "0", "="], { total: "0", next: null, operation: null });
  test(["6", "+", "6", "=", "9"], { next: "9", total: null, operation: null });
  test(["3", "+", "6", "=", "+"], { total: "9", next: null, operation: "+" });
  test(["3", "+", "6", "=", "+", "9"], {
    total: "9",
    operation: "+",
    next: "9",
  });
  test(["3", "+", "6", "=", "+", "9", "="], {
    total: "18",
    next: null,
    operation: null,
  });
  test(["3", "+", "=", "3", "="], { total: "6", next: null, operation: null });
  // ...

  // Reset after calculation
  test(["6", "+", "6", "=", "9"], { next: "9", total: null, operation: null });

  // Chained calculations
  test(["3", "+", "6", "=", "+"], { total: "9", next: null, operation: "+" });
  test(["3", "+", "6", "=", "+", "9"], {
    total: "9",
    operation: "+",
    next: "9",
  });
  test(["3", "+", "6", "=", "+", "9", "="], {
    total: "18",
    next: null,
    operation: null,
  });

  // Ignore '=' when operation is incomplete
  test(["3", "+", "=", "3", "="], { total: "6", next: null, operation: null });

  // Testing '+' button as initial input
  test(["+"], { total: undefined, next: undefined, operation: "+" });
  test(["+", "2"], { total: undefined, next: "2", operation: "+" });
  test(["+", "2", "+"], { total: "2", operation: "+", next: null });
  test(["+", "2", "+", "+"], { total: "2", operation: "+", next: null });
  test(["+", "2", "+", "5"], { next: "5", total: "2", operation: "+" });

  // Decimal numbers
  test(["0", ".", "4"], { total: null, next: "0.4", operation: undefined });
  test([".", "4"], { total: null, next: "0.4", operation: undefined });
  test([".", "4", "-", ".", "2"], {
    total: "0.4",
    next: "0.2",
    operation: "-",
  });
  test([".", "4", "-", ".", "2", "="], {
    total: "0.2",
    next: null,
    operation: null,
  });

  // Clearing with AC
  test(["1", "+", "2", "AC"], { total: null, next: null, operation: null });
  test(["+", "2", "AC"], { total: null, next: null, operation: null });

  // Percentage calculations
  test(["4", "%"], { total: null, next: "0.04", operation: null });
  test(["4", "%", "x", "2", "="], {
    total: "0.08",
    next: null,
    operation: null,
  });
  test(["2", "x", "2", "%"], { total: "0.04", next: "0.04", operation: null });

  // Preventing division by zero
  test(["5", "÷", "0", "="], { total: "0", next: null, operation: null });

  // Toggle plus/minus
  test(["5", "+/-"], { total: null, next: "-5", operation: undefined });
  test(["-5", "+/-"], { total: null, next: "5", operation: undefined });

  // Invalid button presses
  // Assuming 'ABC' is ignored by calculate, no change in state
  test(["ABC"], { total: undefined, next: undefined, operation: "ABC" });

  // Multiplication and Division operations
  test(["2", "x", "x"], { total: "2", operation: "x", next: null });
  test(["2", "÷", "÷"], { total: "2", operation: "÷", next: null });
  test(["2", "÷", "x", "+", "-", "x"], {
    total: "2",
    operation: "x",
    next: null,
  });

  // Additional tests for chaining multiple operations
  test(["2", "+", "3", "x", "4", "-"], {
    total: "20",
    operation: "-",
    next: null,
  });
  test(["7", "÷", "2", "=", "x", "4", "="], {
    total: "14",
    next: null,
    operation: null,
  });

  // Handling leading zeros
  test(["0", "0", "3"], { total: null, next: "03", operation: undefined });

  // Concatenating numbers after operation
  test(["2", "+", "3", "5"], { total: "2", operation: "+", next: "35" });
});
