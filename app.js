// Expense Tracker Logic
let expenses = [];

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense, idx) => {
    const item = document.createElement("div");
    item.className =
      "d-flex justify-content-between align-items-center py-2 px-2 border-bottom expense-item";
    item.innerHTML = `
      <div>
        <span class="fw-semibold">${expense.name}</span>
        <span class="text-muted small ms-2">${expense.date}</span>
      </div>
      <div>
        <span class="me-3">₦${expense.amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}</span>
        <span class="remove-btn" data-idx="${idx}" title="Remove">&times;</span>
      </div>
    `;
    expenseList.appendChild(item);
  });
  // Add remove event listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const idx = this.getAttribute("data-idx");
      expenses.splice(idx, 1);
      renderExpenses();
      updateTotal();
    });
  });
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmount.textContent = `₦${total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);
  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid name and amount.");
    return;
  }
  const date = new Date().toLocaleDateString();
  expenses.push({ name, amount, date });
  renderExpenses();
  updateTotal();
  expenseForm.reset();
  expenseName.focus();
});

// Initial render
renderExpenses();
updateTotal();
