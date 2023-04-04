import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecordsAsync,
  updateRecordAsync,
  deleteRecordAsync,
} from "../redux/store";

const List = () => {
  const currentRecords = useSelector((state) => state.records);
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState("");
  const [editingTodoSum, setEditingTodoSum] = useState("");
  const [currentSum, setCurrentSum] = useState(0);

  const handleRemove = (itemId) => {
    dispatch(deleteRecordAsync(itemId));
  };

  const handleUpdate = (id, text, sum) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
    setEditingTodoSum(sum);
  };

  const handleInputChangeText = (event) => {
    setEditingTodoText(event.target.value);
  };

  const handleInputChangeSum = (event) => {
    setEditingTodoSum(event.target.value);
  };

  const handleSaveClick = (itemID) => {
    dispatch(updateRecordAsync(itemID, editingTodoText));
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoSum("");
  };

  const handleCancelClick = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoSum("");
  };

  useEffect(() => {
    dispatch(fetchRecordsAsync());
  }, [dispatch]);

  useEffect(() => {
    let sum = 0;
    currentRecords.forEach((element) => {
      sum += element.sum;
    });

    setCurrentSum(sum);
  }, [currentRecords]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>ОБЩАЯ СУММА: {currentSum}</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {currentRecords.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "600px",
            }}
          >
            {item.id === editingTodoId ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={handleInputChangeText}
                  style={{ width: "30%" }}
                />
                <input
                  type="text"
                  value={editingTodoSum}
                  onChange={handleInputChangeSum}
                  style={{ width: "30%" }}
                />
                <div style={{ width: "40%" }}>
                  <button onClick={() => handleSaveClick(item.id)}>
                    Сохарнить
                  </button>
                  <button onClick={handleCancelClick}>Отменить</button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {item.item} {":"} {item.sum}
                </div>
                <div style={{ width: "40%" }}>
                  <button
                    onClick={() => handleUpdate(item.id, item.item, item.sum)}
                  >
                    Изменить
                  </button>
                  <button onClick={() => handleRemove(item.id)}>Удалить</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
