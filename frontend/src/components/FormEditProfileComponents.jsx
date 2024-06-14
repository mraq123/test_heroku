import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { MdAudiotrack } from "react-icons/md";
import { IoMan } from "react-icons/io5";

const FormEditProfileComponents = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const xid = sessionStorage.getItem("id");
        if (!xid) {
          navigate("/");
        }
        const response = await axios.get(
          "https://be-node.vercel.app/me/" + xid
        );
        setUser({ ...response.data.user, password: "", confirmPassword: "" });
        console.log(response.data);
      } catch (err) {
        setError("Error fetching user data");
        console.error("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const xid = sessionStorage.getItem("id");
      if (!xid) {
        navigate("/");
      }
      const response = await axios.patch(
        "https://be-node.vercel.app/updateprofile/" + xid,
        user
      );
      alert("Berhasil Update Profile");
      navigate("/dashboard");
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("Terjadi kesalahan saat memperbarui profil");
      console.error("Error updating profile", err);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-5">
        <div className="flex justify-center items-center">
          <IoMan style={{ fontSize: "30px" }} />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-bold" style={{ fontSize: "25px" }}>
            Edit Profile
          </h1>
        </div>
      </div>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="w-1/4 h-auto flex flex-col gap-2 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-bold">Username</label>
            <input
              className="shadow-lg h-8 border-current"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="font-bold">Email</label>
            <input
              className="shadow-lg rounded h-8 border-current rounded-lg"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="shadow-lg rounded h-8 border-current rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <label className="font-bold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="shadow-lg rounded h-8 border-current rounded-lg"
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex gap-2 mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              type="submit"
            >
              Update
            </button>
            <Link to={"/dashboard"}>
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

export default FormEditProfileComponents;
