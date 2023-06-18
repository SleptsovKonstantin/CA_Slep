import { useDispatch } from "react-redux";
import { addRecordAsync } from "../redux/store";
const numbersInput = /^[0-9]+$/;

const validateCVV = (cvv) => {
  return numbersInput.test(cvv);
};

const Expenses = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (validateCVV(event.target.value)) {
      event.target.setCustomValidity("");
    } else {
      alert("Для ввода доступны только цифры");
      event.target.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.item.value && event.target.sum.value) {
      const newItem = {
        id: Date.now(),
        item: event.target.item.value,
        sum: -event.target.sum.value,
      };
      dispatch(addRecordAsync(newItem));
    }

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Расходы</h1>
      <input type="text" name="item" placeholder="Статья расхода" required />
      <input
        type="text"
        name="sum"
        placeholder="Сумма"
        onChange={handleChange}
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default Expenses;
