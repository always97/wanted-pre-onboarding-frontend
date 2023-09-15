import React, { useEffect, useState } from "react";
import styles from "./TodoMain.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  addTodoAPI,
  deleteTodoAPI,
  getTodosAPI,
  updateTodoAPI,
} from "../apis/apis";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";

const TodoMain = () => {
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("wanted_accessToken");

  const onAddTodo = (newTodoText) => {
    console.log(newTodoText, "<< 받았음 ");
    addTodoAPI(access_token, newTodoText)
      .then((res) => {
        setTodoList([...todoList, res.data]);
      })
      .catch((error) => {
        console.log("todo 추가 에러", error);
      });
  };

  const onDeleteTodo = (todoId) => {
    deleteTodoAPI(access_token, todoId)
      .then((res) => {
        setTodoList(todoList.filter((item) => item.id !== todoId));
      })
      .catch((error) => {
        console.error("todo 삭제 에러:", error);
      });
  };

  const onUpdateTodo = (updatedTodo) => {
    updateTodoAPI(
      access_token,
      updatedTodo.id,
      updatedTodo.text,
      updatedTodo.isCompleted
    );
  };

  useEffect(() => {
    if (!access_token) {
      // 로그인되지않은 상태라면 /signin으로 리다이렉트
      navigate("/signin");
    }

    getTodosAPI(access_token)
      .then((rsp) => {
        setTodoList(rsp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.main}>
      <Link to="/">홈으로 이동하기</Link>
      <AddTodo onAddTodo={onAddTodo} />
      <div className={styles.todoBox}>
        {todoList.map((item) => (
          <Todo
            key={item.id}
            todoId={item.id}
            text={item.todo}
            isCompleted={item.isCompleted}
            userId={item.userId}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
        {todoList.length === 0 && (
          <div>
            <p>표시할 todo목록이 없습니다</p>
            <p>새로운 todo를 추가해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoMain;
