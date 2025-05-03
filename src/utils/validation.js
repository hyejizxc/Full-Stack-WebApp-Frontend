// src/utils/validation.js
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateInput = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value) ? '' : 'Please enter a valid email';
      case 'password':
        return validatePassword(value) ? '' : 'Password must be at least 6 characters';
      case 'name':
        return value.trim() ? '' : 'Name is required';
      default:
        return '';
    }
  };
