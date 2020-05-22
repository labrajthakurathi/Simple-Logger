var colorArray = [
  " #FFFFFF",
  "#FFFAFA",
  "#F0FFF0",
  "	#F5FFFA",
  "#F0F8FF",
  "#F0FFFF",
  "#FFF5EE",
  "#F5F5DC",
  "#FFFAF0",
  "#FFFFF0",
  "#F5F5F5",
];

let itemWrapper = document.querySelector(".ul");
let btn = document.querySelector("button");
let logCount = document.querySelector("#total_logs");
let btnSubmit = document.querySelector("#btn-submit");
let addItemFrom = document.querySelector(".hidden");
let appData = [];
logCount.textContent = 0;

btn.addEventListener("click", displayForm);
btnSubmit.addEventListener("click", addItem);

function showItem() {
  let end = document.querySelector(".end");
  let ul = document.querySelector(".ul");

  if (localStorage.getItem("data") !== null) {
    appData = JSON.parse(localStorage.getItem("data"));

    appData.map((data, index) => {
      let item = document.createElement("li");
      item.innerHTML = `<div class="date-wrapper"><p><small>${
        data.date
      }</small></p></div>
            <span class="li-iterator">${index + 1}</span>
            <span>${data.logItems[0]}</span>
            <span>${data.logItems[1]}</span>
            <span>${data.logItems[2]}</span>`;
      ul.insertBefore(item, end);
      item.style.backgroundColor = data.color;
      logCount.textContent = appData.length;
    });
  } else {
    console.log("nothing there");
  }
}

showItem();
function displayForm() {
  addItemFrom.style.display = "block";
  btn.style.display = "none";
}

function addItem(e) {
  e.preventDefault();

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  let date = `${year}/${month + 1}/${day}`;

  let random = Math.floor(Math.random() * 10);
  let color = colorArray[random];

  let item1 = document.querySelector("#log_1").value;
  let item2 = document.querySelector("#log_2").value;
  let item3 = document.querySelector("#log_3").value;
  if (item1 !== "" && item2 !== "" && item3 !== "") {
    let logItems = [item1, item2, item3];

    sendData(date, color, logItems);

    btn.style.display = "block";
    addItemFrom.style.display = "none";
  } else {
    alert();
  }
}

function sendData(date, color, logItems) {
  let rawData = {
    date,
    color,
    logItems,
  };
  appData.push(rawData);

  let dispatchData = JSON.stringify(appData);
  localStorage.setItem("data", dispatchData);
  location.reload();
}

function alert() {
  navigator.vibrate(300);
  let form = document.querySelector("form");
  let alertBox = document.createElement("div");
  alertBox.classList.add("alert");
  alertBox.textContent = "All Fields are Required !";

  addItemFrom.insertBefore(alertBox, form);
  setTimeout(() => {
    alertBox.classList.remove("alert");
    alertBox.textContent = "";
  }, 2000);
}
