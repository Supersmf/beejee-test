import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

export default function Logout() {
  const dispatch = useDispatch();
  function exit() {
    dispatch(logout());
  }

  return (
    <>
      <Button onClick={exit}>Logout</Button>
    </>
  );
}
