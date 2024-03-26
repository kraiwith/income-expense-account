import { useState } from 'react';
import AccountItem from './AccountItem';
import { CATEGORIES } from '../constants/categories';
import { PAY_TYPES } from '../constants/pay-type';

function AccountList(props) {
  const getDateNumber = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}${newDate.getMonth() + 1}${newDate.getDate()}`;
  };

  const [filterIncome, setFilterIncome] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPayType, setFilterPayType] = useState('all');

  let clonedAccountList = [...props.accountList];
  if (filterIncome != 'all') {
    clonedAccountList = clonedAccountList.filter((acc) => `${acc.income}` == filterIncome);
  }
  if (filterCategory != 'all') {
    clonedAccountList = clonedAccountList.filter((acc) => acc.category == filterCategory);
  }
  if (filterPayType != 'all') {
    clonedAccountList = clonedAccountList.filter((acc) => acc.payType == filterPayType);
  }

  const sortedCloneAccountList = clonedAccountList.sort((a, b) => getDateNumber(a.date) - getDateNumber(b.date));

  return (
    <div className="">
      <div className="row g-3 mb-3">
        <div className="col-auto">
          <label htmlFor=""> รายการ </label>
          <select
            className="form-select"
            value={filterIncome}
            onChange={(e) => setFilterIncome(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="all">ทั้งหมด</option>
            <option value="true">รายรับ</option>
            <option value="false">รายจ่าย</option>
          </select>
        </div>
        <div className="col-auto">
          <label htmlFor=""> หมวดหมู่ </label>
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="all">ทั้งหมด</option>
            <option value=""></option>
            {CATEGORIES.map((cate) => (
              <option key={cate} value={cate}>
                {cate}
              </option>
            ))}
          </select>
        </div>
        <div className="col-auto">
          <label htmlFor=""> ช่องทางการจ่าย </label>
          <select
            className="form-select"
            value={filterPayType}
            onChange={(e) => setFilterPayType(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="all">ทั้งหมด</option>
            <option value=""></option>
            {PAY_TYPES.map((payType) => (
              <option key={payType} value={payType}>
                {payType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-nowrap">
          <thead>
            <tr>
              <th className="text-center">
                วันที่ <i className="fa-solid fa-chevron-down"></i>
              </th>
              <th className="text-center">รายการ</th>
              <th className="text-center">จำนวน</th>
              <th className="text-center">หมวดหมู่</th>
              <th className="text-center">ช่องทางการจ่าย</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedCloneAccountList.map((item) => (
              <AccountItem
                key={item.id}
                id={item.id}
                date={item.date}
                income={item.income}
                amount={item.amount}
                category={item.category}
                payType={item.payType}
                onEditAccount={props.onEditAccount}
                onDeleteAtAccount={props.onDeleteAtAccount}
              ></AccountItem>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
