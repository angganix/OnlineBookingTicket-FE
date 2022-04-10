import { useSelector } from "react-redux";
import AccountLayout from "../../components/layouts/AccountLayout";
import Image from "next/image";
import avatarImage from "../../public/images/avatar.png";
import moment from "moment";

export default function Account() {
  const { user } = useSelector((state) => state.auth);
  return (
    <AccountLayout>
      <div className="card p-4 px-6 pb-8">
        <h1 className="text-lg font-semibold text-gray-600 mb-6">My Profile</h1>
        <div className="flex items-start gap-x-8">
          <div className="w-32">
            <div
              className="border border-gray-200 p-2 rounded-lg"
              style={{ background: "#556080" }}
            >
              <Image src={avatarImage} alt={user?.fullname} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-500">
              {user?.fullname}
            </h3>
            <h5 className="text-gray-400 text-sm mb-14">{user?.email}</h5>
            <time className="text-sm text-gray-500 block">
              Registered at{" "}
              {moment(user?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </time>
          </div>
        </div>
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
