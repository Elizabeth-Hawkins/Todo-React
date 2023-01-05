import React, { useState } from "react";
import { format } from "date-fns";
import axiosInstance from "../../../utils/axiosInstance.js";
import del from "../../icon/delete.svg";
import "../../style/HomePage.css";

const Todo = ({ index, todo, date, changeTodos, disabledCheckbox, setDisabledCheckbox }) => {

  const removeTodo = async (id) => {
    try {
      const { data, status } = await axiosInstance.delete(
        `/todo/${id}/?date=${format(date, "Y-M-d")}`
      );
      changeTodos(data, status);
    } catch (err) {
      console.log(err);
    }
  };
  const changeActive = async (id) => {
    setDisabledCheckbox(true);
    try {
      const { data, status } = await axiosInstance.patch(
        `/todo/${id}/?date=${format(date, "Y-M-d")}`
      );
      changeTodos(data, status);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(()=>{
        setDisabledCheckbox(false);
      }, 800)
    }
  };
  return (
    <div
      className={todo.checked ? "todo active" : "todo"}
    >
      <div className="todo_num">
        <div className="num">{index + 1}</div>
        <div className="line"></div>
        <div className="todo_text">{todo.title}</div>
      </div>

      <div className="buts">
        <div className="line"></div>
        <input
          className="todo_checked"
          type="checkbox"
          checked={todo.checked}
          disabled={disabledCheckbox}
          onChange={() => changeActive(todo.id)}
        />
        <img
          className="todo_delete"
          src={del}
          onClick={() => removeTodo(todo.id)}
          alt=""
        />
      </div>
    </div>
  );
};

export default Todo;
