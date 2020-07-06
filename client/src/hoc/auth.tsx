import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_REQUEST } from "../_reducer/user";
import { RootState } from "../_reducer";

export interface ComponentsProps {
  history: {
    push: (path: string) => void;
  };
}

interface AuthProps {
  props: {
    history: {
      push: (path: string) => void;
    };
  };
}

const Auth = (
  SpecificComponent: React.FC<ComponentsProps>,
  option: boolean | null, // null: 아무나 출입 가능, true: 로그인한 유저만 출입 가능, false: 로그인한 유저는 출입 불가능
  adminRoute: boolean | null = null
) => {
  const AuthenticationCheck = (props: ComponentsProps) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
      dispatch({
        type: AUTH_REQUEST
      });
    }, []);

    return <SpecificComponent {...props} />;
  };

  return AuthenticationCheck;
};

export default Auth;
