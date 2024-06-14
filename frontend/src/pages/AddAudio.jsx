import { useEffect, useState } from "react";
import FormAddAudioComponents from "../components/FormAddAudioComponents";
// import FormAddAudio from "../components/FormAddAudioComponents";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAudio = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
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
    <Layout>
      <FormAddAudioComponents />
    </Layout>
  );
};

export default AddAudio;
