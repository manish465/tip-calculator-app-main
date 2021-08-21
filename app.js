const billEl = document.querySelector("#bill input");
const tipOptions = document.querySelector("#tip > div");
const numberPeopleEl = document.querySelector("#people input");
const customEl = document.querySelector(
    ".calculator__group-tips-amount-custom",
);
const customInputEl = document.querySelector(
    ".calculator__group-tips-amount-custom-input",
);
const tipEl = document.querySelector("#tip-amount");
const totalEl = document.querySelector("#total-amount");
const resetBtn = document.querySelector(".calculator__results-btn");

class Calculator {
    constructor() {
        this.bill = 0;
        this.tipRate = 5;
        this.tipAmount = 0;
        this.total = 0;
        this.numberPeople = 1;
    }

    calcTotal() {
        this.tipAmount = (this.tipRate * (this.bill / this.numberPeople)) / 100;
        this.total = this.bill / this.numberPeople + this.tipAmount;
    }

    updateUI() {
        tipEl.textContent = `$${this.tipAmount.toFixed(2)}`;
        totalEl.textContent = `$${this.total.toFixed(2)}`;

        this.total > 0
            ? resetBtn.classList.remove("disabled")
            : resetBtn.classList.add("disabled");
    }

    reset() {
        this.tipAmount = 0;
        this.total = 0;
        billEl.value = 0;
        numberPeopleEl.value = 1;
        document.querySelector(".selected").classList.remove("selected");
        tipOptions.firstElementChild.classList.add("selected");
        this.updateUI();
    }
}

// Init new calculator instance
const tipCalculator = new Calculator();

// Reset
resetBtn.addEventListener("click", (e) => {
    if (!e.target.classList.contains("disabled")) tipCalculator.reset();
});

billEl.addEventListener("input", (e) => {
    // Add bill
    tipCalculator.bill = isNaN(parseFloat(e.target.value))
        ? 0
        : parseFloat(e.target.value);
    tipCalculator.calcTotal();
    tipCalculator.updateUI();
});

// Focus Highlight
billEl.addEventListener("focusin", (e) => {
    e.target.parentElement.classList.add("highlight");
});

numberPeopleEl.addEventListener("focusin", (e) => {
    e.target.parentElement.classList.add("highlight");
});

billEl.addEventListener("focusout", (e) => {
    e.target.parentElement.classList.remove("highlight");
});

numberPeopleEl.addEventListener("focusout", (e) => {
    e.target.parentElement.classList.remove("highlight");
});

tipOptions.addEventListener("click", (e) => {
    if (
        !e.target.classList.contains("selected") &&
        !e.target.className.includes("custom")
    ) {
        // Remove previously selected tip amount
        document.querySelector(".selected").classList.remove("selected");
        // Add class to newly selected tip amount
        e.target.classList.add("selected");
        // Get tip amount
        tipCalculator.tipRate = parseInt(e.target.innerText);
        tipCalculator.calcTotal();
        tipCalculator.updateUI();
    } else {
        document.querySelector(".selected").classList.remove("selected");
        e.target.classList.add("active", "selected");
        e.target.firstElementChild.focus();
        tipCalculator.calcTotal();
        tipCalculator.updateUI();
    }
});

customEl.addEventListener("click", (e) => {
    const regex = /^[a-zA-Z0-9_.-]*$/;

    if (!regex.test(e.target.firstChild.textContent)) {
        e.target.firstChild.remove();
        e.target.firstChild.style.display = "inline-block";
    }
});

customInputEl.addEventListener("input", (e) => {
    tipCalculator.tipRate = parseInt(e.target.value) || 1;
    tipCalculator.calcTotal();
    tipCalculator.updateUI();
});

customInputEl.addEventListener("focusout", (e) => {
    e.target.style.display = "none";
    e.target.parentElement.classList.remove("active");
    customEl.prepend(`${tipCalculator.tipRate}%`);
});

numberPeopleEl.addEventListener("input", (e) => {
    tipCalculator.numberPeople = parseInt(e.target.value) || 1;
    tipCalculator.calcTotal();
    tipCalculator.updateUI();
});
