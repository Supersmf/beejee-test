import {
  SET_TASKS,
  ADD_TASK,
  LOGIN,
  SET_TOKEN,
  EDIT_TASK,
  LOGOUT,
  SORT_TYPE,
  TO_LOWEST,
  TO_HIGHEST,
} from "./actionTypes";
import { Modal } from "antd";

export function getTasks() {
  return async function (dispatch) {
    const response = await fetch(
      "https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Ivan"
    );
    const result = await response.json();
    dispatch(setTasks(result.message.tasks));
  };
}

export function setTasks(tasks) {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
}

export function sendNewTask(task) {
  const form = new FormData();
  form.append("username", task.username);
  form.append("email", task.email);
  form.append("text", task.text);

  return async function (dispatch) {
    await fetch(
      "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Ivan",
      {
        method: "POST",
        body: form,
      }
    );
  };
}

export function addTask(task) {
  return {
    type: ADD_TASK,
    payload: { ...task, status: 0, id: Math.random() },
  };
}

export function checkAdmin(values) {
  const form = new FormData();
  form.append("username", values.username);
  form.append("password", values.password);

  return async function (dispatch) {
    const response = await fetch(
      "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Ivan",
      {
        method: "POST",
        body: form,
      }
    );
    const result = await response.json();
    if (result.status === "ok") {
      dispatch(login(true));
      dispatch(setToken(result.message.token));
      localStorage.setItem("admin", true);
      localStorage.setItem("token", JSON.stringify(result.message.token));
    } else {
      Modal.error({
        title: `Error: ${result.message.password}`,
      });
    }
  };
}
export function login(bool) {
  return {
    type: LOGIN,
    payload: bool,
  };
}
export function setToken(token) {
  return {
    type: SET_TOKEN,
    payload: token,
  };
}
export function sendEditTask(token, taskId) {
  const form = new FormData();
  form.append("token", token);
  return async function () {
    await fetch(
      `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${taskId}?developer=Ivan`,
      {
        method: "POST",
        body: form,
      }
    );
  };
}
export function editTask(task, taskId) {
  return {
    type: EDIT_TASK,
    payload: {
      task,
      taskId,
    },
  };
}
export function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
}

export function setSortType(type) {
  return {
    type: SORT_TYPE,
    payload: type,
  };
}

export function sortToLowest(tasks, sortType) {
  let sortedTasks;
  if (sortType === "name") {
    sortedTasks = tasks.sort((task1, task2) => {
      if (task1.username < task2.username) {
        return 1;
      }
      if (task1.username > task2.username) {
        return -1;
      }
      return 0;
    });
  }
  if (sortType === "email") {
    sortedTasks = tasks.sort((task1, task2) => {
      if (task1.email < task2.email) {
        return 1;
      }
      if (task1.email > task2.email) {
        return -1;
      }
      return 0;
    });
  }
  if (sortType === "status") {
    sortedTasks = tasks.sort((task1, task2) => {
      return task2.status - task1.status;
    });
  }

  return {
    type: TO_LOWEST,
    payload: sortedTasks,
  };
}
export function sortToHighest(tasks, sortType) {
  let sortedTasks;
  if (sortType === "name") {
    sortedTasks = tasks.sort((task1, task2) => {
      if (task1.username > task2.username) {
        return 1;
      }
      if (task1.username < task2.username) {
        return -1;
      }
      return 0;
    });
  }
  if (sortType === "email") {
    sortedTasks = tasks.sort((task1, task2) => {
      if (task1.email > task2.email) {
        return 1;
      }
      if (task1.email < task2.email) {
        return -1;
      }
      return 0;
    });
  }
  if (sortType === "status") {
    sortedTasks = tasks.sort((task1, task2) => {
      return task1.status - task2.status;
    });
  }
  return {
    type: TO_HIGHEST,
    payload: sortedTasks,
  };
}
