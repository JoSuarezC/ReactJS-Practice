import useInput from '../hooks/use-input';
import Input from './UI/Input/Input';
import Form from './UI/Form/Form';

const SimpleInput = (props) => {
  const {
    enteredValue: nameValue,
    isValid: isNameValid,
    hasError: nameHasError,
    valueChangeHandler: onNameChange,
    inputBlurHandler: onNameBlur,
    reset: resetName,
  } = useInput((val) => (val && val.trim() !== '') ?? false);
  const {
    enteredValue: emailValue,
    isValid: isEmailValid,
    hasError: emailHasError,
    valueChangeHandler: onEmailChange,
    inputBlurHandler: onEmailBlur,
    reset: resetEmail,
  } = useInput(
    (val) => (val && val.trim() !== '' && val.includes('@')) ?? false
  );

  function onSubmit(event) {
    console.log(emailValue, nameValue);

    if (!isNameValid || !isEmailValid) {
      onEmailBlur();
      onNameBlur();
      return;
    }

    resetName();
    resetEmail();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input
        id='name'
        hasError={nameHasError}
        onChange={onNameChange}
        onBlur={onNameBlur}
        label='Your name'
        errorMsg='Error: Please enter your name'
      />
      <Input
        id='email'
        hasError={emailHasError}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
        label='Your email'
        errorMsg='Error: Please enter your email'
      />
    </Form>
  );
};

export default SimpleInput;
