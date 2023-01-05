import { useState } from "react";
import { DataMovie } from "./interfaces";
import styles from "../styles/CardMovie.module.css";
import { useEffect } from "react";

interface Props {
  item: DataMovie;
  key?: string;
  setVideo?: (params: any) => any;
}

async function getInfo({ item }: Props): Promise<DataMovie | null> {
  try {
    const data = await fetch("/api/infoMovie", {
      method: "POST",
      body: JSON.stringify({ item }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    return await data.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

function CardMovie({ item, setVideo }: Props): JSX.Element {
  const [data, setData] = useState<DataMovie | null>(null);

  useEffect(() => {
    start({ item });
  }, []);
  function start({ item }: Props): void {
    void getInfo({ item }).then((_data) => {
      console.log("_data");
      setData(_data);
    });
  }
  return (
    <>
      {data && (
        <div
          className={styles.container}
          onClick={() => {
            console.log(data.url);
            setVideo(data);
          }}
        >
          <div
            style={{
              backgroundImage: `url(${data.backdrop_path || data.poster_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              padding: 0,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div className={styles.infos}>
              <div className={styles.titles}>
                <h2>{data.title}</h2>
                {data.dub ? "Dublado" : "Legendado"}, {data.quality},{" "}
                {data.year}
              </div>
              <div className={styles.overview}>
                <h4>{data.overview}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
      {!data && (
        <div
          className={styles.container}
          onClick={() => {
            alert("movie not found or loading...");
          }}
        >
          <div
            style={{
              backgroundImage: `url('https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              padding: 0,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div className={styles.infos}>
              <div className={styles.titles}>
                <h2>{item.title}</h2>
                {item.dub ? "Dublado" : "Legendado"}, {item.quality},{" "}
                {item.year}
              </div>
              <div className={styles.overview}>
                <h4></h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CardMovie;
