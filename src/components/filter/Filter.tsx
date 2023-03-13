import { useState } from "react";
import styles from "./filter.module.scss";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { useRecoilState } from "recoil";
import { filterListState } from "../../recoil/atom/filterAtom";

function Filter() {
  const [inputText, setInputText] = useState<string>("");
  const [searchWord, setSearchWord] = useRecoilState<string>(filterListState);

  const handleFilter = (event: { target: { value: string } }) => {
    const textToFind = event.target.value.toLowerCase();
    setInputText(textToFind);
    if (!textToFind) {
      setSearchWord("");
    }
  };
  const handleEnter = (e: { key: string }) => {
    if (e.key === "Enter") {
      localStorage.setItem("searchWord", inputText);
      setSearchWord(inputText);
    }
    return;
  };

  return (
    <div className={styles.onEnter}>
      <SearchIcon
        className={styles.searchIcon}
        onClick={() => setSearchWord(inputText)}
      />
      <input
        className={styles.input}
        onChange={handleFilter}
        onKeyDown={handleEnter}
        value={inputText || searchWord}
        type="search"
        placeholder="Filter by name..."
      />
    </div>
  );
}

export default Filter;
