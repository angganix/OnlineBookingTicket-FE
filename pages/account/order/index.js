import { getRequest, postRequest, putRequest } from "../../../utils/api";
import NoData from "../../../components/widgets/NoData";
import Link from "next/link";
import { AiOutlineUser, AiOutlineHistory } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { dottedNumber } from "../../../utils/functions";
import AccountLayout from "../../../components/layouts/AccountLayout";
import { ConcertData } from "../../concert/[id]";
import moment from "moment";

export default function Order() {
  const [data, setData] = useState([]);

  const getOrderList = () => {
    getRequest(`/checkout`).then((result) => {
      if (result) {
        setData(result?.data);
      }
    });
  };

  const doPayment = () => {
    const paymentData = new URLSearchParams(window.location.search);
    const merchantOrderId = paymentData.get("merchantOrderId");
    const resultCode = paymentData.get("resultCode");

    if (merchantOrderId && resultCode === "00") {
      putRequest(`/checkout/payment/${merchantOrderId}`)
        .then((result) => {
          if (result?.status) {
            window.history.pushState(null, null, window.location.pathname);
          }
        })
        .catch((error) => {
          alert("failed payment process!");
        })
        .finally(() => {
          getOrderList();
        });
    }
  };

  useEffect(() => {
    doPayment();
    getOrderList();
  }, []);

  return (
    <AccountLayout>
      <div className="card p-4">
        <h1 className="text-lg font-semibold text-gray-400 mb-6">
          Order History
        </h1>
        <ul>
          {data?.map((item, key) =>
            item?.detail_orders?.length ? (
              <li
                key={key}
                className="block border-b border-gray-200 border-dashed mb-5 cursor-pointer py-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-600">
                      {item?.detail_orders[0]?.ticket?.hall?.concert?.title}
                    </h3>
                    <h4 className="text-sm text-gray-500">
                      {moment(item?.purchaseTime).format("DD/MM/YYYY HH:mm:ss")}
                    </h4>
                  </div>
                  <div>
                    <span
                      className={
                        item?.paymentStatus === "BELUM BAYAR"
                          ? "badge-warning"
                          : "badge-success"
                      }
                    >
                      {item?.paymentStatus}
                    </span>
                  </div>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </AccountLayout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      data: [],
    }, // will be passed to the page component as props
  };
}
