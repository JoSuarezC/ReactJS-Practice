import React from 'react';
import classes from './InvestmentTable.module.css';

const HEADERS = [
  'Year',
  'Total Savings',
  'Interest (Year)',
  'Total Interest',
  'Invested Capital',
];

export const InvestmentTable = ({ results }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <table className={classes.result}>
      <thead>
        <tr>
          {HEADERS.map((header) => (
            <th> {header} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map((cells) => (
          <tr>
            <td>{formatter.format(cells.year)}</td>
            <td>{formatter.format(cells.savingsEndOfYear)}</td>
            <td>{formatter.format(cells.yearlyInterest)}</td>
            <td>{formatter.format(cells.totalInterest)}</td>
            <td>{formatter.format(cells.totalInvestedCapital)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
