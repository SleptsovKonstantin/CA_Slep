import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/store";



const List = () => {
  const [currentSum, setCurrentSum] = useState(0)
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  useEffect(() => {
    let sum = 0 

    items.forEach(element => {
      sum += element.sum
    });

    setCurrentSum(sum)
  }, [items]);

  return (
    <>
      <h1>ОБЩАЯ СУММА: {currentSum}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.item} ({item.sum}){" "}
            <button onClick={() => handleRemove(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
