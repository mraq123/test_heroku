import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsMegaphoneFill } from "react-icons/bs";

export const AudioComponents = () => {
  const [getAudio, setAudio] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getAllDataudio = async () => {
    try {
      const response = await axios.get("https://be-node.vercel.app/audio"); // Ganti URL sesuai dengan endpoint backend Anda
      setAudio(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  useEffect(() => {
    getAllDataudio();
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

  const handleDeleteAudio = async (audioId) => {
    const isConfirmed = window.confirm("Apakah kamu ingin menghapus audio?");
    if (isConfirmed) {
      try {
        await axios.delete(`https://be-node.vercel.app/audio/${audioId}`);
        getAllDataudio();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

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

  return (
    <div className=" w-full h-auto">
      <div className="flex gap-2">
        <div className="flex justify-center items-center">
          <BsMegaphoneFill style={{ fontSize: "30px" }} />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-bold" style={{ fontSize: "25px" }}>
            Audio
          </h1>
        </div>
      </div>
      <div className=" h-auto flex flex-col gap-5">
        <div className="">
          <Link to={"/addaudio"}>
            <button className="mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-5">
              Add New
            </button>
          </Link>
        </div>

        <table
          className=" bg-white border border-gray-200 rounded-lg shadow-lg"
          style={{ width: "99%", padding: "10px", height: "auto" }}
        >
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 ">No</th>
              <th className="py-3 px-6 ">Audio Name File</th>
              <th className="py-3 px-6 ">Keterangan Audio</th>
              <th className="py-3 px-6 ">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 ">
            {getAudio.map((audio, index) => (
              <tr
                key={audio.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="pl-12 py-10 ">{index + 1}</td>
                <td className=" pl-12 py-3 items-center">
                  <audio controls>
                    <source
                      src={convertBufferToAudio(audio.audio_name_input)}
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="mt-2">
                    <a
                      href={convertBufferToAudio(audio.audio_name_input)}
                      download={`${audio.audio_name_input}.mp3`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
                    >
                      Download
                    </a>
                  </div>
                </td>
                <td className="pl-12 py-10 ">{audio.keterangan_audio}</td>
                <td className="flex gap-2 absolute mt-10">
                  <Link to={`/editaudio/${audio.id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => handleDeleteAudio(audio.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
