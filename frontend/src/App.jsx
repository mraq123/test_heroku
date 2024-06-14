import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { TextToSpeech } from "./pages/TextToSpeech";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import { Audio } from "./pages/Audio";
import Schedule from "./pages/Schedule";
import Library from "./pages/Library";
import Playtime from "./pages/Playtime";
import AddUsers from "./pages/AddUsers";
import EditUsers from "./pages/EditUsers";
import AddAudio from "./pages/AddAudio";
import EditAudio from "./pages/EditAudio";
import AddSchedule from "./pages/AddSchedule";
import EditSchedule from "./pages/EditSchedule";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [getPlayTime, setGetPlayTime] = useState([]);

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

  useEffect(() => {
    getApiSchedule();
  }, []);

  useEffect(() => {
    if (getPlayTime.length > 1) {
      const interval = setInterval(() => {
        checkAndPlayAudio();
      }, 60000); // Memeriksa setiap menit
      return () => clearInterval(interval);
    }
  }, [getPlayTime]);

  // Fungsi untuk memeriksa dan memainkan audio jika waktunya sesuai dengan jadwal
  const checkAndPlayAudio = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    getPlayTime.forEach((sc, index) => {
      const [scheduleHour, scheduleMinute] = sc.jam.split(":").map(Number);
      if (scheduleHour === currentHour && scheduleMinute === currentMinute) {
        playAudio(index);
      }
    });
  };

  const convertBufferToAudio = (buffer) => {
    const byteArray = new Uint8Array(buffer.data);
    const blob = new Blob([byteArray], { type: "audio/mpeg" });
    return URL.createObjectURL(blob);
  };

  // Fungsi untuk memainkan audio
  const playAudio = (index) => {
    const audio = document.createElement("audio");
    audio.src = convertBufferToAudio(getPlayTime[index].audio.audio_name_input);
    audio.play();
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<TextToSpeech />} path="/texttospeech" />
            <Route element={<UsersList />} path="/users" />
            <Route element={<Audio />} path="/audio" />
            <Route element={<Schedule />} path="/schedule" />
            <Route element={<Library />} path="/library" />
            <Route element={<Playtime />} path="/playtime" />
            {/* users */}
            <Route element={<AddUsers />} path="/addusers" />
            <Route element={<EditUsers />} path="/editusers/:id" />
            {/*  */}

            {/* audio */}
            <Route element={<AddAudio />} path="/addaudio" />
            <Route element={<EditAudio />} path="/editaudio/:id" />
            {/*  */}

            {/* SCHEDULE */}
            <Route element={<AddSchedule />} path="/addschedule" />
            <Route element={<EditSchedule />} path="/editschedule/:id" />
            {/*  */}

            {/* Profile */}
            <Route element={<Profile />} path="/profile" />
            {/*  */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
