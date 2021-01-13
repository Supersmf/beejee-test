import { useEffect } from "react";
import { getTasks } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Button, List } from "antd";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import taskImg from "../../taskImg.png";
import SortButton from "./SortButton";

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state);
  const { admin } = useSelector((state) => state);

  useEffect(() => {
    tasks.length === 0 && dispatch(getTasks());
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [dispatch, tasks.length]);

  return (
    <>
      <div className="container">
        <div className="listContainer">
          <h1>Task List</h1>
          <div className="linksContaier">
            <Button>
              <Link to="/addtask">Add new Task</Link>
            </Button>
            <SortButton />
            {!admin ? (
              <Button>
                <Link to="/login">Sign In as Admin</Link>
              </Button>
            ) : (
              <Logout />
            )}
          </div>
          <List
            pagination={{
              total: tasks.length,
              defaultPageSize: 3,
            }}
            dataSource={tasks}
            renderItem={(task) => (
              <div key={Math.random()} className="taskContainer">
                <div className="imgContainer">
                  <img
                    width="200"
                    height="200"
                    src={task.image_path ? task.image_path : taskImg}
                    alt="No img"
                  />
                </div>
                <div className="dataContainer">
                  <div className="topDataContainer">
                    <h3>
                      Author: <b>{task.username}</b>
                    </h3>
                    <h4>
                      Contacts: <b>{task.email}</b>
                    </h4>
                  </div>
                  <h4>
                    TODO: <b>{task.text}</b>
                  </h4>
                  <h4
                    style={{
                      color: task.status === 10 ? "green" : "red",
                    }}
                  >
                    Status: <b>{task.status === 10 ? "Done" : "Undone"}</b>
                  </h4>
                  <div className="bottomTaskContainer">
                    {admin && (
                      <>
                        <Button>
                          <Link to={`/edittask/${task.id}`}>Edit</Link>
                        </Button>
                        {task.edited && <p>Edited By Admin</p>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
}
