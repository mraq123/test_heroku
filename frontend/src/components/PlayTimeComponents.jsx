import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRegPlayCircle } from "react-icons/fa";

const PlayTimeComponents = () => {
  const [getPlayTime, setGetPlayTime] = useState(() => {
    // Mengambil data dari local storage saat komponen dimuat
    const storedData = localStorage.getItem("playTimeData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const audioRefs = useRef([]);

  // Fungsi untuk mendapatkan jadwal dari API
  const getApiSchedule = async () => {
    try {
      const response = await axios.get("https://be-node.vercel.app/schedule");
      const data = response.data;
      setGetPlayTime(data);
      // Menyimpan data ke local storage
      localStorage.setItem("playTimeData", JSON.stringify(data));
    } catch (error) {
      console.log(error.data);
    }
  };

  // Mengambil jadwal saat komponen pertama kali dimuat
  useEffect(() => {
    getApiSchedule();
  }, []);

  // Fungsi untuk mengkonversi buffer menjadi URL audio
  const convertBufferToAudio = (buffer) => {
    const byteArray = new Uint8Array(buffer.data);
    const blob = new Blob([byteArray], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  };

  // Fungsi untuk memainkan audio
  const playAudio = (index) => {
    stopAllAudio();
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
    }
  };

  // Fungsi untuk menghentikan audio
  const stopAudio = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      audioRefs.current[index].currentTime = 0;
    }
  };

  // Fungsi untuk menghentikan semua audio
  const stopAllAudio = () => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  return (
    <div className="w-full h-auto">
      <div className="flex gap-2 mb-5">
        <div className="flex justify-center items-center">
          <FaRegPlayCircle style={{ fontSize: "30px" }} />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-bold" style={{ fontSize: "25px" }}>
            Play Time
          </h1>
        </div>
      </div>

      <table
        className="bg-white border border-gray-200 rounded-lg shadow-lg"
        style={{ width: "100%", padding: "10px" }}
      >
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">No</th>
            <th className="py-3 px-6">Jam</th>
            <th className="py-3 px-6">Keterangan Schedule</th>
            <th className="py-3 px-6">Audio Name</th>
            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {getPlayTime.map((sc, i) => (
            <tr
              className="border-b border-gray-200 hover:bg-gray-50"
              key={sc.id}
            >
              <td className="pl-12 py-10">{i + 1}</td>
              <td className="pl-10 py-10">{sc.jam}</td>
              <td className="pl-12 py-10">{sc.keterangan_schedule}</td>
              <td className="pl-10 py-3">
                <audio controls ref={(el) => (audioRefs.current[i] = el)}>
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-block mt-2"
                  >
                    Download
                  </a>
                </div>
              </td>
              <td className="pl-12 py-10 flex  pr-5">
                <button
                  onClick={() => playAudio(i)}
                  className="mr-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Play
                </button>
                <button
                  onClick={() => stopAudio(i)}
                  className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Stop
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayTimeComponents;
