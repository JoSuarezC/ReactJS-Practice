import { useEffect, useRef, useState } from 'react';

const Form = ({ onSubmit, children }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const shouldFocusFormControl = isFormSubmitted === true;
  const formRef = useRef();

  useEffect(() => {
    const focusableElements = ['input', 'select', 'textarea'];
    const invalidElement = formRef.current.querySelector('.invalid');
    const firstFocusableEl =
      invalidElement &&
      invalidElement.querySelector(focusableElements.toString());
    firstFocusableEl && setTimeout(() => firstFocusableEl.focus(), 500);
    setIsFormSubmitted(false);
  }, [shouldFocusFormControl]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(event);
    setIsFormSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {children}
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
