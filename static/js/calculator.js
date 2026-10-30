// Basic four-operation calculator; no eval or external libraries are used.
document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector("#calculator-display");
  const history = document.querySelector("#calculator-history");
  const keys = document.querySelector(".calculator-keys");
  if (!display || !keys) return;

  let current = "0";
  let storedValue = null;
  let operator = null;
  let startNewNumber = false;
  let hasError = false;

  function show() {
    display.textContent = current;
  }

  function clear() {
    current = "0";
    storedValue = null;
    operator = null;
    startNewNumber = false;
    hasError = false;
    history.textContent = "";
    show();
  }

  function enterDigit(digit) {
    if (hasError) clear();
    if (startNewNumber) {
      current = digit;
      startNewNumber = false;
    } else if (current === "0") {
      current = digit;
    } else if (current.length < 14) {
      current += digit;
    }
    show();
  }

  function enterDecimal() {
    if (hasError) clear();
    if (startNewNumber) {
      current = "0.";
      startNewNumber = false;
    } else if (!current.includes(".")) {
      current += ".";
    }
    show();
  }

  function calculate(left, right, operation) {
    if (operation === "+") return left + right;
    if (operation === "-") return left - right;
    if (operation === "*") return left * right;
    if (operation === "/") return right === 0 ? null : left / right;
    return right;
  }

  function formatResult(value) {
    if (!Number.isFinite(value)) return null;
    return String(Number(value.toPrecision(11)));
  }

  function chooseOperator(nextOperator) {
    if (hasError) return;
    const value = Number(current);
    if (operator && !startNewNumber) {
      const result = calculate(storedValue, value, operator);
      const formatted = result === null ? null : formatResult(result);
      if (formatted === null) {
        current = "Cannot divide by zero";
        hasError = true;
        storedValue = null;
        operator = null;
        history.textContent = "";
        show();
        return;
      }
      current = formatted;
      show();
    }
    storedValue = Number(current);
    operator = nextOperator;
    startNewNumber = true;
    history.textContent = `${current} ${nextOperator}`;
  }

  function equals() {
    if (operator === null || storedValue === null || hasError) return;
    const left = storedValue;
    const right = Number(current);
    const activeOperator = operator;
    const result = calculate(left, right, activeOperator);
    const formatted = result === null ? null : formatResult(result);
    history.textContent = `${left} ${activeOperator} ${right} =`;
    current = formatted === null ? "Cannot divide by zero" : formatted;
    hasError = formatted === null;
    storedValue = null;
    operator = null;
    startNewNumber = true;
    show();
  }

  function deleteLast() {
    if (hasError) {
      clear();
      return;
    }
    if (startNewNumber) {
      current = "0";
      startNewNumber = false;
    } else {
      current = current.length > 1 ? current.slice(0, -1) : "0";
      if (current === "-") current = "0";
    }
    show();
  }

  function toggleSign() {
    if (hasError || Number(current) === 0) return;
    current = current.startsWith("-") ? current.slice(1) : `-${current}`;
    show();
  }

  function activate(button) {
    if (button.dataset.digit !== undefined) enterDigit(button.dataset.digit);
    if (button.dataset.operator) chooseOperator(button.dataset.operator);
    if (button.dataset.action === "clear") clear();
    if (button.dataset.action === "delete") deleteLast();
    if (button.dataset.action === "decimal") enterDecimal();
    if (button.dataset.action === "sign") toggleSign();
    if (button.dataset.action === "equals") equals();
  }

  keys.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) activate(button);
  });

  document.addEventListener("keydown", (event) => {
    if (/^[0-9]$/.test(event.key)) enterDigit(event.key);
    else if (event.key === ".") enterDecimal();
    else if (["+", "-", "*", "/"].includes(event.key)) chooseOperator(event.key);
    else if (event.key === "Enter" || event.key === "=") {
      event.preventDefault();
      equals();
    } else if (event.key === "Backspace") deleteLast();
    else if (event.key === "Escape") clear();
  });
});
