import { useState } from 'react';
import AccountItem from './AccountItem';

function AccountList(props) {
  const accountList = props.accountList;

  const [editing, setEditing] = useState(0);

  const onClickEditHandler = (e) => {
    console.log(`✨ onClickEditHandler ~ e:`, e);
  };

  return (
    <div className="">
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th>วันที่</th>
              <th>รายรับ-รายจ่าย</th>
              <th>จำนวน</th>
              <th>ช่องทางการจ่าย</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {accountList.map((item) => (
              <AccountItem key={item.id} accountItem={item} onClickEdit={() => onClickEditHandler(item)}></AccountItem>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
