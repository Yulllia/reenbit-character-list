import { useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/atom/filterAtom";
import styles from "./login.module.scss";

function LoginInfoUser() {
  const setLoginData = useSetRecoilState<string>(loginState);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("searchWord");
    setLoginData("");
  };

  return (
    <div className={styles.loginInfoCotainer}>
      <button className={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LoginInfoUser;
