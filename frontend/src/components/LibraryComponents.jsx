import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MdAudiotrack } from "react-icons/md";

const LibraryComponents = () => {
  const audioRefs = useRef([]);
  const [getLibrary, setGetLibrary] = useState();

  const getApiLibrary = async () => {
    try {
      const response = await axios.get("https://be-node.vercel.app/audio");
      setGetLibrary(response.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  useEffect(() => {
    getApiLibrary();
  }, []);

  const playAudio = (index) => {
    stopAllAudio();
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
    }
  };

  const stopAudio = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      audioRefs.current[index].currentTime = 0;
    }
  };

  const stopAllAudio = () => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const convertBufferToAudio = (buffer) => {
    const byteArray = new Uint8Array(buffer.data);
    const blob = new Blob([byteArray], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  };
  return (
    <div className="w-full h-auto">
      <div className="flex gap-2 mb-5">
        <div className="flex justify-center items-center">
          <MdAudiotrack style={{ fontSize: "30px" }} />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-bold" style={{ fontSize: "25px" }}>
            Library
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
            <th className="py-3 px-6">Audio Name Input</th>
            <th className="py-3 px-6">Keterangan Library</th>

            <th className="py-3 px-6">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {getLibrary &&
            getLibrary.map((sc, i) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-50"
                key={sc.id}
              >
                <td className="pl-12 py-10">{i + 1}</td>
                <td className="pl-10 py-3">
                  <audio controls ref={(el) => (audioRefs.current[i] = el)}>
                    <source
                      src={convertBufferToAudio(sc.audio_name_input)}
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="mt-2">
                    <a
                      href={convertBufferToAudio(sc.audio_name_input)}
                      download={`${sc.audio_name_input}.mp3`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded inline-block mt-2"
                    >
                      Download
                    </a>
                  </div>
                </td>
                <td className="pl-12 py-10 ">{sc.keterangan_audio}</td>

                <td className="pl-12 py-10">
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

export default LibraryComponents;
