import "antd/dist/antd.css";
import { Form, Input, Button, Modal } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAdmin } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const { admin } = useSelector((state) => state);
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
  const tailLayout = {
    wrapperCol: {
      offset: 11,
    },
  };

  useEffect(() => {
    if (admin === true) {
      const modal = Modal.success({
        title: "Success",
        footer: null,
      });
      setTimeout(() => {
        modal.destroy();
        history.push("/");
      }, 400);
    }
  }, [admin, history]);

  const onFinish = (values) => {
    dispatch(checkAdmin(values));
  };

  return (
    <>
      <div className="container">
        <Button>
          <Link to="/">Back</Link>
        </Button>
        <div className="formContainer">
          <div className="form">
            <Form {...layout} name="basic" onFinish={onFinish}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
