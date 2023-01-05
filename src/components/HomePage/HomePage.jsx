import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import Calendar from "./Calendar/Calendar";
import axiosInstance from "../../utils/axiosInstance";
import Popap from "../Popap/Popap";
import Todo from "./Todo/Todo";
import "../style/HomePage.css";
import "../style/adaptive.css";

const HomePage = () => {
  const USER = localStorage.getItem("user");
  const NOT_FOUND_TODOS = "No Todo :)";
  const REFRESH_TOKEN = "Relogin to your account.";
  const NO_LOGIN_USER = "Sign in to see your todo list.";
  const ERR = "Something went wrong";

  const [keyTodo, setKeyTodo] = useState("all");
  const [activePopap, setActivePopap] = useState(false);
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);
  const [todos, setTodos] = useState({ message: "Loading..." });
  const [date, setDate] = useState(new Date());

  const getTodos = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        `/todo/?date=${format(date, "Y-M-d")}`
      );
      changeTodos(data, status);
    } catch (err) {
      setTodos({ message: ERR });
    }
  };

  const changeTodos = (data, status) => {
    if (status === 200) {
      setTodos({
        all: data.todos,
        active: data.todos.filter((todo) => !todo.checked),
        complite: data.todos.filter((todo) => todo.checked),
      });
    }
    if (status === 209) {
      setTodos({ message: NOT_FOUND_TODOS });
    }
    if (status === 403) {
      setTodos({ message: REFRESH_TOKEN });
    }
    if (status === 500) {
      setTodos({ message: NO_LOGIN_USER });
    }
  };

  useEffect(() => {
    getTodos();
  }, [date]);

  useEffect(() => {
    {
      todos?.hasOwnProperty(keyTodo) &&
        todos[keyTodo].map((todo) => {
          console.log(todo);
        });
    }
  }, [todos]);

  return (
    <div className="main">
      <div className="content">
        <div className="calendar_buts">
          <div className="calendar_block">
            <Calendar date={date} setDate={setDate} />
          </div>
          {USER && (
            <div className="but_create">
              <button
                className="create_todo"
                onClick={() => setActivePopap(true)}
              >
                Create Todo
              </button>
            </div>
          )}
        </div>
        <div className="todos_block">
          {todos?.hasOwnProperty("message") ? (
            <div className="mes">{todos.message}</div>
          ) : (
            <>
              <div className="tabs">
                <button
                  className={
                    keyTodo === "all"
                      ? `tabs__btn tabs__${keyTodo}`
                      : "tabs__btn"
                  }
                  onClick={() => setKeyTodo("all")}
                >
                  All
                </button>
                <button
                  className={
                    keyTodo === "active"
                      ? `tabs__btn tabs__${keyTodo}`
                      : "tabs__btn"
                  }
                  onClick={() => setKeyTodo("active")}
                  >
                  Active
                  </button>
                <button
                  className={
                    keyTodo === "complite"
                      ? `tabs__btn tabs__${keyTodo}`
                      : "tabs__btn"
                  }
                  onClick={() => setKeyTodo("complite")}
                >
                  Completed
                </button>
              </div>
              <div className={disabledCheckbox? "todos load" : "todos"}>
                {!todos.hasOwnProperty("message") &&
                  todos[keyTodo].map((todo, index) => (
                    <Todo
                      key={todo.id}
                      index={index}
                      todo={todo}
                      date={date}
                      changeTodos={changeTodos}
                      disabledCheckbox={disabledCheckbox}
                      setDisabledCheckbox={setDisabledCheckbox}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Popap
        activePopap={activePopap}
        setActivePopap={setActivePopap}
        date={date}
        changeTodos={changeTodos}
      />
    </div>
  );
};

export default HomePage;
