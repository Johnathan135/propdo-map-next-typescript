import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="Mappy" content="property of Propdo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1></h1>

      <div className={styles.links}>
        <h2> Links</h2>
        <Link href="/Mappy/MyMap">
          <a>Mappy</a>
        </Link>
        <Link href="/Mappy/Realestate">
          <a>Listings</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
