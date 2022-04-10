import Head from "next/head";
import { postRequest } from "../utils/api";
import Main from "../components/layouts/Main";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

export default function Register() {
  const router = useRouter();
  const mounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
    fullname: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form?.password !== form?.re_password) {
      alert("Password dengan Re Type password tidak sama!");
      return false;
    }

    setLoading(true);
    postRequest(`/auth/register`, form)
      .then((result) => {
        if (result?.status) {
          dispatch(logout());
          alert(
            "Akun anda berhasil dibuat, anda akan di arahkan ke halaman login."
          );
          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          if (mounted.current) {
            setLoading(false);
          }
        }, 1000);
      });
  };

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Main>
      <Head>
        <title>Register ~ Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-8">
        <div className="max-w-md mx-auto">
          <div className="card p-8">
            <h3 className="font-semibold text-2xl mb-8 block">
              Register your self
            </h3>
            <form action="" autoComplete="off" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">
                  Fullname
                </label>
                <input
                  id="fullname"
                  type="text"
                  className="form-input"
                  placeholder="Fullname"
                  name="fullname"
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-input"
                  placeholder="Username"
                  name="username"
                  onChange={onInputChange}
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
                  placeholder="Password untuk login"
                  name="password"
                  onChange={onInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="re_password" className="form-label">
                  Retype Password
                </label>
                <input
                  id="re_password"
                  type="password"
                  className="form-input"
                  placeholder="Ulangi Password"
                  name="re_password"
                  onChange={onInputChange}
                />
              </div>
              <button
                type="submit"
                className="button-primary button-block"
                disabled={loading}
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </form>
          </div>
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
