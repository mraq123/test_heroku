import Layout from "./Layout";
import FormEditScheduleComponents from "../components/FormEditScheduleComponents";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditSchedule = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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
      <FormEditScheduleComponents />
    </Layout>
  );
};

export default EditSchedule;
