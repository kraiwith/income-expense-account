import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import AccountList from './components/AccountList';
import { CATEGORY_VALUES } from './constants/categories';
import { PAY_TYPE_VALUES } from './constants/pay-type';
import AddAccount from './components/AddAccount';

let uniqueId = 0;

const getUniqueId = () => {
  uniqueId += 1;
  return uniqueId;
};

function App() {
  const INITIAL_ACCOUNT_LIST = [
    {
      id: getUniqueId(),
      date: '2024-03-1',
      income: true,
      amount: 9500,
      category: CATEGORY_VALUES.SALARY,
      payType: '',
    },
    {
      id: getUniqueId(),
      date: '2024-03-5',
      income: false,
      amount: 100,
      category: CATEGORY_VALUES.FOOD,
      payType: PAY_TYPE_VALUES.CASH,
    },
    {
      id: getUniqueId(),
      date: '2024-03-7',
      income: false,
      amount: 1500,
      category: CATEGORY_VALUES.REWARD,
      payType: PAY_TYPE_VALUES.CREDIT_CARD,
    },
    {
      id: getUniqueId(),
      date: '2024-03-12',
      income: false,
      amount: 300,
      category: CATEGORY_VALUES.F2P,
      payType: PAY_TYPE_VALUES.CREDIT_CARD,
    },
    {
      id: getUniqueId(),
      date: '2024-03-26',
      income: true,
      amount: 300,
      category: CATEGORY_VALUES.SALE_ONLINE,
      payType: '',
    },
  ];
  const [accountList, setAccountList] = useState(INITIAL_ACCOUNT_LIST);
  const [isShow, setIsShow] = useState(false);

  const addAccount = (newAccountData) => {
    const newAccount = {
      ...newAccountData,
      id: getUniqueId(),
    };
    setAccountList((accountList) => [...accountList, { ...newAccount }]);
    setIsShow(false);
  };

  const cancelAddAccount = () => {
    setIsShow(false);
  };

  const deleteAccount = (id) => {
    const conf = confirm('ยืนยันการลบข้อมูล');
    if (!conf) {
      return;
    }

    const filtereds = accountList.filter((item) => item.id !== id);
    setAccountList(filtereds);
  };

  const editAccount = (id, account) => {
    const findIndex = accountList.findIndex((acc) => acc.id === id);
    const newAccountList = [...accountList];
    newAccountList[findIndex] = { ...account, id };
    setAccountList(newAccountList);
  };

  return (
    <>
      <div className="container-fluid py-5">
        <AccountList
          accountList={accountList}
          onDeleteAtAccount={deleteAccount}
          onEditAccount={editAccount}
        ></AccountList>

        {isShow ? (
          <AddAccount onAddNewAccount={addAccount} onClickCancel={cancelAddAccount} />
        ) : (
          <div className="mb-3">
            <button type="button" className="btn btn-success" onClick={() => setIsShow(true)}>
              สร้างรายการใหม่
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
