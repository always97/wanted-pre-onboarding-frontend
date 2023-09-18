import React, { useState } from "react";
import styles from "./Todo.module.css";
import { Box, Button, Card, Checkbox, TextField } from "@mui/material";
const Todo = (props) => {
  const { todoId, text, isCompleted, userId, onDeleteTodo, onUpdateTodo } =
    props;

  const [todoInfo, setTodoInfo] = useState({
    id: todoId,
    text,
    isCompleted,
    userId,
  });
  const [curText, setCurText] = useState(text);
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleCheck = () => {
    const updatedTodo = {
      ...todoInfo,
      isCompleted: !todoInfo.isCompleted,
    };
    setTodoInfo(updatedTodo);
    onUpdateTodo(updatedTodo);
  };
  const handleText = (e) => {
    setCurText(e.target.value);
  };

  const handleUpdate = () => {
    const updatedTodoInfo = {
      ...todoInfo,
      text: curText,
    };
    setTodoInfo(updatedTodoInfo);
    onUpdateTodo(updatedTodoInfo);

    toggleEditMode();
  };

  const handleDelete = () => {
    onDeleteTodo(todoId);
  };

  const handleCancle = () => {
    setCurText(todoInfo.text);
    toggleEditMode();
  };

  const toggleEditMode = () => {
    setToggleEdit((prevState) => !prevState);
  };

  return (
    <li className={styles.todo}>
      {toggleEdit ? (
        <>
          <label>
            <Checkbox
              type="checkbox"
              checked={todoInfo.isCompleted}
              onChange={handleCheck}
            />
            <TextField
              variant="outlined"
              type="text"
              value={curText}
              onChange={handleText}
              data-testid="modify-input"
            />
          </label>
          <div className={styles.btnBox}>
            <Button
              variant="outlined"
              data-testid="submit-button"
              onClick={handleUpdate}
            >
              제출
            </Button>
            <Button
              variant="outlined"
              data-testid="cancel-button"
              onClick={handleCancle}
            >
              취소
            </Button>
          </div>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <Checkbox
              type="checkbox"
              checked={todoInfo.isCompleted}
              onChange={handleCheck}
            />
            <Card variant="outlined" sx={{ minWidth: 100 }}>
              {todoInfo.text}
            </Card>
          </Box>
          <div className={styles.btnBox}>
            <Button
              variant="outlined"
              data-testid="modify-button"
              onClick={toggleEditMode}
            >
              수정
            </Button>
            <Button
              variant="outlined"
              data-testid="delete-button"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default Todo;
