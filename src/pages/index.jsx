import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Featured from "../Components/Featured";
import Hero from "@/Components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Blog</title>
        <meta name="description" content="The Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`default`}>
        <Hero />
        <Featured />
      </main>
    </>
  );
}
