import { useState } from 'react';
import { InvestmentTable } from './components/InvestmentTable/InvestmentTable';
import { Header } from './components/UI/Header';
import { InvestmentForm } from './components/InvestmentForm/InvestmentForm';

function App() {
  const [yearlyData, setYearlyData] = useState([]);

  return (
    <>
      <Header />

      <InvestmentForm onSubmit={setYearlyData} />

      {yearlyData.length > 0 ? (
        <InvestmentTable results={yearlyData} />
      ) : (
        <p style={{ textAlign: 'center' }}>Introduce your investment data</p>
      )}
    </>
  );
}

export default App;
