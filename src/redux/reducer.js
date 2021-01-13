import {
  ADD_TASK,
  SET_TASKS,
  LOGIN,
  SET_TOKEN,
  EDIT_TASK,
  LOGOUT,
  SORT_TYPE,
  TO_LOWEST,
  TO_HIGHEST,
} from "./actionTypes";

const initialState = {
  admin: JSON.parse(localStorage.getItem("admin")) || false,
  token: JSON.parse(localStorage.getItem("token")) || null,
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  sortType: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case LOGIN:
      return {
        ...state,
        admin: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: [
          ...(state.tasks = state.tasks.map((task) => {
            if (task.id === Number(action.payload.taskId)) {
              task.status = action.payload.task.status;
              if (task.text !== action.payload.task.text) {
                task.edited = true;
              }
              task.text = action.payload.task.text;
              return task;
            } else return task;
          })),
        ],
      };
    case LOGOUT:
      return {
        ...state,
        admin: false,
        token: null,
        adminStatus: false,
      };
    case SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case TO_LOWEST:
      return {
        ...state,
        tasks: action.payload,
      };
    case TO_HIGHEST:
      return {
        ...state,
        tasks: action.payload,
      };
    default: {
      return state;
    }
  }
}
