// ======================
// GET ELEMENTS
// ======================

const expenseForm = document.getElementById("expenseForm");

const expenseList = document.getElementById("expenseList");

const budgetInput = document.getElementById("budgetInput");

const setBudgetBtn = document.getElementById("setBudgetBtn");

const totalBudget = document.getElementById("totalBudget");

const totalExpenses = document.getElementById("totalExpenses");

const remainingBalance = document.getElementById("remainingBalance");

const searchInput = document.getElementById("searchInput");

const filterCategory = document.getElementById("filterCategory");

const exportCSV = document.getElementById("exportCSV");

const welcomeUser = document.getElementById("welcomeUser");

const logoutBtn = document.getElementById("logoutBtn");


// ======================
// LOCAL STORAGE
// ======================

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let budget = localStorage.getItem("budget") || 0;

let editId = null;


// ======================
// USERNAME
// ======================

const username = localStorage.getItem("username");

if(welcomeUser){

    welcomeUser.innerText = `Welcome ${username} 👋`;

}

// PROFILE SECTION

const profileName = document.getElementById("profileName");

const profileUsername = document.getElementById("profileUsername");

const profileEmail = document.getElementById("profileEmail");

const userEmail = localStorage.getItem("email");


if(profileName){

    profileName.innerText = username;

}

if(profileUsername){

    profileUsername.innerText = username;

}

if(profileEmail){

    profileEmail.innerText = userEmail;

}

// ======================
// INITIAL LOAD
// ======================

displayExpenses(expenses);

updateSummary();

if(typeof updateCharts === "function"){

    updateCharts();

}

totalBudget.innerText = `₹${budget}`;



// ======================
// SET BUDGET
// ======================

if(setBudgetBtn){

    setBudgetBtn.addEventListener("click", ()=>{

        budget = budgetInput.value;

        localStorage.setItem("budget", budget);

        totalBudget.innerText = `₹${budget}`;

        updateSummary();

    });

}



// ======================
// ADD EXPENSE
// ======================

if(expenseForm){

    expenseForm.addEventListener("submit", function(e){

        e.preventDefault();

        const title = document.getElementById("title").value;

        const amount = document.getElementById("amount").value;

        const category = document.getElementById("category").value;

        const date = document.getElementById("date").value;


        if(editId){

            expenses = expenses.map(expense => {

                if(expense.id === editId){

                    return{

                        id: editId,

                        title,

                        amount,

                        category,

                        date

                    };

                }

                return expense;

            });

            editId = null;

        }else{

            const expense = {

                id: Date.now(),

                title,

                amount,

                category,

                date

            };

            expenses.push(expense);

        }

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses(expenses);

        updateSummary();

        if(typeof updateCharts === "function"){

            updateCharts();

        }

        expenseForm.reset();

    });

}



// ======================
// DISPLAY EXPENSES
// ======================

function displayExpenses(data){

    if(!expenseList) return;

    expenseList.innerHTML = "";

    data.forEach(expense => {

        expenseList.innerHTML += `

            <tr>

                <td>${expense.title}</td>

                <td>₹${expense.amount}</td>

                <td>${expense.category}</td>

                <td>${expense.date}</td>

                <td>

                    <button class="btn btn-primary btn-sm edit-btn" data-id="${expense.id}">

                        Edit

                    </button>

                    <button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}



// ======================
// DELETE & EDIT
// ======================

if(expenseList){

    expenseList.addEventListener("click", function(e){

        // DELETE

        if(e.target.classList.contains("delete-btn")){

            const id = Number(e.target.getAttribute("data-id"));

            expenses = expenses.filter(expense => expense.id !== id);

            localStorage.setItem("expenses", JSON.stringify(expenses));

            displayExpenses(expenses);

            updateSummary();

            if(typeof updateCharts === "function"){

                updateCharts();

            }

        }


        // EDIT

        if(e.target.classList.contains("edit-btn")){

            const id = Number(e.target.getAttribute("data-id"));

            const expense = expenses.find(expense => expense.id === id);

            document.getElementById("title").value = expense.title;

            document.getElementById("amount").value = expense.amount;

            document.getElementById("category").value = expense.category;

            document.getElementById("date").value = expense.date;

            editId = id;

        }

    });

}



// ======================
// UPDATE SUMMARY
// ======================

function updateSummary(){

    const expenseTotal = expenses.reduce((total, expense)=>{

        return total + Number(expense.amount);

    },0);

    if(totalExpenses){

        totalExpenses.innerText = `₹${expenseTotal}`;

    }

    if(remainingBalance){

        remainingBalance.innerText = `₹${budget - expenseTotal}`;

    }

}



// ======================
// SEARCH
// ======================

if(searchInput){

    searchInput.addEventListener("keyup", ()=>{

        const value = searchInput.value.toLowerCase();

        const filtered = expenses.filter(expense => {

            return expense.title.toLowerCase().includes(value)

            || expense.category.toLowerCase().includes(value);

        });

        displayExpenses(filtered);

    });

}



// ======================
// FILTER
// ======================

if(filterCategory){

    filterCategory.addEventListener("change", ()=>{

        const category = filterCategory.value;

        if(category === "All"){

            displayExpenses(expenses);

            return;

        }

        const filtered = expenses.filter(expense => {

            return expense.category === category;

        });

        displayExpenses(filtered);

    });

}



// ======================
// EXPORT CSV
// ======================

if(exportCSV){

    exportCSV.addEventListener("click", ()=>{

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

}



// ======================
// LOGOUT
// ======================

// ======================
// DASHBOARD LOGOUT
// ======================

if(logoutBtn){

    logoutBtn.addEventListener("click", ()=>{

        const confirmLogout = confirm("Are you sure you want to logout?");

        if(confirmLogout){

            // CLEAR SESSION

            localStorage.removeItem("username");

            localStorage.removeItem("email");

            localStorage.removeItem("password");


            // REDIRECT

            window.location.href = "index.html";

        }

    });

}

// ======================
// DARK MODE
// ======================

const themeToggle = document.getElementById("themeToggle");

const currentTheme = localStorage.getItem("theme");


// LOAD SAVED THEME

if(currentTheme === "dark"){

    document.body.classList.add("dark-mode");

    themeToggle.innerText = "☀️";

}


// TOGGLE THEME

if(themeToggle){

    themeToggle.addEventListener("click", ()=>{

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){

            localStorage.setItem("theme", "dark");

            themeToggle.innerText = "☀️ Light Mode";

        }else{

            localStorage.setItem("theme", "light");

           themeToggle.innerText = "🌙 Dark Mode";

        }

    });

}

// ======================
// TOAST NOTIFICATION
// ======================

const toastBox = document.getElementById("toastBox");

function showToast(message, type = "success"){

    const toast = document.createElement("div");

    toast.classList.add("toast");

    if(type === "error"){

        toast.classList.add("error");

    }

    toast.innerHTML = `

        <i class="bi bi-check-circle-fill"></i>

        ${message}

    `;

    toastBox.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}