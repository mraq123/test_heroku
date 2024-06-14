import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { RiSpeakFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";

export const TextToSpeechComponents = () => {
  const [text, setText] = useState("");
  const [audioContent, setAudioContent] = useState(null);
  const [error, setError] = useState(null);
  const [voiceType, setVoiceType] = useState("A");
  const audioRef = useRef(null);

  // State untuk Speech-to-Text
  const [speech, setSpeech] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleVoiceTypeChange = (e) => {
    setVoiceType(e.target.value);
  };

  const handleTextToSpeech = async () => {
    const url = "https://be-node.vercel.app/api/text-to-speech";

    try {
      const response = await axios.post(url, { text, voiceType });
      setAudioContent(response.data.audioContent);
      setError(null);
    } catch (error) {
      console.error("Error converting text to speech:", error);
      setError("Error converting text to speech");
    }
  };

  const handleReset = () => {
    setText("");
    setAudioContent(null);
    setError(null);
  };

  useEffect(() => {
    if (audioContent && audioRef.current) {
      audioRef.current.play();
    }
  }, [audioContent]);

  const handleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      if ("webkitSpeechRecognition" in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "id-ID";

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " ";
            } else {
              interimTranscript += transcript;
            }
          }
          setSpeech(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event) => {
          console.error(event.error);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        alert("Browser kamu tidak mendukung Web Speech API");
        return;
      }
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const resetSpeech = () => {
    setSpeech("");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        gap: "10px",
      }}
    >
      <div style={{ width: "35%", height: "auto" }}>
        <div className="flex gap-2 mb-5">
          <div className="flex justify-center items-center">
            <BsChatText style={{ fontSize: "30px" }} />
          </div>

          <div className="flex justify-center items-center">
            <h1 className="font-bold" style={{ fontSize: "25px" }}>
              Text To Speech
            </h1>
          </div>
        </div>

        <textarea
          style={{ width: "100%", height: "150px", marginBottom: "10px" }}
          value={text}
          onChange={handleTextChange}
          placeholder="Silahkan Isi Text Pengumuman..."
        />

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <div className="">
            <label>
              <input
                type="radio"
                value="A"
                checked={voiceType === "A"}
                onChange={handleVoiceTypeChange}
              />
              Female
            </label>
          </div>

          <div className="">
            <label>
              <input
                type="radio"
                value="B"
                checked={voiceType === "B"}
                onChange={handleVoiceTypeChange}
              />
              Male
            </label>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleTextToSpeech}
          >
            CONVERT
          </button>
          <button
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleReset}
          >
            RESET
          </button>
        </div>
        {audioContent && (
          <audio ref={audioRef} controls>
            <source
              src={`data:audio/mp3;base64,${audioContent}`}
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        )}
        {error && <p>{error}</p>}
      </div>

      <div
        style={{
          width: "40%",
          height: "auto",
          display: "flex",
          paddingLeft: "20px",
          flexDirection: "column",
        }}
      >
        <div className="flex gap-2 mb-5">
          <div className="flex justify-center items-center">
            <RiSpeakFill style={{ fontSize: "30px" }} />
          </div>

          <div className="flex justify-center items-center">
            <h1 className="font-bold" style={{ fontSize: "25px" }}>
              Speech To Text
            </h1>
          </div>
        </div>

        <textarea
          style={{ width: "100%", height: "150px", marginBottom: "10px" }}
          value={speech}
          placeholder="Silahkan Bicara Untuk Mengisi Text Disini"
          readOnly
        />

        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleSpeechRecognition}
          >
            {isListening ? "Stop Listening" : "START LISTENING"}
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={resetSpeech}
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};
