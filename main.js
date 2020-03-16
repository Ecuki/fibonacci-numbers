window.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#input");
  const button = document.querySelector("button");
  const result = document.querySelector("#result");
  let timerID = null;
  input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      button.click();
    }
  });

  input.addEventListener("change", function(e) {
    if (e.target.value === "") {
      e.target.classList.remove("error");
    }
  });

  const showError = () => {
    input.classList.add("error");
  };

  const clear = () => {
    clearTimeout(timerID);
    input.value = "";
    input.classList.remove("error");
    result.textContent = "";
  };

  const fibonacci = n => {
    let x = 0,
      y = 1;
    if (n <= 1) return n;
    if (n <= 2) return n - 1;
    for (let i = 0; i < n - 1; i++) {
      let tempY = y;
      y = tempY + x;
      x = tempY;
    }
    return y;
  };

  const createRow = n => {
    const row = document.createElement("div");
    row.classList.add("result__element");
    row.classList.add("hidden");
    const description = document.createElement("span");
    const value = document.createElement("span");
    description.textContent = `F(${n}):`;
    value.textContent = `${fibonacci(n)}`;
    row.appendChild(description);
    row.appendChild(value);
    return row;
  };

  const showResult = (n, counter = 0) => {
    let count = counter;
    const row = createRow(count);
    result.appendChild(row);
    result.scrollTop = result.scrollHeight;
    setTimeout(() => {
      row.classList.remove("hidden");
    }, 0);
    count++;
    timerID = count < n && setTimeout(() => showResult(n, count), 3000);
  };

  button.addEventListener("click", e => {
    const n = input.value;
    if (!isNaN(n) && n >= 0 && n !== "") {
      clear();
      showResult(n);
    } else showError();
  });
});
