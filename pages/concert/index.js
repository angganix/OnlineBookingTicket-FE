import Head from "next/head";
import { getRequest } from "../../utils/api";
import Main from "../../components/layouts/Main";
import Link from "next/link";
import moment from "moment";

export const countQuota = (item) => {
  let total = 0;
  if (item) {
    item?.forEach((hall) => {
      total += hall?.quota;
    });
  }
  return total;
};

export const countSold = (item) => {
  let total = 0;
  if (item) {
    item?.forEach((hall) => {
      if (hall?.tickets) {
        const soldTickets = hall?.tickets?.filter((ticket) => ticket?.sold);
        total += soldTickets?.length;
      }
    });
  }
  return total;
};

export default function Concert({ data }) {
  return (
    <Main>
      <Head>
        <title>Concert List</title>
        <meta name="description" content="Daftar konser di istora senayan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-16 py-8">
        <h1 className="text-2xl block mb-6 font-semibold text-gray-500">
          Daftar Konser
        </h1>
        <div className="grid grid-cols-4 gap-x-4">
          {data?.data?.map((item, key) => (
            <Link href={`/concert/${item?.id}`} key={key}>
              <div className="card p-4 cursor-pointer floating-card-animation">
                <span className="badge-primary">
                  {countQuota(item?.halls)} Tickets
                </span>
                <h2 className="text-xl font-bold text-gray-600 mt-2">
                  {item?.title}
                </h2>
                <p className="text-sm mt-1 mb-4">{item?.description}</p>
                <div className="flex justify-between items-center">
                  <time className="text-sm text-gray-500">
                    {moment(item?.time).format("DD/MM/YY HH:mm:ss")}
                  </time>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="badge-warning">
                    {countSold(item?.halls)} Sold
                  </span>
                  <span className="badge-success">
                    {countQuota(item?.halls) - countSold(item?.halls)} Available
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Main>
  );
}

export async function getServerSideProps(context) {
  const concertData = await getRequest("/concert")
    .then((result) => {
      if (result?.data) {
        return result;
      }
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
  return {
    props: {
      data: concertData,
    }, // will be passed to the page component as props
  };
}
