import { useEffect, useState } from "react";
import FormAddScheduleComponents from "../components/FormAddScheduleComponents";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddSchedule = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const xid = sessionStorage.getItem("id");
        if (!xid) {
          navigate("/");
        }
        const response = await axios.get("https://be-node.vercel.app/me" + xid);
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
      <FormAddScheduleComponents />
    </Layout>
  );
};

export default AddSchedule;
