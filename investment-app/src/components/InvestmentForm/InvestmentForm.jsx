import React from 'react';
import { Input } from '../UI/Input';

export const InvestmentForm = ({
  onSubmit
}) => {
  const calculateHandler = (event) => {
    event.preventDefault();
    
    const target = event.target;
    const yearlyData = [];

    let currentSavings = +target['current-savings'].value;
    const yearlyContribution = +target['yearly-contribution'].value;
    const expectedReturn = +target['expected-return'].value / 100;
    const duration = +target['duration'].value;
    let totalInterest = 0;

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      totalInterest += yearlyInterest;
      const totalInvestedCapital = currentSavings - totalInterest;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
        totalInterest: totalInterest,
        totalInvestedCapital: totalInvestedCapital,
      });
    }

    onSubmit(yearlyData);
  };

  return (
    <form
      className='form'
      onSubmit={calculateHandler}
    >
      <div className='input-group'>
        <Input
          id='current-savings'
          type='number'
          label='Current Savings ($)'
        />
        <Input
          id='yearly-contribution'
          type='number'
          label='Yearly Savings ($)'
        />
      </div>
      <div className='input-group'>
        <Input
          id='expected-return'
          type='number'
          label='Expected Interest (%, per year)'
        />
        <Input
          id='duration'
          type='number'
          label='Investment Duration (years)'
        />
      </div>
      <p className='actions'>
        <button
          type='reset'
          className='buttonAlt'
          onClick={() => onSubmit([])}
        >
          Reset
        </button>
        <button
          type='submit'
          className='button'
        >
          Calculate
        </button>
      </p>
    </form>
  );
};
