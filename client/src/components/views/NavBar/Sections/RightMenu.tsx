import * as React from "react";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../_reducer";
import { LOG_OUT_REQUEST } from "../../../../_reducer/user";

interface RightMenuProps {
  mode: any;
}

const RightMenu: React.FC<RightMenuProps> = ({ mode }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.user);
  const onLogOut = React.useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  if (me && me.isAuth) {
    return (
      <Menu mode={mode}>
        <Menu.Item key='upload'>
          <a href='/product/upload'>Upload</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={onLogOut}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={mode}>
        <Menu.Item key='sign_in'>
          <a href='/login'>Sign in</a>
        </Menu.Item>
        <Menu.Item key='sign_up'>
          <a href='/register'>Sign up</a>
        </Menu.Item>
      </Menu>
    );
  }
};

export default RightMenu;
