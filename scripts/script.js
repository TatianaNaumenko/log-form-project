"use strict";



// 2
let fullName = document.querySelector(".full-name input");
function noDigits(event) {
  if ("1234567890".includes(event.key)) {
    event.preventDefault();
  }
}

fullName.addEventListener("keydown", noDigits);

// 3

let userName = document.querySelector(".username input");
function noPunctMarks(event) {
  let regExp = /[\.,;:]+/g;
  if (regExp.test(event.key)) {
    event.preventDefault();
  }
}

userName.addEventListener("keydown", noPunctMarks);
// это проверка на валидность адреса, я люблю регулярки но читала они много жрут ресурса
let mailInp = document.querySelector(".mail input");
function isValidEmail() {
  let regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let mail = this.value;
  if (!regExp.test(mail)) {
    alert("Адрес электронной почты не является валидным!");
  }
}
mailInp.addEventListener("blur", isValidEmail);

// 4

let check = document.getElementById("check");
check.addEventListener("change", function (e) {
  if (e.target.checked) {
    console.log("Согласен");
  } else {
    console.log("Не согласен");
  }
});

// 5
const inputs = document.querySelectorAll(
  ".form div input:not(#check):not(#btn)"
);
const passwordInp = document.querySelector(".password input");
const passwordReapetInp = document.querySelector(".password-repeat input");
const popap = document.getElementById("popap");
const btn = document.getElementById("btn");
const agreeLink = document.querySelector(".already-have-account");

btn.addEventListener("click", checkForSuccess);
// _____________________проверка успешно заполненной формы
function checkForSuccess(event) {
  // предотвращает отправку формы по умолчанию
  event.preventDefault();
  let allConditions = true;
  // let check = document.getElementById('check'); он получен был выше
  inputs.forEach((input) => {
    let inpVal = input.value;
    let prompt = input.previousElementSibling.textContent;
    if (!inpVal) {
      alert(`Заполните поле ${prompt}.`);
      allConditions = false;
    }
  });

  if (passwordInp.value.length < 8) {
    alert("Пароль должен содержать не менее 8 символов!");
    allConditions = false;
    if (btn.value === "Sign In") {
      console.log(btn);
      // btn.addEventListener('click', welcomeUser);
    }
  }
  if (passwordInp.value !== passwordReapetInp.value) {
    alert("Пароли не совпадают!");
    allConditions = false;
  }

  if (!check.checked) {
    alert("Не получено согласие с нашими условиями!");
    allConditions = false;
  }

  if (allConditions) {
    popap.style.transform = "translateY(0)";

    let close = document.querySelector(".close");
    close.addEventListener("click", closePopap);
    let btnPopap = document.getElementById("btn-in-popap");
    btnPopap.addEventListener("click", getLoginPage);
  }

  btn.addEventListener("click", checkForSuccess);
}

// -------------------функция закрывающая попапп
function closePopap() {
  popap.style.transform = "translateY(-100%)";
}

// ----------------функция имитация перехода на страницу логина
function getLoginPage() {
  closePopap();
  check.checked = false;
  inputs.forEach((input) => {
    input.value = "";
    let inpName = input.parentElement.className;
    if (
      inpName === "full-name" ||
      inpName === "mail" ||
      inpName === "password-repeat"
    ) {
      input.parentElement.remove();
    }
  });

  const title = document.querySelector(".content-left__title");
  title.innerHTML = "Log in to the system";
  document.querySelector(".agreement").remove();
  agreeLink.remove();
  btn.value = "Sign In";
  if (btn.value === "Sign In") {
    btn.addEventListener("click", welcomeUser);
  }
  btn.removeEventListener("click", checkForSuccess);
}

agreeLink.addEventListener("click", getLoginPage);

// -------------функция для кнопки на страницы имитации
function welcomeUser() {
  if (userName.value && passwordInp.value) {
    alert(`Добро пожаловать, ${userName.value}`);
  } else {
    alert("Заполните все поля!");
  }
  window.location.reload()
}
console.log('Это другое сообщение');

console.log('Привет! Я изучаю git и GitHub');
