## Form Validator

Simple client side form validation.

## Project Specifications

- Create form UI
- Show error messages under specific inputs
- checkRequired() to accept array of inputs
- checkLength() to check min and max length
- checkEmail() to validate email with regex
- checkPasswordsMatch() to match confirm password

## Edited by me

- Removed checkRequired() function
- User can't use space at all now. Removed trim() usage.
- Confirm password error message has been removed because it was looking bad ui wise.
- getFieldName() function is implemented different.
- Validation check before submitting is implemented in case the project is used to send data to actual backend.