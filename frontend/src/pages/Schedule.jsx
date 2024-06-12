import { useNavigate } from "react-router-dom";
import ScheduleComponents from "../components/ScheduleComponents";
import Layout from "./Layout";
import axios from "axios";
import { useEffect, useState } from "react";

const Schedule = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const GetMe = async () => {
    try {
      const response = await axios.get("http://localhost:5000/me");
      // console.log(response.data);
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
      <ScheduleComponents />
    </Layout>
  );
};

export default Schedule;
