/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "../styles/movie.module.css";
import React from "react";
import CardMovie from "../components/CardMovie";
import { DataMovie } from "../components/interfaces";
import { useState } from "react";

interface Props {
  search: DataMovie[] | null;
}

export default function Movie({ search }: Props): JSX.Element {
  const [video, setVideo] = useState<DataMovie | null>(null);
  return (
    <main className={styles.main}>
      {!video &&
        search?.map((item: DataMovie) => (
          <CardMovie
            setVideo={setVideo}
            type="movie"
            item={item}
            key={item.title}
          />
        ))}
      {video && (
        <div className={styles.iframe}>
          <div className={styles.buttons}>
            <div className={styles.legend}>
              <h2>{video.title}</h2>
              <h5>
                {video.dub ? "Dublado" : "Legendado"}, {video.quality},{" "}
                {video.year}
              </h5>
            </div>
            <button
              type="button"
              onClick={() => {
                setVideo(null);
              }}
            >
              return
            </button>
          </div>
          <iframe
            name="Player"
            frameBorder={0}
            src={"https://sinalpublico.com" + video.url}
            allowFullScreen
          >
            {" "}
          </iframe>
        </div>
      )}
    </main>
  );
}
