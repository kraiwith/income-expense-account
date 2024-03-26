import { useState } from 'react';
import { PAY_TYPES } from '../constants/pay-type';
import { CATEGORIES } from '../constants/categories';

function AddAccount(props) {
  const [date, setDate] = useState('');
  const [income, setIncome] = useState(true);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [payType, setPayType] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    props.onAddNewAccount({ date, income, amount, category, payType });
    resetValue();
  };

  const onClickBtnCancel = () => {
    props.onClickCancel();
    resetValue();
  };

  const resetValue = () => {
    setDate('');
    setIncome(true);
    setAmount(0);
    setPayType('');
  };

  const onIncomeChangeHandler = (e) => {
    setIncome(e);
  };

  return (
    <div className="">
      <form onSubmit={onSubmitHandler}>
        <hr />
        <h5 className="">สร้างรายการใหม่</h5>
        <div className="row">
          <div className="col-auto mb-3">
            <label htmlFor=""> วันที่ </label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="col-auto mb-3">
            <label htmlFor="">รายการ</label>
            <div className="">
              <div className="form-check form-check-inline">
                <input
                  id="add-icome-true"
                  type="radio"
                  className="form-check-input"
                  name="income"
                  checked={income ? true : false}
                  value={true}
                  onChange={() => onIncomeChangeHandler(true)}
                />
                <label htmlFor="add-icome-true" className="form-check-label">
                  รายรับ
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  id="add-income-false"
                  type="radio"
                  className="form-check-input"
                  name="income"
                  checked={income ? false : true}
                  value={false}
                  onChange={() => onIncomeChangeHandler(false)}
                />
                <label htmlFor="add-income-false" className="form-check-label">
                  รายจ่าย
                </label>
              </div>
            </div>
          </div>
          <div className="col-auto mb-3">
            <label htmlFor="">จำนวน</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min={0}
            />
          </div>
          <div className="col-auto mb-3 ">
            <label htmlFor="">หมวดหมู่</label>
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value=""></option>
              {CATEGORIES.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto mb-3 ">
            <label htmlFor="">ช่องทางการจ่าย</label>
            <select className="form-select" value={payType} onChange={(e) => setPayType(e.target.value)}>
              <option value=""></option>
              {PAY_TYPES.map((payType) => (
                <option key={payType} value={payType}>
                  {payType}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto mb-3 align-self-end">
            <button type="submit" className="btn btn-outline-primary m-1">
              สร้างข้อมูล
            </button>
            <button type="button" className="btn btn-outline-secondary m-1" onClick={onClickBtnCancel}>
              ยกเลิก
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAccount;
