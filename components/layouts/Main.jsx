import React from 'react'
import { useSelector } from 'react-redux';
import FloatBooking from '../widgets/FloatBooking';
import TopNav from './TopNav'

function Main({ children }) {
    const { list: bookingList } = useSelector(state => state.booking);

    return (
        <div>
            <TopNav />
            <main>
                {children}
            </main>
            {bookingList?.length && (
                <FloatBooking />
            )}
        </div>
    )
}

export default Main