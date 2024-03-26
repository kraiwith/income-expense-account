import { useState } from 'react';
import { getDate } from '../utils/get-date';
import { PAY_TYPES } from '../constants/pay-type';
import { CATEGORIES } from '../constants/categories';

function AccountItem(props) {
  console.log(`✨ AccountItem ~ props:`, props);
  const showDate = getDate(props.date);
  const showAmount = Intl.NumberFormat('th', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    props.amount
  );

  const [editing, setEditing] = useState(false);

  const onClickEditHandler = () => {
    setEditing(true);
    setDate(props.date);
    setIncome(props.income);
    setAmount(props.amount);
    setCategory(props.category);
    setPayType(props.payType);
  };

  const onCancelEditHandler = () => {
    setEditing(false);
  };

  const onSubmitEdit = () => {
    const editAccount = { date, income, amount, category, payType };
    props.onEditAccount(props.id, editAccount);
    onCancelEditHandler();
  };

  const [date, setDate] = useState('');
  const [income, setIncome] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [payType, setPayType] = useState('');

  return (
    <tr key={props.id}>
      {editing ? (
        <>
          <td>
            <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
          </td>
          <td>
            <div className="form-check form-check-inline">
              <input
                id={'income-true-' + props.id}
                type="radio"
                className="form-check-input"
                value={true}
                checked={income ? true : false}
                onChange={() => setIncome(true)}
              />
              <label htmlFor={'income-true-' + props.id}>รายรับ</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                id={'income-false-' + props.id}
                type="radio"
                className="form-check-input"
                value={false}
                checked={income ? false : true}
                onChange={() => setIncome(false)}
              />
              <label htmlFor={'income-false-' + props.id}>รายจ่าย</label>
            </div>
          </td>
          <td>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </td>
          <td>
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value=""></option>
              {CATEGORIES.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </td>
          <td>
            <select className="form-select" value={payType} onChange={(e) => setPayType(e.target.value)}>
              <option value=""></option>
              {PAY_TYPES.map((payType) => (
                <option key={payType} value={payType}>
                  {payType}
                </option>
              ))}
            </select>
          </td>
          <td>
            <button type="button" className="btn btn-primary m-1" onClick={() => onSubmitEdit()}>
              บันทึกแก้ไข
            </button>
            <button type="button" className="btn btn-secondary m-1" onClick={() => onCancelEditHandler()}>
              ยกเลิกแก้ไข
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="text-center">{showDate}</td>
          <td className="text-center">
            {props.income ? <span className="text-success">รายรับ</span> : <span className="text-danger">รายจ่าย</span>}
          </td>
          <td className="text-end">{showAmount}</td>
          <td>{props.category}</td>
          <td>{props.payType}</td>
          <td>
            <button type="button" className="btn btn-warning m-1" onClick={() => onClickEditHandler()}>
              แก้ไข
            </button>
            <button type="button" className="btn btn-danger m-1" onClick={() => props.onDeleteAtAccount(props.id)}>
              ลบ
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

export default AccountItem;
