import Head from "next/head";
import { getRequest } from "../../utils/api";
import Main from "../../components/layouts/Main";
import moment from "moment";
import { AiOutlineCalendar, AiOutlineCheck } from "react-icons/ai";
import { MdEventSeat } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { countQuota, countSold } from ".";
import { useState, useEffect } from "react";
import { dottedNumber } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { addBooking, removeBooking } from "../../redux/bookingSlice";
import NoData from "../../components/widgets/NoData";

const SoldBadge = ({ sold }) => {
  if (sold) {
    return (
      <span className="badge-warning absolute top-0 right-0 m-2">Sold</span>
    );
  }

  return (
    <span className="badge-success absolute top-0 right-0 m-2">Available</span>
  );
};

export default function DetailConcert({ data, id }) {
  const [currentHall, setCurrentHall] = useState("");
  const [selectedHall, setSelectedHall] = useState([]);
  const dispatch = useDispatch();
  const { list: bookingList } = useSelector((state) => state.booking);

  const onHallChange = (e) => {
    const { value } = e.target;
    setCurrentHall(value);
  };

  const setHall = () => {
    const getHall = data?.halls?.find(
      (hall) => hall.id === Number(currentHall)
    );
    setSelectedHall(getHall);
  };

  const bookingTicket = (ticket) => {
    if (!ticket?.sold) {
      const checkTicket = bookingList.find((item) => item?.id === ticket?.id);
      if (checkTicket) {
        dispatch(
          removeBooking({
            ...ticket,
            concert_id: id,
          })
        );
      } else {
        dispatch(
          addBooking({
            ...ticket,
            concert_id: id,
          })
        );
      }
    }
  };

  useEffect(() => {
    setHall();
  }, [currentHall]);

  return (
    <Main>
      <Head>
        <title>Live Concert Ticket</title>
        <meta name="description" content="Pemesanan tiket konser online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-8">
        {data && (
          <>
            <header className="card p-4 px-5">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl font-semibold text-gray-600">
                  {data?.title}
                </h1>
                <time className="text-gray-600 flex items-center">
                  <AiOutlineCalendar className="mr-2" size={20} />
                  {moment(data?.time).format("DD/MM/YYYY HH:mm:ss")}
                </time>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500">{data?.description}</p>
                <span className="badge-success flex items-center">
                  <span className="text-lg">
                    {countQuota(data?.halls) - countSold(data?.halls)}
                  </span>
                  <span className="ml-1">Available Tickets</span>
                </span>
              </div>
            </header>
            <hr className="mt-5 mb-2 border-b border-dashed border-gray-300" />
            <section className="flex justify-between items-center">
              <h4 className="text-lg text-gray-500">Available Seats</h4>
              <div>
                <div className="flex items-center">
                  <label className="text-lg text-gray-500 mr-2">
                    Select Hall
                  </label>
                  <select
                    className="select-input"
                    value={currentHall}
                    onChange={(e) => onHallChange(e)}
                  >
                    <option value="">Select Hall</option>
                    {data?.halls?.map((hall, hallKey) => (
                      <option key={hallKey} value={hall?.id}>
                        [{hall?.quota} Seats] {hall?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            <hr className="mt-2 mb-5 border-b border-dashed border-gray-300" />
            <div>
              {selectedHall?.tickets?.length ? (
                <div className="grid grid-cols-4 gap-4">
                  {selectedHall?.tickets?.map((ticket, ticketKey) => (
                    <div
                      key={ticketKey}
                      className={`card p-3 relative ${
                        ticket?.sold
                          ? ""
                          : "cursor-pointer floating-card-animation"
                      }`}
                      onClick={() => bookingTicket(ticket)}
                    >
                      <h4 className="flex gap-x-2 items-center">
                        <MdEventSeat size={20} className="text-gray-500" />
                        <span>Seat No. {ticket?.seat_number}</span>
                      </h4>
                      <h5 className="flex gap-x-2 items-center">
                        <FaRegMoneyBillAlt
                          size={20}
                          className="text-gray-500"
                        />
                        <span className="font-semibold">
                          IDR {dottedNumber(ticket?.price)}
                        </span>
                      </h5>
                      <SoldBadge sold={ticket?.sold} />
                      {bookingList?.find(
                        (booking) => booking?.id === ticket?.id
                      ) && (
                        <span className="badge-primary absolute bottom-0 right-0 m-2 flex gap-x-2 items-center">
                          <AiOutlineCheck />
                          <span>Selected</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <NoData message="No Seats Found (Please ensure you have to select hall)" />
              )}
            </div>
          </>
        )}
      </main>
    </Main>
  );
}

export async function getServerSideProps({ params }) {
  const data = await getRequest(`/concert/${params?.id}`);
  return {
    props: {
      data: data,
      id: params?.id,
    },
  };
}
