let student_name = document.querySelector("#name");
let student_id = document.querySelector("#student_id");
let email = document.querySelector("#student-email");
let contact_no = document.querySelector("#student_contact");
let btn = document.querySelector("button");

// Right Part
let name_box = document.querySelector("#name_box");
let id_box = document.querySelector("#id_box");
let email_box = document.querySelector("#email_box");
let contact_box = document.querySelector("#contact_box");
let right_part = document.querySelector(".right-part");

btn.addEventListener("click", btn_clicked);

// Load saved data from local storage on page load
document.addEventListener("DOMContentLoaded", loadSavedData);

function btn_clicked() {
  // Fetching the input values and trimming whitespace
  const nameValue = student_name.value.trim();
  const idValue = student_id.value.trim();
  const emailValue = email.value.trim();
  const contactValue = contact_no.value.trim();

  // Validation: Check if any field is empty
  if (!nameValue || !idValue || !emailValue || !contactValue) {
    alert("All fields are required. Please fill out the form completely.");
    return; // Stop further execution
  }

  // Create a new container for student data
  const main_right = document.createElement("div");
  main_right.id = "main-right";
  right_part.appendChild(main_right);

  // Student name
  let new_div = document.createElement("div");
  new_div.innerText = nameValue;
  main_right.appendChild(new_div);

  // Student ID
  new_div = document.createElement("div");
  new_div.innerText = idValue;
  main_right.appendChild(new_div);

  // Student email
  new_div = document.createElement("div");
  new_div.innerText = emailValue;
  main_right.appendChild(new_div);

  // Student contact
  let new_div_last = document.createElement("div");
  new_div_last.innerText = contactValue;
  main_right.appendChild(new_div_last);

  // Delete icon
  let delete_span = document.createElement("span");
  delete_span.classList.add("delete_icon");
  delete_span.innerHTML = `<i class="ri-delete-bin-5-line"></i>`;
  new_div_last.appendChild(delete_span);

  // Reset button
  let reset_btn = document.createElement("span");
  reset_btn.classList.add("reset_btn");
  reset_btn.innerText = "Reset";
  new_div_last.insertBefore(reset_btn, delete_span);

  // Add event listener for reset button
  reset_btn.addEventListener("click", function () {
    new_div_last.firstChild.nodeValue = "";
  });

  // Add event listener for delete button
  delete_span.addEventListener("click", function () {
    let full_row = this.closest("#main-right");
    if (full_row) {
      full_row.remove();
      saveToLocalStorage(); // Save updated data to local storage
    } else {
      console.log("Parent div not found!");
    }
  });

  // Save data to local storage
  saveToLocalStorage();
}

// Here's the function for storing the data locally
function saveToLocalStorage() {
  const data = [];
  document.querySelectorAll("#main-right").forEach((row) => {
    const name = row.children[0].innerText;
    const id = row.children[1].innerText;
    const email = row.children[2].innerText;
    const contact = row.children[3].innerText;
    data.push({ name, id, email, contact });
  });
  localStorage.setItem("studentData", JSON.stringify(data));
}

function loadSavedData() {
  // Retrieve saved data from local storage and parse it into an array
  const savedData = JSON.parse(localStorage.getItem("studentData")) || [];

  // Iterate over each student record in the saved data array
  savedData.forEach(({ name, id, email, contact }) => {
    // Create a new container for the student data row
    const main_right = document.createElement("div");
    main_right.id = "main-right";
    right_part.appendChild(main_right);

    // Create a div for the student name and append it to the row
    let new_div = document.createElement("div");
    new_div.innerText = name;
    main_right.appendChild(new_div);

    // Create a div for the student ID and append it to the row
    new_div = document.createElement("div");
    new_div.innerText = id;
    main_right.appendChild(new_div);

    // Create a div for the student email and append it to the row
    new_div = document.createElement("div");
    new_div.innerText = email;
    main_right.appendChild(new_div);

    // Create a div for the student contact and append it to the row
    let new_div_last = document.createElement("div");
    new_div_last.innerText = contact;
    main_right.appendChild(new_div_last);

    // Create a delete icon and append it to the contact div
    let delete_span = document.createElement("span");
    delete_span.classList.add("delete_icon");
    delete_span.innerHTML = `<i class="ri-delete-bin-5-line"></i>`;
    new_div_last.appendChild(delete_span);

    // Create a reset button (currently empty) and append it before the delete icon
    let reset_btn = document.createElement("span");
    reset_btn.classList.add("reset_btn");
    reset_btn.innerText = "";
    new_div_last.insertBefore(reset_btn, delete_span);

    // Add an event listener to the reset button to clear the contact field
    reset_btn.addEventListener("click", function () {
      new_div_last.firstChild.nodeValue = "";
    });

    // Add an event listener to the delete icon to remove the entire row
    delete_span.addEventListener("click", function () {
      let full_row = this.closest("#main-right");
      if (full_row) {
        full_row.remove();
        saveToLocalStorage(); // Update local storage after deletion
      } else {
        console.log("Parent div not found!");
      }
    });
  });
}
