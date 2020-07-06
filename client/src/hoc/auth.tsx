import * as React from "react";
import { useDispatch } from "react-redux";
import { AUTH_REQUEST } from "../_reducer/user";

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
