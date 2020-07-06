import * as React from "react";
import { Main } from "../LandingPage/LandingPage";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../../../_reducer/user";
import { RootState } from "../../../_reducer";
import "react-toastify/dist/ReactToastify.css";
import { ComponentsProps } from "../../../hoc/auth";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export type UseInputType = [
  string | number,
  (e: React.FormEvent<EventTarget>) => void
];

export const useInput = (initialValue: string | number): UseInputType => {
  const [value, setter] = React.useState(initialValue);
  const handler = React.useCallback((e: React.FormEvent<EventTarget>): void => {
    const target = e.target as HTMLInputElement;
    setter(target.value);
  }, []);
  return [value, handler];
};

const LoginPage: React.FC<ComponentsProps> = props => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const [email, onChangeEmail]: UseInputType = useInput("");
  const [password, onChangePassword]: UseInputType = useInput("");

  const onSubmitForm = React.useCallback(
    async (e: React.FormEvent<EventTarget>): Promise<void> => {
      e.preventDefault();
      await dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password
        }
      });
    },
    [email, password, me]
  );

  React.useEffect(() => {
    if (me && me._id) {
      props.history.push("/");
    }
    if (me && me.userId) {
      alert("Go to home! you logged in!");
      props.history.push("/");
    }
  }, [me]);

  return (
    <React.Fragment>
      <Main>
        <Form onSubmit={onSubmitForm}>
          <label>Email</label>
          <input type='email' value={email} onChange={onChangeEmail} />

          <label>Password</label>
          <input type='password' value={password} onChange={onChangePassword} />

          <br />
          <button type='submit'>Login</button>
        </Form>
      </Main>
    </React.Fragment>
  );
};

export default LoginPage;
