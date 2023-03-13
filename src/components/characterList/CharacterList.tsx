import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../cardPage/Card";
import styles from "./list.module.scss";
import { ReactComponent as Character } from "../../assets/name-character.svg";
import Filter from "../filter/Filter";
import { useRecoilValue } from "recoil";
import { filterListState } from "../../recoil/atom/filterAtom";
import LoginInfoUser from "../login/Logout";
import { CardList, ICard } from "../../interfaces/interfaces";
import Spinner from "../spinner/Spinner";

function CharacterList() {
  const [loading, setLoading] = useState(false);
  const [characterInfo, setCharacterInfo] = useState<Array<ICard>>([]);
  const searchWord = useRecoilValue(filterListState);

  useEffect(() => {
    setLoading(true);
    const loadCharacter = async () => {
      await axios
        .get<CardList>(
          `${process.env.REACT_APP_API_URL}${
            searchWord ? "/?name=" + searchWord : ""
          }`
        )
        .then((response) => {
          setLoading(false);
          setCharacterInfo(response.data.results);
        })
        .catch((error) => {
          setLoading(false);
          return setCharacterInfo([]);
        });
    };
    loadCharacter();
  }, [searchWord]);

  if (loading) {
    return <Spinner/>;
  }

  return (
      <div className={styles.listContainer}>
      <LoginInfoUser />
        <Character />
        <Filter />
        <ul className={styles.cardContainer}>
          {characterInfo?.length > 0 ? (
            characterInfo
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((character: ICard) => {
                return <Card key={character.id} character={character} />;
              })
          ) : (
            <div>No matches found!</div>
          )}
        </ul>
      </div>
  );
}

export default CharacterList;
