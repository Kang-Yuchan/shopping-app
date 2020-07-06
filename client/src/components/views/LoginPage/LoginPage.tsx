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

export type UseInputType = [string, (e: React.FormEvent<EventTarget>) => void];

export const useInput = (initialValue: string): UseInputType => {
  const [value, setter] = React.useState<string>(initialValue);
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
    (e: React.FormEvent<EventTarget>): void => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password
        }
      });
      if (me?.message === "This user is not exist.") {
        toast.error("This user is not exist.");
      } else if (me?.message === "This password is not currect.") {
        toast.error("This password is not currect.");
      } else {
        toast.error("Log in failed..");
      }
    },
    [email, password]
  );

  React.useEffect(() => {
    if (me && me.userId) {
      props.history.push("/");
    }
  }, [me && me.userId]);

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
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
};

export default LoginPage;
