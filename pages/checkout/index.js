import Head from "next/head";
import { getRequest } from "../../utils/api";
import Main from "../../components/layouts/Main";
import NoData from "../../components/widgets/NoData";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ConcertData } from "../concert/[id]";
import { MdEventSeat, MdOutlineRoomPreferences } from "react-icons/md";
import { dottedNumber } from "../../utils/functions";
import { cancelBooking, updateOrder } from "../../redux/bookingSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { orders: orderList, list: bookingList } = useSelector(
    (state) => state.booking
  );
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [selectedConcert, setSelectedConcert] = useState(null);

  const getTotalAmount = () => {
    let total = 0;
    bookingList.forEach((item) => {
      total += Number(item?.price);
    });
    return dottedNumber(total);
  };

  const onPersonNameChange = (ticket_id, value) => {
    const detail_data = orderList?.detail_orders?.map((item) => {
      if (item?.ticket_id === ticket_id) {
        return {
          ticket_id: ticket_id,
          person_name: value,
        };
      }
      return item;
    });
    dispatch(updateOrder(detail_data));
  };

  const getConcert = () => {
    getRequest(`/concert/${orderList?.concert_id}`)
      .then((result) => {
        if (result) {
          setSelectedConcert(result);
        }
      })
      .catch((err) => {
        alert("Failed get concert data!");
      });
  };

  useEffect(() => {
    if (bookingList?.length) {
      getConcert();
    }
  }, []);

  if (!user) {
    router.push("/login");
    return;
  }

  return (
    <Main>
      <Head>
        <title>Checkout ~ Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-8">
        {bookingList?.length ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-xl font-semibold text-gray-500">
                Checkout Ticket
              </h1>
              <button
                className="button-warning"
                onClick={() => dispatch(cancelBooking())}
              >
                Cancel Order
              </button>
            </div>
            <ConcertData data={selectedConcert} noBookingInfo />
            <br />
            <h1 className="text-xl font-semibold text-gray-500 block mb-4 mt-6">
              Seat Info
            </h1>
            {bookingList?.length
              ? bookingList?.map((booking, key) => (
                  <div className="card p-4 mb-2" key={key}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-x-2 items-center mb-1">
                          <MdOutlineRoomPreferences
                            size={20}
                            className="text-gray-500"
                          />
                          <span className="text-sm">{booking?.hall_name}</span>
                        </div>
                        <div className="flex gap-x-2 items-center mb-1">
                          <MdEventSeat size={20} className="text-gray-500" />
                          <span className="text-sm">
                            Seat Number {booking?.seat_number}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-x-2 items-center">
                        <span className="text-sm">
                          IDR <strong>{dottedNumber(booking?.price)}</strong>
                        </span>
                      </div>
                    </div>
                    <hr className="my-3 border-b border-gray-200 border-dashed" />
                    <div className="flex items-center gap-x-2">
                      <label>Person Name</label>
                      <input
                        type="text"
                        className="rounded p-1 px-2 bg-white border border-gray-200 focus:border-blue-500 outline-none w-1/2"
                        value={
                          orderList?.detail_orders?.find(
                            (order) => order?.ticket_id === booking?.id
                          ).person_name
                        }
                        onChange={(e) =>
                          onPersonNameChange(booking?.id, e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))
              : null}

            <div className="card mt-5 p-4">
              <div className="flex justify-end items-center gap-x-12">
                <h1 className="text-lg text-gray-600">Total</h1>
                <h1 className="text-lg">
                  IDR <strong>{getTotalAmount()}</strong>
                </h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <NoData
              message="There is no ticket to checkout"
              backComponent={
                <Link href="/concert">
                  <a className="text-center button-primary">
                    Select some ticket!
                  </a>
                </Link>
              }
            />
          </>
        )}
      </main>
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
