/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import styles from "../styles/movie.module.css";
import React from "react";
import { DataTv } from "../components/interfaces";
import CardTv from "../components/CardTv";
interface Props {
  search: DataTv[] | null;
}
export default function Tv({ search }: Props): JSX.Element {
  return (
    <main className={styles.main}>
      {search.length > 0 &&
        search.map((item: DataTv) => (
          <CardTv item={item} type="tv" key={String(item.id)} />
        ))}
    </main>
  );
}
