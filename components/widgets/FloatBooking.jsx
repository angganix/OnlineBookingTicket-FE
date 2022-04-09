import React from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function FloatBooking() {
    const { list: bookingList } = useSelector(state => state.booking);
    const { user } = useSelector(state => state.auth);
    const router = useRouter();

    if (bookingList?.length && router?.pathname !== "/checkout") {
        return (
            <div className="p-4 rounded-full fixed bottom-0 right-0 m-4 bg-white shadow-lg shadow-gray-300">
                <Link href={user ? '/checkout' : '/login'}>
                    <a className="cursor-pointer">
                        You have <strong>{bookingList?.length}</strong> tickets to checkout
                    </a>
                </Link>
            </div>
        )
    }

    return null;
}

export default FloatBooking