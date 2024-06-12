import { useEffect, useState } from "react";
import FormAddAudioComponents from "../components/FormAddAudioComponents";
// import FormAddAudio from "../components/FormAddAudioComponents";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAudio = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/me");
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
  });

  return (
    <Layout>
      <FormAddAudioComponents />
    </Layout>
  );
};

export default AddAudio;