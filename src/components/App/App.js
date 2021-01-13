import "./App.scss";
import TaskList from "../TaskList/TaskList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTask from "../TaskList/AddTask";
import EditTask from "../TaskList/EditTask";
import Login from "../Login/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/addtask">
          <AddTask />
        </Route>
        <Route path="/edittask/:taskId">
          <EditTask />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <TaskList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
