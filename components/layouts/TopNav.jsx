import React, { useRef, useEffect } from 'react'
import Link from 'next/link'

function TopNav() {
    const navRef = useRef(null);

    const onScrollEvent = () => {
        if (navRef?.current) {
            if (window.scrollY > 10) {
                navRef.current.classList.add('top-nav-scrolled');
            } else {
                navRef.current.classList.remove('top-nav-scrolled');
            }
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', onScrollEvent);

        return () => {
            document.removeEventListener('scroll', onScrollEvent);
        }
    }, []);

    return (
        <header ref={navRef} className="top-nav sticky top-0">
            <div>
                <Link href="/">
                    <a className="site-brand">Online Ticket</a>
                </Link>
            </div>
            <div>
                <ul className="flex justify-end items-center gap-x-2">
                    <li>
                        <Link href="/">
                            <a className="top-nav-link">Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/concert">
                            <a className="top-nav-link">Concert</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <a className="top-nav-link">Account</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default TopNav