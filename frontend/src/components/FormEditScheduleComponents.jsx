import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FormEditScheduleComponents() {
  const [inputAudio, setAudio] = useState([]);
  const [time, setTime] = useState("");
  const [keteranganSchedule, setKeteranganSchedule] = useState("");
  const [audioId, setAudioId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the schedule ID from URL params

  const getDataAudioName = async () => {
    try {
      const response = await axios.get("https://be-node.vercel.app/audio");
      setAudio(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getScheduleById = async (id) => {
    try {
      const response = await axios.get(
        `https://be-node.vercel.app/schedule/${id}`
      );
      const schedule = response.data;
      setTime(schedule.jam);
      setKeteranganSchedule(schedule.keterangan_schedule);
      setAudioId(schedule.audioId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataAudioName();
    if (id) {
      getScheduleById(id); // Load schedule data if editing
    }
  }, [id]);

  const handleEditSchedule = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const scheduleData = {
        jam: time,
        keterangan_schedule: keteranganSchedule,
        audioId,
      };

      // Update existing schedule
      await axios.patch(
        `https://be-node.vercel.app/schedule/${id}`,
        scheduleData
      );
      alert("Berhasil Edit Schedule");
      navigate("/schedule");
      window.location.reload();
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="w-full h-auto flex flex-col">
      <div className="w-full h-auto">
        <div className="title">UPDATE SCHEDULE</div>
      </div>

      <div className="w-1/4 h-auto flex flex-col gap-2 mt-5">
        <form onSubmit={handleEditSchedule}>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Jam</h2>
            <input
              type="time"
              name="time"
              required
              className="shadow-lg rounded h-8 border-current rounded-lg"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <h2 className="font-bold">Keterangan Jadwal</h2>
            <input
              type="text"
              name="keterangan_schedule"
              required
              className="shadow-lg rounded h-8 border-current rounded-lg"
              value={keteranganSchedule}
              onChange={(e) => setKeteranganSchedule(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <h2 className="font-bold">Nama Audio</h2>
            <select
              className="shadow-lg rounded h-8 border-current rounded-lg"
              style={{ backgroundColor: "white" }}
              required
              value={audioId}
              onChange={(e) => setAudioId(e.target.value)}
            >
              <option value="">Pilih Audio</option>
              {inputAudio &&
                inputAudio.map((a, i) => (
                  <option key={i} value={a.id}>
                    {a.keterangan_audio}
                  </option>
                ))}
            </select>
          </div>

          {error && <div className="text-red-500 mt-2">Error: {error}</div>}

          <div className="flex gap-2 mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              type="submit"
            >
              Update
            </button>
            <Link to={"/schedule"}>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                Batal
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormEditScheduleComponents;
