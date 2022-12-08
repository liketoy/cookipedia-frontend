import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";
import PropTypes from "prop-types";

// logOutOnly를 Props를 추가하여 로그인 되어 있을 때(default)와 로그아웃 되어 있을 때 상황을 나누어 설정
// ex. SignIn, SignUp Page같은 경우는 로그인이 되어있을 땐 접속이 불가능 해야함
// <ProtectedPage logOutOnly>~~</ProtectedPage>
export default function ProtectedPage({ children, logOutOnly = false }) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (logOutOnly) {
        if (isLoggedIn) {
          navigate("/");
        }
      } else {
        if (!isLoggedIn) {
          navigate("/signin");
        }
      }
    }
  }, [userLoading, isLoggedIn, navigate, logOutOnly]);
  return <>{children}</>;
}

ProtectedPage.propTypes = {
  children: PropTypes.element.isRequired,
  logOutOnly: PropTypes.bool,
};
