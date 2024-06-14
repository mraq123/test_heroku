import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import { IoAccessibility } from "react-icons/io5";
import { IoMegaphoneOutline } from "react-icons/io5";
import Lottie from "lottie-react";
// import { MdOutlineVideoLibrary } from "react-icons/md";
// import { BsPlayCircle } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import Amegaphone from "../assets/animation.json";
import AText from "../assets/chart.json";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const [data, setData] = useState();
  const [getUser, setGetUser] = useState();
  const [getAudio, setGetAudio] = useState();
  const [getLibrary, setGetLibrary] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xid = sessionStorage.getItem("id");
        if (!xid) {
          navigate("/");
        }
        const response = await axios.get(
          "https://be-node.vercel.app/me/" + xid
        );
        setData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getDataUserDash = async () => {
      try {
        const response = await axios.get("https://be-node.vercel.app/users");
        setGetUser(response.data);
        // console.log(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDataUserDash();
  }, []);

  useEffect(() => {
    const getDataAudioDash = async () => {
      try {
        const response = await axios.get("https://be-node.vercel.app/audio");
        setGetAudio(response.data);
        // console.log(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDataAudioDash();
  }, []);

  useEffect(() => {
    const getDataLibraryDash = async () => {
      try {
        const response = await axios.get("https://be-node.vercel.app/schedule");
        setGetLibrary(response.data);
        // console.log(response.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDataLibraryDash();
  }, []);

  return (
    <div className="w-screen h-screen  flex flex-col gap-10">
      <div className="w-auto h-auto mt-2">
        <div className="flex gap-2 mb-2">
          <div className="flex justify-center items-center">
            <RxDashboard style={{ fontSize: "30px" }} />
          </div>

          <div className="flex justify-center items-center">
            <h1 className="font-bold" style={{ fontSize: "25px" }}>
              Dashboard,
              {data && data.user.username}
            </h1>
          </div>
        </div>

        <div className="w-full h-44 flex py-2 px-10 " style={{ gap: "7rem" }}>
          <div className="w-64 h-40 rounded-xl flex flex-col shadow-2xl">
            <div className="flex justify-center items-center py-2">
              <div className="w-20 h-20 bg-blue-500 flex justify-center items-center rounded-full">
                <IoAccessibility style={{ fontSize: "40px", color: "white" }} />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <h1 style={{ fontSize: "25px" }}>
                {getUser && getUser.length} Users
              </h1>
            </div>
          </div>
          <div className="w-64 h-40 rounded-xl flex flex-col shadow-2xl">
            <div className="flex justify-center items-center py-2">
              <div className="w-20 h-20 bg-indigo-600 flex justify-center items-center rounded-full">
                <IoMegaphoneOutline
                  style={{ fontSize: "40px", color: "white" }}
                />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <h1 style={{ fontSize: "25px" }}>
                {getAudio && getAudio.length} Audio
              </h1>
            </div>
          </div>
          <div className="w-64 h-40 rounded-xl flex flex-col shadow-2xl">
            <div className="flex justify-center items-center py-2">
              <div className="w-20 h-20 bg-green-600 flex justify-center items-center rounded-full">
                <FaCalendarDays style={{ fontSize: "40px", color: "white" }} />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <h1 style={{ fontSize: "25px" }}>
                {getLibrary && getLibrary.length} Schedule
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-2/4 flex justify-start items-center gap-15">
        <div className="mt-2 " style={{ width: "35%", marginLeft: "10px" }}>
          <Lottie animationData={Amegaphone} style={{ width: "25rem" }} />
        </div>

        <div
          className="mt-2 "
          style={{
            width: "35%",
            marginLeft: "10px",
            height: "20rem",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={AText}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
