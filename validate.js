
// validate.js - Homework 3 JavaScript File for Checkup and Chill Clinic

window.onload = function () {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById("dateDisplay").innerHTML = today.toLocaleDateString("en-US", options);
};

function setError(id, message) {
  const errorSpan = document.getElementById(id + "Error");
  errorSpan.textContent = message;
  errorSpan.style.display = "block";
}

function clearError(id) {
  const errorSpan = document.getElementById(id + "Error");
  errorSpan.textContent = "";
  errorSpan.style.display = "none";
}

function validateName(fieldId) {
  const name = document.getElementById(fieldId).value.trim();
  const valid = /^[A-Za-z\-' ]{1,30}$/.test(name);
  if (!valid) {
    setError(fieldId, "Invalid name. Use only letters, hyphens, apostrophes.");
    return false;
  }
  clearError(fieldId);
  return true;
}

function validateDOB() {
  const dob = document.getElementById("dob").value.trim();
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19\d{2}|20[0-2]\d)$/;
  const valid = dateRegex.test(dob);
  if (!valid) {
    setError("dob", "Enter date as MM/DD/YYYY, not in future, not over 120 years ago.");
    return false;
  }
  const enteredDate = new Date(dob);
  const today = new Date();
  const maxAge = new Date();
  maxAge.setFullYear(maxAge.getFullYear() - 120);
  if (enteredDate > today || enteredDate < maxAge) {
    setError("dob", "Invalid birthdate range.");
    return false;
  }
  clearError("dob");
  return true;
}

function validateSSN() {
  const ssn = document.getElementById("ssn").value;
  const valid = /^\d{3}-\d{2}-\d{4}$/.test(ssn);
  if (!valid) {
    setError("ssn", "SSN must be in the format XXX-XX-XXXX.");
    return false;
  }
  clearError("ssn");
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!valid) {
    setError("email", "Invalid email format.");
    return false;
  }
  clearError("email");
  return true;
}

function validateZip() {
  const zip = document.getElementById("zip").value.trim();
  const valid = /^\d{5}$/.test(zip);
  if (!valid) {
    setError("zip", "ZIP code must be 5 digits.");
    return false;
  }
  clearError("zip");
  return true;
}

function validatePhone() {
  const phone = document.getElementById("phone").value.trim();
  const valid = /^\d{3}-\d{3}-\d{4}$/.test(phone);
  if (!valid) {
    setError("phone", "Phone must be in format 123-456-7890");
    return false;
  }
  clearError("phone");
  return true;
}

function validateUserID() {
  const id = document.getElementById("userid").value;
  const valid = /^[A-Za-z_][A-Za-z0-9_-]{4,19}$/.test(id);
  if (!valid) {
    setError("userid", "User ID must be 5-20 chars, start with letter/underscore, no spaces.");
    return false;
  }
  clearError("userid");
  return true;
}

function validatePassword() {
  const id = document.getElementById("userid").value.toLowerCase();
  const pw = document.getElementById("pwd").value;
  const repw = document.getElementById("repwd").value;
  const valid = pw.length >= 8 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && pw !== id;

  if (!valid) {
    setError("pwd", "Password must be 8+ chars, include uppercase, lowercase, digit, and not match user ID.");
    return false;
  }
  if (pw !== repw) {
    setError("repwd", "Passwords do not match.");
    return false;
  }
  clearError("pwd");
  clearError("repwd");
  return true;
}

function validateAllFields() {
  let valid = true;
  valid &= validateName("fname");
  valid &= validateName("lname");
  valid &= validateDOB();
  valid &= validateSSN();
  valid &= validateEmail();
  valid &= validateZip();
  valid &= validatePhone();
  valid &= validateUserID();
  valid &= validatePassword();

  if (valid) {
    document.getElementById("submitBtn").disabled = false;
  } else {
    document.getElementById("submitBtn").disabled = true;
  }
}
