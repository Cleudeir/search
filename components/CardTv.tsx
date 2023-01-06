import { useState } from "react";
import { DataTv } from "./interfaces";
import styles from "../styles/CardMovie.module.css";
import { useEffect } from "react";

interface Props {
  item: DataTv;
  type: string;
  key?: string;
  setVideo?: (params: any) => any;
}

async function getInfo({ item, type }: Props): Promise<DataTv | null> {
  try {
    const data = await fetch("/api/infoTv", {
      method: "POST",
      body: JSON.stringify({ item, type }),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });
    const json = await data.json();
    return json;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

function CardMovie({ item, type, setVideo }: Props): JSX.Element {
  const [data, setData] = useState<DataTv | null>(null);

  useEffect(() => {
    void start({ item, type });
  }, []);
  async function start({ item, type }: Props): Promise<void> {
    const _data = await getInfo({ item, type });
    setData(_data);
  }
  return (
    <>
      {data && (
        <div
          className={styles.container}
          onClick={() => {
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
            alert("Series not found or loading...");
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
