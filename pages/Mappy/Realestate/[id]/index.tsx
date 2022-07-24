import React from "react";
import { useRouter } from "next/router";
import HomeButton from "../../../../components/homeButton/HomeButton";
import styles from "../../../../styles/Realestate.module.scss";

const id = () => {
  const { query } = useRouter();

  return (
    <div className={styles.id_page}>
      <div>{query.id}</div>
      <div>
        <HomeButton />
      </div>
    </div>
  );
};

export default id;
