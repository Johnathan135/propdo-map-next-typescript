import React, { useState, useEffect } from "react";
import houseImages from "../../../public/Assets/index";
import transactions from "../../../Data/transactions.json";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import HomeButton from "../../../components/homeButton/HomeButton";
import styles from "../../../styles/Realestate.module.scss";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";

interface Record {
  address: string;
  price: number | string;
  sqm: number | string;
  num_rooms: number | string;
  floor: number | string;
  num_floors: number | string;
  elevator: number | string;
  parking: number | string;
  id: string;
}

// const randomProp = Math.floor(Math.random() * 5) + 1;
// const randomImg = `house${randomProp}.src`;
// const proPic = `${houseImages}.${randomImg}`;

const Realestate = () => {
  const router = useRouter();
  const API_URL = "http://localhost:3500/properties";
  const [records, setRecords] = useState<Record[]>([]);
  const [fetchError, setFetchError] = useState(null);
  const [query, setQuery] = useState<string>("");
  const [numOfRooms, setNumOfRooms] = useState<string>("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Did not get the data");
        }
        const listings: Record[] = await response.json();
        setRecords(listings);
        setFetchError(null);
      } catch (err: any) {
        setFetchError(err.message);
        //since I am using a dev mock server to simulate api calls, I'm adding this section to handle a case where the mock server is not available
        // To test this code with the mock server, please use
        // npx json-server -p 3500 -w data\transactions.json
        const records: Record[] = transactions.properties;
        setRecords(records);
      }
    };
    fetchRecords();
  }, []);

  const search = (data: Record[]) => {
    // if (typeof data == undefined || !data) console.log("String");
    if (query === "" && numOfRooms === "") {
      return data;
    } else if (numOfRooms === "") {
      console.log(data);
      return data?.filter((item) =>
        decodeURIComponent(JSON.parse(`"${item.address}"`)).includes(query)
      );
    } else if (numOfRooms !== "" && query !== "") {
      return data
        ?.filter((item) =>
          decodeURIComponent(JSON.parse(`"${item.address}"`)).includes(query)
        )
        .filter((item) => item.num_rooms === Number(numOfRooms));
    } else if (numOfRooms !== "" && query === "") {
      return data?.filter((item) => item.num_rooms === Number(numOfRooms));
    }
    return data;
  };

  return (
    <div>
      <div className={styles.flex_center}>
        <HomeButton />
      </div>
      <div className={styles.search_container}>
        <TextField
          className={styles.search_container}
          size="small"
          label="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          <TextField
            className={styles.search_container}
            size="small"
            label="choose number of rooms"
            value={numOfRooms}
            onChange={(e) => {
              setNumOfRooms(e.target.value);
            }}
          />
        </div>
        {fetchError && (
          <p
            style={{ marginTop: "10px", color: "red" }}
          >{`Error: ${fetchError}`}</p>
        )}
      </div>
      <div className={styles.card_container}>
        {search(records)
          .sort((a, b) => (a.price > b.price ? -1 : 1))
          .map((record: Record, index: number) => (
            <div key={index}>
              <Link
                href={{
                  pathname: "/Mappy/Realestate/[id]",
                  query: { id: record.id },
                }}
              >
                <a>
                  <Card sx={{ height: 345, width: 345, marginBottom: 10 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={houseImages.house3.src}
                      alt="listing image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {decodeURIComponent(JSON.parse(`"${record.address}"`))}
                      </Typography>
                      <div className={styles.card}>
                        <Typography variant="body2" color="text.secondary">
                          {`Sqm: ${record.sqm}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`parking spots: ${record.parking}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Number of rooms: ${record.num_rooms}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Number of floors: ${record.num_floors} `}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`Elevators: ${record.elevator}`}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </div>
          ))}
      </div>
      <div className={styles.flex_center}>
        <HomeButton />
      </div>
    </div>
  );
};

export default Realestate;
