import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { LoginWrapper, ButtonLogin, AlertMessage, Logo } from "./styled";
import { UserLoginContext } from "../LoginContext/LoginContext";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(UserLoginContext);
  // tworzy referencje do elementu html
  const formRef = useRef(null);
  const usernameRef = useRef(null);
  const { isAuthenticated, isAdmin } = context;
  const [data, setData] = useState(false);

  // przejście na stronę główną po zmianie wartości zmiennej data na true (ani user ani admin)
  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data]);

  // ustawia focus na polu tekstowym jak element zostanie dodany na strone
  useLayoutEffect(() => {
    usernameRef.current.focus();
  });

  const onFinish = (values) => {
    if (values.username === "user" && values.password === "user") {
      isAuthenticated(true);
      isAdmin(false);
      navigate("/user-panel");
    } else if (values.username === "admin" && values.password === "admin") {
      isAuthenticated(true);
      isAdmin(true);
      navigate("/user-panel-admin");
    } else {
      navigate("/");
      setData(true);
    }
  };

  return (
    <LoginWrapper>
      <Logo src={logo} />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        ref={formRef}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            ref={usernameRef}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <ButtonLogin
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </ButtonLogin>
          
        </Form.Item>
        <AlertMessage>
          {data ? (
            <Alert message="Incorrect username or password" type="error" />
          ) : null}
        </AlertMessage>
      </Form>
    </LoginWrapper>
  );
};

export default Login;
