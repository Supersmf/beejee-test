import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { sendEditTask, editTask, login } from "../../redux/actions";

export default function EditTask() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { taskId } = useParams();

  const { tasks } = useSelector((state) => state);
  const { token } = useSelector((state) => state);
  const { admin } = useSelector((state) => state);

  let currentTask = tasks.find((task) => task.id === Number(taskId));

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 11,
    },
  };

  useEffect(() => {
    if (admin !== JSON.parse(localStorage.getItem("admin"))) {
      dispatch(login(false));
      history.push("/login");
      Modal.info({
        title: "Please Sign In!",
      });
    }
  }, []);

  const onFinish = (task) => {
    task.status === true ? (task.status = 10) : (task.status = 0);
    const modal = Modal.success({
      title: "Success",
    });
    dispatch(sendEditTask(task, token, taskId));
    dispatch(editTask(task, taskId));
    setTimeout(() => {
      history.push("/");
      modal.destroy();
    }, 400);
  };

  return (
    <>
      <div className="container">
        <Button>
          <Link to="/">Back</Link>
        </Button>
        <div className="formContainer">
          <div className="form">
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              initialValues={{
                remember: false,
              }}
            >
              <Form.Item
                label="TODO"
                name="text"
                initialValue={currentTask.text}
                rules={[
                  {
                    required: true,
                    message: "Please input your task!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout} name="status" valuePropName="checked">
                <Checkbox>Status</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Edit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
