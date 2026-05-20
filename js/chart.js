let pieChart;
let barChart;

const pieCtx = document.getElementById("pieChart");

const barCtx = document.getElementById("barChart");

function updateCharts() {
    const categoryTotals = {};
    expenses.forEach(expense => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += Number(expense.amount);
        } else {
            categoryTotals[expense.category] = Number(expense.amount);
        }
    });

    const labels = Object.keys(categoryTotals);

    const data = Object.values(categoryTotals);

    // DESTROY OLD CHARTS

    if (pieChart) {
        pieChart.destroy();
    }
    if (barChart) {
        barChart.destroy();
    }
    // PIE CHART

    pieChart = new Chart(pieCtx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: data,

                backgroundColor: [

                    "#2563eb",
                    "#16a34a",
                    "#dc2626",
                    "#f59e0b",
                    "#9333ea",
                    "#0ea5e9"

                ],
                borderWidth: 2
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"
                }
            }
        }
    });

    // BAR CHART

    barChart = new Chart(barCtx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [{

                label: "Expenses",

                data: data,

                backgroundColor: "#2563eb",

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

updateCharts();