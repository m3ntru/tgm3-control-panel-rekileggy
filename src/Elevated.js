import React, {useEffect, useState} from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import SmsIcon from "@material-ui/icons/Sms";
import ElevatedView from "./ElevatedView";
import moment from "moment";

export const Elevated = (props) => {
  const {client, channel} = props;
  const paramsElevated = new URLSearchParams(window.location.search).get(
    "elevated"
  );
  const [message, setMessage] = useState([
    {
      _id: "",
      twitch: "#tetristhegrandmaster3",
      emotes: null,
      username: "zatd39",
      color: "#A51F24",
      badges: {},
      message: "資料載入中",
      price: "15000",
      createdAt: "0",
    },
  ]);
  const [modalStatus, setModalStatus] = useState(false);
  const [messageView, setMessageView] = useState({
    _id: "",
    twitch: "#tetristhegrandmaster3",
    emotes: null,
    username: "zatd39",
    color: "#A51F24",
    badges: {},
    message: "資料載入中",
    price: "15000",
    createdAt: "0",
  });
  useEffect(() => {
    getMessages();
  }, []);
  const getMessages = async () => {
    await fetch("https://m3ntru-api.vercel.app/api/elevated/all/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${paramsElevated}`, // notice the Bearer before your token
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessage(data);
      })
      .catch((error) => console.error(error));
  };

  const deleteElevated = async (id) => {
    /** Fetch Channal Badge **/
    const response = await fetch(
      `https://m3ntru-api.vercel.app/api/elevated/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${paramsElevated}`, // notice the Bearer before your token
        },
      }
    );
    console.log(response);
  };

  const openModal = (data) => {
    setMessageView(data);
    setModalStatus(true);
  };

  const tdColor = ["bg-neutral-600", "bg-neutral-700"];
  return (
    <div
      className="relative bg-neutral-700 overflow-y-auto overflow-x-auto shadow-md sm:rounded-sm m-2 h-auto scrollbar-thin scrollbar-thumb-neutral-500 scrollbar-track-neutral-800"
      style={{height: "50vh"}}
    >
      <table className="text-xs w-full text-left text-neutral-600 whitespace-nowrap table-striped">
        <thead className="font-normal text-neutral-200 bg-neutral-800 sticky top-0">
          <tr>
            <th
              scope="col"
              className="font-normal text-[8px] px-2 py-0.5 w-16 sticky top-0"
            ></th>
            <th
              scope="col"
              className="font-normal text-[8px] px-2 py-0.5 w-auto sticky top-0"
            >
              Time
            </th>
            <th
              scope="col"
              className="font-normal text-[8px] px-2 py-0.5 w-auto sticky top-0"
            >
              User
            </th>
            <th
              scope="col"
              className="font-normal text-[8px] px-2 py-0.5 w-auto sticky top-0"
            >
              Price
            </th>
            <th
              scope="col"
              className="font-normal text-[8px] px-2 py-0.5 w-full sticky top-0"
            >
              Message
            </th>
          </tr>
        </thead>
        <tbody className="items-center justify-between w-full">
          {message.map((data, index) => (
            <tr className="w-full h-2">
              <td
                className={`w-16 px-2 py-2 xl:py-3 text-neutral-100 ${
                  tdColor[index % 2]
                }`}
              >
                <button
                  onClick={() => {
                    if (data._id !== "")
                      client.say(channel, `!elestart ${data._id}`);
                  }}
                >
                  <ReplayIcon style={{fontSize: "20px"}} />
                </button>
              </td>
              <td
                className={`w-auto px-2 py-2 xl:py-3 text-neutral-100 ${
                  tdColor[index % 2]
                }`}
              >
                {moment(data.createdAt).format("YYYY/MM/DD HH:mm:ss")}
              </td>
              <td
                className={`w-auto px-2 py-2 xl:py-3 text-neutral-100 ${
                  tdColor[index % 2]
                }`}
              >
                {data.username}
              </td>
              <td
                className={`w-auto px-2 py-2 xl:py-3 text-neutral-100 ${
                  tdColor[index % 2]
                }`}
              >
                ${parseInt(data.price) / 100}
              </td>
              <td
                className={`w-full px-2 py-2 xl:py-3 text-neutral-100 ${
                  tdColor[index % 2]
                }`}
              >
                <button className="mr-2" onClick={() => openModal(data)}>
                  <SmsIcon style={{fontSize: "20px"}} />
                </button>
                {data.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        onClick={() => setModalStatus(false)}
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          modalStatus
            ? "h-full flex justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-screen md:inset-0 h-modal  bg-neutral-900/75"
            : "hidden"
        }
      >
        <div className="w-[70vw] m-auto">
          <div className="relative p-8 w-auto text-white bg-white rounded-lg shadow dark:bg-neutral-700">
            <ElevatedView
              username={messageView.username}
              color={messageView.color}
              message={messageView.message}
              price={messageView.price}
              length={messageView.message.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elevated;
