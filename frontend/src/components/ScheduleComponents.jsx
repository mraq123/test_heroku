import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineSchedule } from "react-icons/ai";

const ScheduleComponents = () => {
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState("");
  const [userData, setUserData] = useState(null);
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
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Navigate if user's role is user
    if (userData && userData.user.role === "user") {
      navigate("/dashboard");
    }
  }, [userData, navigate]);

  const scheduleList = async () => {
    try {
      const response = await axios.get("https://be-node.vercel.app/schedule");
      setSchedule(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    scheduleList();
  }, []);

  const convertBufferToAudio = (buffer) => {
    // Konversi buffer ke Uint8Array
    const byteArray = new Uint8Array(buffer.data);
    // console.log(byteArray);
    // Buat Blob dari Uint8Array
    const blob = new Blob([byteArray], { type: "audio/mpeg" });

    // Buat URL dari Blob
    return URL.createObjectURL(blob);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Apakah kamu ingin menghapus Schedule?");
    if (isConfirmed) {
      try {
        await axios.delete(`https://be-node.vercel.app/schedule/${id}`);

        setSchedule(schedule.filter((sc) => sc.id !== id));

        window.location.reload();
      } catch (error) {
        console.log(error);
        setError("Terjadi kesalahan saat menghapus jadwal");
      }
    }
  };

  return (
    <div className=" w-full h-auto">
      <div className="flex gap-2">
        <div className="flex justify-center items-center">
          <AiOutlineSchedule style={{ fontSize: "30px" }} />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-bold" style={{ fontSize: "25px" }}>
            Schedule
          </h1>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-5">
        <div className="">
          <Link to={"/addschedule"}>
            <button className="mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-5">
              Add New
            </button>
          </Link>
        </div>

        {error && <div className="text-red-500 mt-2">Error: {error}</div>}
        <table
          className=" bg-white border border-gray-200 rounded-lg shadow-lg"
          style={{ width: "99%", padding: "10px" }}
        >
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">No</th>
              <th className="py-3 px-6">Jam</th>
              <th className="py-3 px-6">Keterangan Schedule</th>
              <th className="py-3 px-6">Audio Name</th>
              <th className="py-3 px-6">Keterangan Audio Name</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 ">
            {schedule &&
              schedule.map((sc, i) => {
                return (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-50  "
                    key={sc.id}
                  >
                    <td className="pl-12 py-10">{i + 1}</td>
                    <td className="pl-10 py-10">{sc.jam}</td>
                    <td className="pl-12 py-10">{sc.keterangan_schedule}</td>
                    <td className="pl-10 py-3 items-center ">
                      <audio controls>
                        <source
                          src={convertBufferToAudio(sc.audio.audio_name_input)}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                      <div className="mt-2">
                        <a
                          href={convertBufferToAudio(sc.audio.audio_name_input)}
                          download={`${sc.audio.audio_name_input}.mp3`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                        >
                          Download
                        </a>
                      </div>
                    </td>
                    <td className="pl-10 py-10">{sc.audio.keterangan_audio}</td>
                    <td className="flex gap-2 py-10 pr-2">
                      <Link to={`/editschedule/${sc.id}`}>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        onClick={() => handleDelete(sc.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleComponents;
