import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ICard } from "../../interfaces/interfaces";
import styles from "./details.module.scss";
import { ReactComponent as ArrowBack } from "../../assets/arrow-back.svg";
import LoginInfoUser from "../login/Logout";
import Spinner from "../spinner/Spinner";

function DetailCard() {
  const [loading, setLoading] = useState(false);
  const [detailCard, setDetailCard] = useState<ICard | null>(null);
  const {cardId} = useParams();
  const backArrow = "go back".toUpperCase();

  useEffect(() => {
    setLoading(true);
    const loadDetailCard = async () => {
      await axios
        .get<ICard>(`${process.env.REACT_APP_API_URL}/${cardId}`)
        .then((response) => {
          setLoading(false);
          setDetailCard(response.data);
        })
        .catch((error) => {
          setLoading(false);
          return setDetailCard(null);
        });
    };
    loadDetailCard();
  }, [cardId]);

  if (loading) {
    return <Spinner/>
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <Link className={styles.link} to="/">
            <ArrowBack />
            <span className={styles.arrowBack}>{backArrow}</span>
          </Link>
          <LoginInfoUser/>
        </div>
        {detailCard ? (
          <>
            <img
              className={styles.image}
              src={detailCard.image}
              alt={detailCard.name}
            />
            <h3 className={styles.title}>{detailCard.name}</h3>
            <p className={styles.information}>Informations</p>
            <ul className={styles.section}>
              <li>
                <p className={styles.sectionName}>Gender</p>
                <p className={styles.description}>{detailCard.gender}</p>
                <div className={styles.border} />
              </li>
              <li>
                <p className={styles.sectionName}>Status</p>
                <p className={styles.description}>{detailCard.status}</p>
                <div className={styles.border} />
              </li>
              <li>
                <p className={styles.sectionName}>Species</p>
                <p className={styles.description}>{detailCard.species}</p>
                <div className={styles.border} />
              </li>
              <li>
                <p className={styles.sectionName}>Origin</p>
                <p className={styles.description}>{detailCard.origin.name}</p>
                <div className={styles.border} />
              </li>
              <li>
                <p className={styles.sectionName}>Type</p>
                <p className={styles.description}>
                  {detailCard.type ? detailCard.type : "Unknown"}
                </p>
                <div className={styles.border} />
              </li>
            </ul>
          </>
        ) : (
          <div>No details for character not found!</div>
        )}
      </div>
    </>
  );
}

export default DetailCard;
