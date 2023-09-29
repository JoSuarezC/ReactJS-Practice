import useInput from "../hooks/use-input";
import Form from "./UI/Form/Form";
import Input from "./UI/Input/Input";

const validators = {
  isEmpty: (val) => val && val.trim() !== '',
  isEmail: (val) => val && val.includes('@'),
};

const BasicForm = (props) => {
  const {
    enteredValue: firstNameValue,
    isValid: isFirstNameValid,
    hasError: firstNameHasError,
    valueChangeHandler: onFirstNameChange,
    inputBlurHandler: onFirstNameBlur,
    reset: firstNameReset,
  } = useInput(val => validators.isEmpty(val));
  const {
    enteredValue: lastNameValue,
    isValid: isLastNameValid,
    hasError: lastNameHasError,
    valueChangeHandler: onLastNameChange,
    inputBlurHandler: onLastNameBlur,
    reset: lastNameReset,
  } = useInput(val => validators.isEmpty(val));
  const {
    enteredValue: emailValue,
    isValid: isEmailValid,
    hasError: emailHasError,
    valueChangeHandler: onEmailChange,
    inputBlurHandler: onEmailBlur,
    reset: emailReset,
  } = useInput(val => validators.isEmpty(val) && validators.isEmail(val));

  function onSubmit() {
    console.log(firstNameValue, lastNameValue, emailValue);

    if (!isFirstNameValid || !isEmailValid || !isLastNameValid) {
      onFirstNameBlur();
      onLastNameBlur();
      onEmailBlur();
      return;
    }

    firstNameReset();
    lastNameReset();
    emailReset();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        id='firstname'
        hasError={firstNameHasError}
        onChange={onFirstNameChange}
        onBlur={onFirstNameBlur}
        label='First name'
        errorMsg='Error: Please enter your first name'
      />
      <Input
        id='lastname'
        hasError={lastNameHasError}
        onChange={onLastNameChange}
        onBlur={onLastNameBlur}
        label='Last name'
        errorMsg='Error: Please enter your last name'
      />
      <Input
        id='email'
        hasError={emailHasError}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
        label='Email'
        errorMsg='Error: Please enter your email'
      />
    </Form>
  );
};

export default BasicForm;
