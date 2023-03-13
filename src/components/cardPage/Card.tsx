import { Link } from "react-router-dom";
import { Character } from "../../interfaces/interfaces";
import styles from "./card.module.scss";

function Card({ character }: Character) {
  return (
    <Link className={styles.link} to={`/card/${character.id}`}>
      <li className={styles.card}>
        <img
          className={styles.image}
          src={character.image}
          alt={character.name}
        />
        <h4 title={character.name} className={styles.name}>{character.name}</h4>
        <p className={styles.species}>{character.species}</p>
      </li>
    </Link>
  );
}

export default Card;
