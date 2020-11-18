// TODO - add ability to sort by name

const contacts = contactsList;
const contactSubmit = document.getElementById('submit');

class Contact {
  constructor(name, mobile, email) {
    this.name = name;
    this.mobile = mobile;
    this.email = email;
  }
}

contactSubmit.addEventListener('click', function (e) {
  const name = document.getElementById('name');
  const mobile = document.getElementById('mobile');
  const email = document.getElementById('email');
  const errorAlert = document.getElementById('errorAlert');
  const inputCheck = _checkIfInputsAreValid(name.value, mobile.value, email.value);

  e.preventDefault();

  if (inputCheck.isValid) {
    contacts.push(new Contact(name.value, mobile.value, email.value));
    _displayContacts(contacts);
    _resetForm(name, mobile, email);
    errorAlert.style.opacity = 0;
    errorAlert.innerHTML = '';
  } else {
    errorAlert.style.opacity = 100;
    errorAlert.innerHTML = inputCheck.error;
  }
});

// Check to see if inputs are valid
const _checkIfInputsAreValid = (name, mobile, email) => {
  let validation = {
    isValid: false,
    error: '',
  };

  // If inputs are empty return error
  if (name === '' || mobile === '' || email === '') {
    validation.error = 'All fields are required.';
    return validation;
  }

  const nameRegex = new RegExp('^[a-zA-Z ]*$');
  const mobileRegex = new RegExp('^[0-9]*$');
  const validName = nameRegex.test(name) && name.length <= 20;
  const validMobile = mobileRegex.test(mobile) && mobile.length === 10;
  const validEmail = _validateEmail(email) && email.length <= 40;

  // If name fails validation
  if (!validName) {
    validation.error += 'Invalid name.';
    return validation;
  }

  // If mobile number fails validation
  if (!validMobile) {
    validation.error += 'Invalid mobile number.';
    return validation;
  }

  // If email fails validation
  if (!validEmail) {
    validation.error += 'Invalid email.';
    return validation;
  }

  validation.isValid = true;
  return validation;
};

// Display the contacts within the table
const _displayContacts = (contacts) => {
  const tableBody = document.querySelector('#contactsTable tbody');
  let formData = '';
  // for each contact object in the contacts array
  for (let contact of contacts) {
    // push a row to the table body
    formData += `<tr>
      <td>${contact.name}</td>
      <td>${contact.mobile}</td>
      <td>${contact.email}</td> 
      </tr>`;
  }
  tableBody.innerHTML = formData;
};

// Reset input fields in the submission form
const _resetForm = (name, mobile, email) => {
  name.value = '';
  mobile.value = '';
  email.value = '';
};

// Validate email against regex
const _validateEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}
