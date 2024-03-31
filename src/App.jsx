import { useEffect, useReducer, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import AccountList from './components/AccountList';
import { CATEGORY_VALUES } from './constants/categories';
import { PAY_TYPE_VALUES } from './constants/pay-types';
import AddAccount from './components/AddAccount';
import { AccountContext } from './contexts/account-context';

let uniqueId = 0;

const getUniqueId = () => {
  uniqueId += 1;
  return uniqueId;
};

const INITIAL_ACCOUNT_LIST = [
  {
    id: getUniqueId(),
    date: '2024-03-01',
    income: true,
    amount: 9500,
    category: CATEGORY_VALUES.SALARY,
    payType: '',
  },
  {
    id: getUniqueId(),
    date: '2024-03-05',
    income: false,
    amount: 100,
    category: CATEGORY_VALUES.FOOD,
    payType: PAY_TYPE_VALUES.CASH,
  },
  {
    id: getUniqueId(),
    date: '2024-03-07',
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

function reducer(state, action) {
  if (action.type === 'add_account') {
    return [...state, { id: getUniqueId(), ...action.newAccount }];
  } else if (action.type === 'delete_account') {
    const filtereds = state.filter((item) => item.id !== action.deleteId);
    return [...filtereds];
  } else if (action.type === 'edit_account') {
    const findIndex = state.findIndex((acc) => acc.id === action.editId);
    state[findIndex] = { ...action.editAccount };
    return [...state];
  }
}

function App() {
  const getInitialAccountList = () => () => {
    const account_list = JSON.parse(localStorage.getItem('account_list'));
    if (account_list) {
      // run uniqid to fix refresh uniqid clear and key id duplicate
      account_list.forEach(() => getUniqueId());
      return account_list;
    }
    return INITIAL_ACCOUNT_LIST;
  };
  const [accountList, accountListDispatch] = useReducer(reducer, {}, getInitialAccountList());
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    localStorage.setItem('account_list', JSON.stringify(accountList));
  }, [accountList]);

  const cancelAddAccount = () => {
    setIsShow(false);
  };

  const addAccount = (newAccountData) => {
    accountListDispatch({
      type: 'add_account',
      newAccount: newAccountData,
    });
    cancelAddAccount();
  };

  const deleteAccount = (id) => {
    const conf = confirm('ยืนยันการลบข้อมูล!');
    if (!conf) {
      return;
    }

    accountListDispatch({
      type: 'delete_account',
      deleteId: id,
    });
  };

  const editAccount = (id, account) => {
    accountListDispatch({
      type: 'edit_account',
      editId: id,
      editAccount: account,
    });
  };

  return (
    <>
      <AccountContext.Provider
        value={{
          addAccount: addAccount,
          deleteAccountAt: deleteAccount,
          editAccountAt: editAccount,
          cancelAddAccount: cancelAddAccount,
        }}
      >
        <div className="container-fluid py-5">
          <AccountList accountList={accountList}></AccountList>

          {isShow ? (
            <AddAccount />
          ) : (
            <div className="mb-3">
              <button type="button" className="btn btn-success" onClick={() => setIsShow(true)}>
                สร้างรายการใหม่
              </button>
            </div>
          )}
        </div>
      </AccountContext.Provider>
    </>
  );
}

export default App;
