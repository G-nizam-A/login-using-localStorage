// Function to get user data from localStorage
function getUsersFromLocalStorage() {
  const storedUsers = localStorage.getItem("users");
  return storedUsers ? JSON.parse(storedUsers) : [];
}

// Function to save user data to localStorage
function saveUsersToLocalStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Array to store registered users
let users = getUsersFromLocalStorage();
console.log(users);
// Function to register a new user
function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Validate password match
  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  // Validate unique email
  if (isEmailUnique(email)) {
    alert("Email is already registered. Please use a different email.");
    return;
  }

  // Validate unique phone number
  if (isPhoneNumberUnique(phoneNumber)) {
    alert("Phone number is already registered. Please use a different number.");
    return;
  }

  // Create a new user object
  const newUser = {
    id: generateUniqueId(),
    username,
    email,
    password,
    phoneNumber,
  };

  // Add the new user to the array
  users.push(newUser);
  console.log(users);
  saveUsersToLocalStorage(users);
  // Display success message (you can modify this as needed)
  alert("Registration successful!");

  // Clear the form
  document.getElementById("registrationForm").reset();
  window.location.href = "login.html";
}

// Function to check if the email is unique
function isEmailUnique(email) {
  return users.some((user) => user.email === email);
}

// Function to check if the phone number is unique
function isPhoneNumberUnique(phoneNumber) {
  return users.some((user) => user.phoneNumber === phoneNumber);
}

// Function to generate a unique ID (simple increment for demonstration purposes)
function generateUniqueId() {
  return users.length + 1;
}

///login page
function login() {
  console.log(users);
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  // Check if there is a user with the provided email
  const user = users.find((user) => user.email === loginEmail);

  // If no user found or password is incorrect, show an alert
  if (!user || user.password !== loginPassword) {
    alert("Invalid email or password. Please try again.");
    return;
  }
  // If login is successful, store user information in sessionStorage
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  // If login is successful, redirect to another page (e.g., welcome.html)
  window.location.href = "welcome.html";
}
