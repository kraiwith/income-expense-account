import { getDate } from '../utils/get-date';

function AccountItem(props) {
  const item = props.accountItem;
  const date = getDate(item.date);
  const amount = Intl.NumberFormat('th', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.amount);
  return (
    <tr key={item.id}>
      <td>{date}</td>
      <td>
        {item.income ? <span className="text-success">รายรับ</span> : <span className="text-danger">รายจ่าย</span>}
      </td>
      <td className="text-end">{amount}</td>
      <td>{item.payType}</td>
      <td>
        <button type="button" className="btn btn-warning m-1" onClick={() => props.onClickEdit}>
          แก้ไข
        </button>
        <button type="button" className="btn btn-danger m-1">
          ลบ
        </button>
      </td>
    </tr>
  );
}

export default AccountItem;
