const trackBtn = document.getElementById("trackBtn");

trackBtn.addEventListener("click", ()=>{

    alert("Please Login or Signup First to Track Expenses");

    window.location.href = "login.html";

});


// FEEDBACK FORM

const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function(e){

    e.preventDefault();

    alert("Your Feedback is Submitted Successfully!");

    feedbackForm.reset();

});

// ======================
// DARK MODE
// ======================

const themeToggle = document.getElementById("themeToggle");

const currentTheme = localStorage.getItem("theme");


// LOAD SAVED THEME

if(currentTheme === "dark"){

    document.body.classList.add("dark-mode");

    themeToggle.innerText = "☀️ Light Mode";

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
// LOGIN SESSION UI
// ======================

const username = localStorage.getItem("username");

const email = localStorage.getItem("email");


const trackerNav = document.getElementById("trackerNav");

const loginNav = document.getElementById("loginNav");

const profileNav = document.getElementById("profileNav");


const homeProfileName = document.getElementById("homeProfileName");

const homeProfileUsername = document.getElementById("homeProfileUsername");

const homeProfileEmail = document.getElementById("homeProfileEmail");


// IF USER LOGGED IN

if(username){

    trackerNav.style.display = "block";

    profileNav.style.display = "block";

    loginNav.classList.add("hidden");


    homeProfileName.innerText = username;

    homeProfileUsername.innerText = username;

    homeProfileEmail.innerText = email;

}


// LOGOUT

// ======================
// HOME PAGE LOGOUT
// ======================

const homeLogoutBtn = document.getElementById("homeLogoutBtn");

if(homeLogoutBtn){

    homeLogoutBtn.addEventListener("click", ()=>{

        const confirmLogout = confirm("Are you sure you want to logout?");

        if(confirmLogout){

            // CLEAR USER SESSION

            localStorage.removeItem("username");

            localStorage.removeItem("email");

            localStorage.removeItem("password");


            // REDIRECT HOME

            window.location.href = "index.html";

        }

    });

}