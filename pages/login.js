import Head from "next/head";
import { getRequest } from "../utils/api";
import Main from "../components/layouts/Main";
import homeHero from "../public/lotties/home-hero.json";
import Lottie from "lottie-react";
import Link from "next/link";
import LoginForm from "../components/forms/LoginForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Login() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  if (user) {
    router.push("/");
    return;
  }

  return (
    <Main>
      <Head>
        <title>Login ~ Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-8">
        <div className="max-w-md mx-auto">
          <LoginForm />
        </div>
      </main>
    </Main>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: null,
    }, // will be passed to the page component as props
  };
}
