import Head from "next/head";
import { getRequest } from "../utils/api";
import Main from "../components/layouts/Main";
import homeHero from "../public/lotties/home-hero.json";
import Lottie from "lottie-react";
import Link from "next/link";

export const AccountBox = () => {
  return (
    <div className="card p-8">
      <h3 className="font-semibold text-2xl mb-8 block">Login ke Sistem</h3>
      <form action="" autoComplete="off">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username / Email
          </label>
          <input
            id="username"
            type="text"
            className="form-input"
            placeholder="Username / Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Password akun"
          />
        </div>
        <button type="submit" className="button-primary button-block">
          Login
        </button>
        <p className="text-center text-gray-400 my-2">atau</p>
        <button type="submit" className="button-primary-outline button-block">
          Daftar
        </button>
      </form>
    </div>
  );
};

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
            <AccountBox />
          </aside>
        </section>
      </main>
    </Main>
  );
}

export async function getStaticProps(context) {
  const concertData = await getRequest("/concert");
  return {
    props: {
      data: concertData,
    }, // will be passed to the page component as props
  };
}
