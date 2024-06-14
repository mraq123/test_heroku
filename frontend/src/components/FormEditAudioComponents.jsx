import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormEditAudioComponents = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [audioName, setAudioName] = useState(null);
  const [keteranganAudio, setKeteranganAudio] = useState("");

  useEffect(() => {
    const getAudioById = async () => {
      try {
        const response = await axios.get(
          `https://be-node.vercel.app/audio/${id}`
        );
        console.log(response.data);
        setAudioName(response.data.audio);
        setKeteranganAudio(response.data.keteranganAudio);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
    };
    getAudioById();
  }, [id]);

  const handleAudioChange = (e) => {
    setAudioName(e.target.files[0]);
  };

  const handleEditAudio = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("audio_name_input", audioName); // Ensure this matches the backend key
    formData.append("keterangan_audio", keteranganAudio); // Ensure this matches the backend key

    try {
      await axios.patch(`https://be-node.vercel.app/audio/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Berhasil Update Audio");
      navigate("/audio");
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full h-auto flex flex-col">
      <div className="w-full h-auto">
        <div className="title">EDIT AUDIO</div>
      </div>

      <div className="w-1/4 h-auto flex flex-col gap-2 mt-5">
        <form onSubmit={handleEditAudio}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Audio Name</h2>
            <input
              type="file"
              name="audio" // Ensure this matches the backend key
              onChange={handleAudioChange}
              className="shadow-lg h-8 border-current"
            />
            {audioName && <span>{audioName.name}</span>}
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <h2 className="font-bold">Keterangan Audio</h2>
            <input
              type="text"
              name="keterangan_audio"
              value={keteranganAudio}
              onChange={(e) => setKeteranganAudio(e.target.value)}
              className="shadow-lg rounded h-8 border-current rounded-lg"
              placeholder="Masukkan Keterangan ..."
            />
          </div>

          <div className="flex gap-2 mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              type="submit"
            >
              Update
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

export default FormEditAudioComponents;
