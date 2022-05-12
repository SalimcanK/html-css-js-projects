const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Prevent space usage
inputFields = [username, email, password, password2];

inputFields.forEach(input => {
  input.addEventListener('keypress', e => {
    if(e.keyCode === 32) {
      e.preventDefault();
    }
  })
})

// Show input error message
const showError = (input, message) => {

  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
const showSuccess = input => {

  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email validation
const validateEmail = (email) => {
  
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(email.value)) {
    showSuccess(email);
  } else {
    showError(email, 'Email is not valid');
  }
}

// Get fieldname
const getFieldName = input => {
  const label = input.parentElement.querySelector('label');
  return label.innerText;
}

// Check input length
const checkLength = (input, min, max) => {
  
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check password match
const checkPasswordMatch = (password1, password2) => {
  if(password1.value === '' || password2.value === '') {
    showError(password2, '');
  } else if(password1.value !== password2.value) {
    showError(password2, 'Passwords do not match');
  } else {
    showSuccess(password2);
  }
}

// Event listeners
form.addEventListener('submit', function(e) {

  e.preventDefault();

  const valid = [
  checkLength(username, 3, 15),
  checkLength(password, 6, 25),
  validateEmail(email),
  checkPasswordMatch(password, password2)
  ].every(check => check())

  if(valid) {
    console.log('Register success', {
      username: username.value,
      email: email.value,
      password: password.value
    })
  }
})