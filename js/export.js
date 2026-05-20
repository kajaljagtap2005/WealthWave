const exportBtn = document.getElementById("exportCSV");

exportBtn.addEventListener("click", ()=>{

    let csv = "Title,Amount,Category,Date\n";

    expenses.forEach(expense => {

        csv += `${expense.title},${expense.amount},${expense.category},${expense.date}\n`;

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "expenses.csv";

    a.click();

});