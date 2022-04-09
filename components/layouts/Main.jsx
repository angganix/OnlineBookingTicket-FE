import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FloatBooking from '../widgets/FloatBooking';
import TopNav from './TopNav'
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { logout } from '../../redux/authSlice';

function Main({ children }) {
    const { list: bookingList } = useSelector(state => state.booking);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        api.interceptors.response.use(
            async (response) => {
                return response;
            },
            async (error) => {
                console.log(error.response);
                if (error.response.status === 403 || error.response.status === 401) {
                    dispatch(logout());
                    setTimeout(() => {
                        router.push('/login');
                    }, 1000);
                }
                return Promise.reject(error);
            }
        );
    }, [router.pathname])

    return (
        <div>
            <TopNav />
            <main>
                {children}
            </main>
            {bookingList?.length ? (
                <FloatBooking />
            ) : null}
        </div>
    )
}

export default Main