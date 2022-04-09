import React from 'react'
import Link from 'next/link';
import { useSelector } from 'react-redux';

function FloatBooking() {
    const { list: bookingList } = useSelector(state => state.booking);

    if (bookingList?.length) {
        return (
            <div className="p-4 rounded-full fixed bottom-0 right-0 m-4 bg-white shadow-lg shadow-gray-300">
                <Link href="/checkout">
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