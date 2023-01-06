/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "../styles/movie.module.css";
import React, { useState } from "react";
import { DataTv } from "../components/interfaces";
import CardTv from "../components/CardTv";
import { useEffect } from "react";
interface Props {
  search: DataTv[] | null;
}

interface PropsVideo {
  video: DataTv;
  setVideo: (params: any) => any;
}

function Video({ video, setVideo }: PropsVideo): JSX.Element {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const storage = +localStorage.getItem(video.title);
    if (storage) {
      setIndex(storage);
    }
  }, []);
  function changeIndex(e: number): void {
    let _index = index + e;
    if (_index > video.episodes.length - 1) {
      _index = video.episodes.length - 1;
    }
    if (_index < 0) {
      _index = 0;
    }
    localStorage.setItem(video.title, String(_index));
    setIndex(_index);
  }
  return (
    <div className={styles.iframe}>
      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => {
            setVideo(null);
          }}
        >
          Home
        </button>
        <div className={styles.legend}>
          <h2>{video.title}</h2>
        </div>
        <h2>
          {video.episodes[index].id}/{video.episodes.length - 1}
        </h2>
        <button
          type="button"
          onClick={() => {
            changeIndex(-1);
          }}
        >
          Return
        </button>
        <button
          type="button"
          onClick={() => {
            changeIndex(1);
          }}
        >
          Next
        </button>
      </div>
      <iframe
        name="Player"
        frameBorder={0}
        src={"https://sinalpublico.com" + video.episodes[index].url}
        allowFullScreen
      ></iframe>
    </div>
  );
}
export default function Tv({ search }: Props): JSX.Element {
  const [video, setVideo] = useState<DataTv | null>(null);
  return (
    <main className={styles.main}>
      {!video && (
        <div className={styles.cards}>
          {search?.map((item: DataTv) => (
            <CardTv
              item={item}
              setVideo={setVideo}
              type="tv"
              key={String(item.id)}
            />
          ))}
        </div>
      )}
      {video && <Video video={video} setVideo={setVideo} />}
    </main>
  );
}
