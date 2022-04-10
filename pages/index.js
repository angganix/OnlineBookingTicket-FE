import Head from "next/head";
import { getRequest } from "../utils/api";
import Main from "../components/layouts/Main";
import homeHero from "../public/lotties/home-hero.json";
import Lottie from "lottie-react";
import Link from "next/link";
import LoginForm from "../components/forms/LoginForm";

export default function Home() {
  return (
    <Main>
      <Head>
        <title>Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16">
        <section
          id="hero"
          className="flex justify-between items-start lg:py-10"
        >
          <div className="w-3/5 flex flex-col justify-start items-start">
            <div>
              <Lottie
                animationData={homeHero}
                className="-mt-16"
                style={{ width: 240, height: 240 }}
              />
              <h1 className="text-5xl font-bold mb-6 block">
                Mau ikutan <span className="text-blue-400">konser</span> <br />
                di <span className="text-blue-400">istora senayan</span> ?
              </h1>
              <h5 className="text-xl text-gray-500 block mb-10">
                Yuk daftarkan diri kamu disini, dan pesan tiketnya.
                <br />
                pilih hall dan nomor kursinya,
                <br />
                jangan lupa bawa teman kamu ya!
              </h5>
              <Link href="/concert">
                <a className="hero-button">Lihat Konser</a>
              </Link>
            </div>
          </div>
          <aside className="flex-grow-0 w-1/3">
            <LoginForm />
          </aside>
        </section>
      </main>
    </Main>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: [],
    }, // will be passed to the page component as props
  };
}
