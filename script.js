document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("email").value;
            localStorage.setItem("userEmail", email);
            window.location.href = "budget.html";
        });
    }
});

let transactions = [];
let balance = 0;
function addTransaction() {
    let income = parseFloat(document.getElementById("income").value) || 0;
    let expense = parseFloat(document.getElementById("expense").value) || 0;

    balance += income - expense;
    transactions.push({ income, expense });
    updateUI();
}

function updateUI() {
    document.getElementById("balance").innerText = balance;
    let list = document.getElementById("transactionList");
    list.innerHTML = "";
    transactions.forEach((t, index) => {
        let item = document.createElement("li");
        item.innerText = `Income: $${t.income}, Expense: $${t.expense}`;
        list.appendChild(item);
    });

    if (balance < 500) {
        alert("Balance is low! A notification has been sent.");
    }
}

function showChart() {
    localStorage.setItem("chartData", JSON.stringify({ balance, transactions }));
    window.location.href = "chart.html";
}

if (window.location.pathname.includes("chart.html")) {
    let data = JSON.parse(localStorage.getItem("chartData"));
    if (data) {
        let ctx = document.getElementById("budgetChart").getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Income", "Expenses", "Balance"],
                datasets: [{
                    data: [data.transactions.reduce((sum, t) => sum + t.income, 0),
                           data.transactions.reduce((sum, t) => sum + t.expense, 0),
                           data.balance],
                    backgroundColor: ["green", "red", "yellow"]
                }]
            }
        });
    }
}
