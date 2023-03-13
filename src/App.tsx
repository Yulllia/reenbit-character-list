import { Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CharacterList from "./components/characterList/CharacterList";
import DetailCard from "./components/detailPage/DetailCard";
import Login from "./components/login/Login";
import { loginState } from "./recoil/atom/filterAtom";

function App() {
  const userLogin = useRecoilValue(loginState);
  if (!userLogin) {
    return <Login />;
  }
  return (
    <Routes>
      <Route path="/" element={<CharacterList />} />
      <Route path="/card/:cardId" element={<DetailCard />} />
    </Routes>
  );
}

export default App;
