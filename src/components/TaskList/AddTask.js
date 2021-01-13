import "antd/dist/antd.css";
import { Form, Input, Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { sendNewTask, addTask } from "../../redux/actions";

export default function AddTask() {
  const dispatch = useDispatch();
  const history = useHistory();

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };

  const onFinish = (task) => {
    const modal = Modal.success({
      title: "Success",
      footer: null,
    });
    dispatch(sendNewTask(task));
    dispatch(addTask(task));
    setTimeout(() => {
      history.push("/");
      modal.destroy();
    }, 500);
  };

  return (
    <div className="container">
      <Button>
        <Link to="/">Back</Link>
      </Button>
      <div className="formContainer">
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="TODO"
            name="text"
            rules={[
              {
                required: true,
                message: "Please input your task!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="submitButtonContainer">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
