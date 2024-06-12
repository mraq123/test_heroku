import { useNavigate } from "react-router-dom";
import { TextToSpeechComponents } from "../components/TextToSpeechComponents";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export const TextToSpeech = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioPlayed, setAudioPlayed] = useState(false);

  const GetMe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/me");
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("An error occurred during login");
      }
    }
  };

  useEffect(() => {
    GetMe();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  }, [error, navigate]);

  const handleConvert = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tts",
        { text },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "audio/mpeg" })
      );
      setAudioUrl(url);
    } catch (error) {
      console.error("Error converting text to speech:", error);
      setError("Error converting text to speech");
    }
  };

  const handleAudioPlay = () => {
    setAudioPlayed(true);
  };

  return (
    <Layout>
      <TextToSpeechComponents />
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleConvert}>Convert to Speech</button>
      {audioUrl && (
        <div>
          <audio controls onPlay={handleAudioPlay}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          {audioPlayed && (
            <a href={audioUrl} download="output.mp3">
              Download MP3
            </a>
          )}
        </div>
      )}
    </Layout>
  );
};
