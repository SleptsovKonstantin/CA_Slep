import { FC, useState } from "react";
import { addRecordAsync } from "../redux/store";
import { useAppDispatch } from "../hooks/useTypedSelectorAndDispatch";

const numbersInput = /^[0-9]+$/;

const validateCVV = (cvv: string): boolean => {
  return numbersInput.test(cvv);
};

const Income: FC = () => {
  const dispatch = useAppDispatch();

  const [textItem, setTextItem] = useState<string>("");
  const [sumItem, setSumItem] = useState<string>("");

  const handleChangeSum = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateCVV(event.target.value.trim())) {
      setSumItem(event.target.value.trim());
    } else {
      alert("Для ввода доступны только цифры");
      event.target.value = "";
    }
  };
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextItem(event.target.value.trim());
  };

  const handleSubmit = () => {
    if (textItem && sumItem) {
      const newItem = {
        id: Date.now(),
        item: textItem,
        sum: Number(sumItem),
      };

      dispatch(addRecordAsync(newItem));
      setTextItem("");
      setSumItem("");
    }
  };

  return (
    <div>
      <h1>Доходы</h1>
      <input
        type="text"
        placeholder="Статья дохода"
        onChange={handleChangeText}
        required
      />
      <input
        type="text"
        placeholder="Сумма"
        onChange={handleChangeSum}
        required
      />
      <button type="submit" onClick={() => handleSubmit()}>
        Добавить
      </button>
    </div>
  );
};

export default Income;
