import React from 'react'
import { useSelector } from 'react-redux';
import Main from './Main'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AiOutlineUser, AiOutlineHistory, AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link'

const userMenu = [
    { path: "/account", label: "My Profile", icon: AiOutlineUser },
    { path: "/account/order", label: "Order History", icon: AiOutlineHistory },
    { path: "/logout", label: "Logout", icon: AiOutlineLogout }
];

function AccountLayout({ children }) {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    if (!user) {
        router.push("/login");
        return;
    }
    return (
        <Main>
            <Head>
                <title>Account ~ Live Concert Ticket</title>
                <meta name="description" content="Pemesanan tiket konser online" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="px-16 py-8">
                <div className="flex items-start gap-x-6">
                    <aside className="w-72 flex-shrink-0">
                        <div className="card p-3">
                            <ul>
                                {userMenu.map((menu, index) => (
                                    <li key={index} className="mb-1">
                                        <Link href={menu.path}>
                                            <a
                                                className={`link-list ${router.pathname === menu.path
                                                    ? "link-list-active"
                                                    : ""
                                                    }`}
                                            >
                                                <menu.icon />
                                                <span className="text-sm">{menu.label}</span>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <main className="flex-grow">
                        {children}
                    </main>
                </div>
            </main>
        </Main>
    )
}

export default AccountLayout