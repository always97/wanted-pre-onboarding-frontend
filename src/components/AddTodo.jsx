import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./AddTodo.module.css";

const AddTodo = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState("");

  const handleText = (e) => {
    setTodoText(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    onAddTodo(todoText);
    setTodoText(""); // 입력창 리셋
  };

  return (
    <form className={styles.form} onSubmit={handleAdd}>
      <TextField
        variant="outlined"
        data-testid="new-todo-input"
        onChange={handleText}
        value={todoText}
      />
      <Button
        variant="outlined"
        type="submit"
        data-testid="new-todo-add-button"
      >
        추가
      </Button>
    </form>
  );
};

export default AddTodo;
