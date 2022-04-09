import Head from "next/head";
import { getRequest } from "../../utils/api";
import Main from "../../components/layouts/Main";
import NoData from "../../components/widgets/NoData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { orders: orderList } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  return (
    <Main>
      <Head>
        <title>Checkout ~ Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16"></main>
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
