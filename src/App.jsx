import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import AccountList from './components/AccountList';
import { CATEGORY_VALUES } from './constants/categories';
import { PAY_TYPE_VALUES } from './constants/pay-type';

let uniqueId = 0;

const getUniqueId = () => {
  uniqueId += 1;
  return uniqueId;
};

function App() {
  const INITIAL_ACCOUNT_LIST = [
    {
      id: getUniqueId(),
      date: new Date('2024-03-1').toLocaleString(),
      income: true,
      amount: 9500,
      category: CATEGORY_VALUES.SALARY,
      payType: '',
    },
    {
      id: getUniqueId(),
      date: new Date('2024-03-5').toLocaleString(),
      income: false,
      amount: 100,
      category: CATEGORY_VALUES.FOOD,
      payType: PAY_TYPE_VALUES.CASH,
    },
    {
      id: getUniqueId(),
      date: new Date('2024-03-7').toLocaleString(),
      income: false,
      amount: 1500,
      category: CATEGORY_VALUES.REWARD,
      payType: PAY_TYPE_VALUES.CREDIT_CARD,
    },
    {
      id: getUniqueId(),
      date: new Date('2024-03-12').toLocaleString(),
      income: false,
      amount: 300,
      category: CATEGORY_VALUES.F2P,
      payType: PAY_TYPE_VALUES.CREDIT_CARD,
    },
  ];
  const [accountList, setAccountList] = useState(INITIAL_ACCOUNT_LIST);
  console.log(`✨ ~ accountList:`, accountList);

  const isStyle = true;
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={isStyle ? { background: 'red' } : { background: 'blue' }}>Vite + React</h1>
      <hr />

      <AccountList accountList={accountList}></AccountList>
    </>
  );
}

export default App;
