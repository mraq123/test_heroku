import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FormAddAudioComponents = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [keteranganAudio, setKeteranganAudio] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddAudio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio_name_input", audioFile);
    formData.append("keterangan_audio", keteranganAudio);

    try {
      const response = await axios.post(
        "http://localhost:5000/audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Berhasil tambah audio");
      navigate("/audio");
    } catch (error) {
      console.error(error);
      setError("Failed to add audio");
    }
  };

  return (
    <div className="w-auto h-auto flex flex-col ">
      <div className="w-auto h-auto">
        <div className="title">ADD AUDIO</div>
      </div>

      <div className="w-1/4 h-auto flex flex-col  mt-5">
        <form onSubmit={handleAddAudio}>
          <div className="flex flex-col ">
            <h2 className="font-bold">Audio Name</h2>
            <input
              type="file"
              name="file"
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="shadow-lg h-8 border-current"
              required
            />
          </div>

          <div className="flex flex-col  mt-3">
            <h2 className="font-bold">Keterangan Audio</h2>
            <input
              type="text"
              name="keterangan"
              value={keteranganAudio}
              onChange={(e) => setKeteranganAudio(e.target.value)}
              className="shadow-lg rounded h-8 border-current rounded-lg"
              placeholder="Masukkan Keterangan ..."
              required
            />
          </div>

          <div className="flex gap-2 mt-5 ">
            {error && <div className="text-red-500 mt-3">{error}</div>}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              type="submit"
            >
              Save
            </button>
            <Link to={"/audio"}>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddAudioComponents;
