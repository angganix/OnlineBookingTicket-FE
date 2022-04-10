import Head from "next/head";
import { postRequest } from "../utils/api";
import Main from "../components/layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { logout } from "../redux/authSlice";

export default function Logout() {
  const mounted = useRef(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  const doLogout = () => {
    postRequest(`/auth/logout`, {}).then((result) => {
      if (result?.status) {
        dispatch(logout());
      }
    });
  };

  useEffect(() => {
    mounted.current = true;
    doLogout();

    return () => {
      mounted.current = false;
    };
  }, []);

  if (!user) {
    router.push("/");
    return;
  }

  return (
    <Main>
      <Head>
        <title>Logout ~ Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-8">
        <div className="max-w-md mx-auto"></div>
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
