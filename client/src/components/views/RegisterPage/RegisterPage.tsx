import * as React from "react";
import { Main } from "../LandingPage/LandingPage";
import { Form, useInput, UseInputType } from "../LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../../../_reducer/user";
import { RootState } from "../../../_reducer";
import { ComponentsProps } from "../../../hoc/auth";

const RegisterPage: React.FC<ComponentsProps> = props => {
  const [email, onChangeEmail]: UseInputType = useInput("");
  const [name, onChangeName]: UseInputType = useInput("");
  const [password, onChangePassword]: UseInputType = useInput("");
  const [passwordCheck, onChangePasswordCheck]: UseInputType = useInput("");
  const dispatch = useDispatch();
  const { signUpData } = useSelector((state: RootState) => state.user);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<EventTarget>): void => {
      e.preventDefault();
      if (!password) {
        return alert("비밀번호를 입력하세요");
      }

      if (password !== passwordCheck) {
        return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
      }

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          name,
          password
        }
      });
    },
    [email, name, password, passwordCheck, signUpData]
  );

  React.useEffect(() => {
    if (signUpData?.userId) {
      alert("Go to login page !");
      props.history.push("/login");
    }
  }, [signUpData && signUpData.userId]);

  return (
    <Main>
      <Form onSubmit={onSubmit}>
        <label>Email</label>
        <input type='email' value={email} onChange={onChangeEmail} />

        <label>Name</label>
        <input type='text' value={name} onChange={onChangeName} />

        <label>Password</label>
        <input type='password' value={password} onChange={onChangePassword} />

        <label>Confirm Password</label>
        <input
          type='password'
          value={passwordCheck}
          onChange={onChangePasswordCheck}
        />

        <br />
        <button type='submit'>Sign up</button>
      </Form>
    </Main>
  );
};

export default RegisterPage;
