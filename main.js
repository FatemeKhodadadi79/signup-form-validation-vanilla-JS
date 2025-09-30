//  Definitions for button elements

let nextbtn = document.querySelectorAll(".next-btn");
let prebtn = document.querySelectorAll(".pre-btn");
let Confirmationbtn = document.querySelector(".Confirmation-btn");
let nobtn = document.getElementById("nobtn");
let yesbtn = document.getElementById("yesbtn");
let currentPage = 1;

// Definitions for input elements

let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let NationalIDInput = document.getElementById("NationalID");
let EmailInput = document.getElementById("Email");
let PasswordInput = document.getElementById("Password");
let RepeadPassInput = document.getElementById("RepeadPass");

//  Definitions for p elements

let allertName = document.getElementById("allertName");
let allertAge = document.getElementById("allertAge");
let allertID = document.getElementById("allertID");
let EmailAllert = document.getElementById("EmailAllert");
let PasswordAllert = document.getElementById("PasswordAllert");
let RepeadPassAllert = document.getElementById("RepeadPassAllert");

// Definitions for eyeIcons

let eyeicons1 = document.getElementById("eyeicons1");
let eyeicons2 = document.getElementById("eyeicons2");

// Definitions for ConformationPage divs

let FinalStepDiv = document.getElementById("FinalStep");
let FinalConformDiv = document.querySelector(".FinalConform");

// Next Button
nextbtn.forEach((NextButtons) =>
  NextButtons.addEventListener("click", function nextPage() {
    if (currentPage === 1 && !validatePage1()) return;
    if (currentPage === 2 && !validatePage2()) return;
    currentPage++;
    showpage(currentPage);
    GetInformations(currentPage);
  })
);

// Previous Button
prebtn.forEach((PreButtons) =>
  PreButtons.addEventListener("click", function PrePage() {
    currentPage--;
    showpage(currentPage);
  })
);

//Main function for previous and next buttons
function showpage(page) {
  let pages = document.querySelectorAll(".page");
  pages.forEach((items) => (items.style.display = "none"));
  document.getElementById("Step" + page).style.display = "block";
}

// Storing User Data
function GetInformations(page) {
  if (page == 2) {
    sessionStorage.setItem("name", nameInput.value);
    sessionStorage.setItem("age", ageInput.value);
    sessionStorage.setItem("NationalID", NationalIDInput.value);
  } else if (page == 3) {
    sessionStorage.setItem("Email", EmailInput.value);
    sessionStorage.setItem("Password", PasswordInput.value);
    sessionStorage.setItem("RepeadPass", RepeadPassInput.value);
    UpdateInformations();
  }
}
function UpdateInformations() {
  document.getElementById("ConformName").textContent =
    sessionStorage.getItem("name");
  document.getElementById("ConformAge").textContent =
    sessionStorage.getItem("age");
  document.getElementById("ConformID").textContent =
    sessionStorage.getItem("NationalID");
  document.getElementById("ConformEmail").textContent =
    sessionStorage.getItem("Email");
}

// ConformationPage
Confirmationbtn.addEventListener("click", () => {
  FinalStepDiv.style.display = "flex";
});

nobtn.addEventListener("click", () => {
  FinalStepDiv.style.display = "none";
  document.querySelector(".EditInform").textContent =
    "لطفا مشخصات  خود را اصلاح کنید";
  prebtn.forEach((prebtns) => (prebtns.style.backgroundColor = "#c40808"));
});

yesbtn.addEventListener("click", () => {
  FinalConformDiv.innerHTML = " ";
  FinalConformDiv.innerHTML =
    `<div style="display:flex ; align-items: center">
    تبریک ثبت نام شما با موفقیت انجام شد
    <i class="fa-solid fa-circle-check" style="color:#23a728; font-size:20px;"></i>
    </div>` +
    `<div class="BackButtonDiv"><button id="BackButton">بازگشت</button></div>`;

  let BackButton = document.getElementById("BackButton");
  BackButton.addEventListener("click", () => {
    location.reload();
  });
});

// Validation Codes
function validatePage1() {
  allertName.textContent = "";
  allertAge.textContent = "";
  allertID.textContent = "";
  let isValid = true;

  if (nameInput.value.trim() === "") {
    allertName.textContent = "نام و نام خانوادگی نمیتواند خالی باشد!";
    isValid = false;
  }
  if (ageInput.value.trim() === "") {
    allertAge.textContent = "سن نمیتواند خالی باشد!";
    isValid = false;
  }

  let nationalID = NationalIDInput.value.trim();
  if (nationalID === "") {
    allertID.textContent = "کد ملی نمیتواند خالی باشد!";
    isValid = false;
  }
  if (isNaN(nationalID) || nationalID.length !== 10) {
    allertID.textContent = "کد ملی باید یک عدد ۱۰ رقمی باشد!";
    isValid = false;
  }
  return isValid;
}

function validatePage2() {
  EmailAllert.textContent = "";
  PasswordAllert.textContent = "";
  RepeadPassAllert.textContent = "";
  let isValid = true;
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailValue = EmailInput.value.trim();
  let PasswordValue = PasswordInput.value.trim();
  let RepeadPassValue = RepeadPassInput.value.trim();

  if (emailValue !== "" && !emailPattern.test(emailValue)) {
    EmailAllert.textContent = "ایمیل شما معتبر نمی باشد!";
    isValid = false;
  }
  if (PasswordInput.value.trim() === "") {
    PasswordAllert.textContent = "پسورد نمیتواند خالی باشد!";
    isValid = false;
  }
  if (RepeadPassInput.value.trim() === "") {
    RepeadPassAllert.textContent = "تکرار پسورد را لطفا وارد کنید!";
    isValid = false;
  }
  if (PasswordValue !== RepeadPassValue) {
    RepeadPassAllert.textContent = "تکرار پسورد با پسورد مطابقت ندارد !";
    isValid = false;
  }
  return isValid;
}

// Show or Hide Password(eyeIcons)
eyeicons1.addEventListener("click", () => {
  if (PasswordInput.type == "password") {
    PasswordInput.type = "text";
  } else {
    PasswordInput.type = "password";
  }

  document.querySelector(".fa-eye").classList.toggle("hidden");
  document.querySelector(".fa-eye-slash").classList.toggle("hidden");
});

eyeicons2.addEventListener("click", () => {
  if (RepeadPassInput.type == "password") {
    RepeadPassInput.type = "text";
  } else {
    RepeadPassInput.type = "password";
  }

  document.querySelector(".eye2").classList.toggle("hidden");
  document.querySelector(".eyeslash2").classList.toggle("hidden");
});
