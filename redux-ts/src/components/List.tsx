import { useState, useEffect, FC } from "react";
import {
  fetchRecordsAsync,
  updateRecordAsync,
  deleteRecordAsync,
  RecordsType,
} from "../redux/store";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/useTypedSelectorAndDispatch";

const List: FC = () => {
  const dispatch = useAppDispatch();
  const currentRecords: RecordsType[] = useAppSelector(
    (state) => state.records
  );

  const [editingTodoId, setEditingTodoId] = useState<null | number>(null);
  const [editingTodoText, setEditingTodoText] = useState<string>("");
  const [editingTodoSum, setEditingTodoSum] = useState<number>(0);
  const [currentSum, setCurrentSum] = useState<number>(0);

  const handleRemove = (itemId: number): void => {
    dispatch(deleteRecordAsync(itemId));
  };

  const handleUpdate = (id: number, text: string, sum: number) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
    setEditingTodoSum(sum);
  };

  const handleInputChangeText = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEditingTodoText(event.target.value);
  };

  const handleInputChangeSum = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEditingTodoSum(Number(event.target.value));
  };

  const handleSaveClick = (itemID: number): void => {
    dispatch(updateRecordAsync(itemID, editingTodoText));
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoSum(0);
  };

  const handleCancelClick = () => {
    setEditingTodoId(null);
    setEditingTodoText("");
    setEditingTodoSum(0);
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
