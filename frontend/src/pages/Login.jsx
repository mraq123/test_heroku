import { useState } from "react";
import megaphone from "../assets/gambar/megaphone.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://be-node.vercel.app/login", {
        email,
        password,
      });
      console.log(response.data);
      alert("Berhasil Login");
      sessionStorage.setItem("id", response.data.id);
      navigate("/dashboard");
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

  return (
    <div
      className="w-screen h-screen items-center justify-center flex  resL"
      style={{ fontFamily: "Plus Jakarta Sans" }}
    >
      <div className="w-3/5 h-4/5 shadow-xl flex rounded-xl">
        {/* left */}
        <div
          className="w-2/4 h-full p-5 flex flex-col gap-5 items-center"
          style={{
            background:
              "linear-gradient(0deg, rgba(74,34,195,1) 0%, rgba(180,0,245,1) 100%)",
            borderRadius: "10px 0 0 10px",
          }}
        >
          <img
            src={megaphone}
            alt="megaphone"
            style={{
              height: "50%",
              width: "100%",
              backgroundSize: "cover",
              marginBottom: "20px",
            }}
          />
          <div className="mt-7">
            <h2 className="font-bold text-white">
              LOGIN SIAMI ANNOUNCER <br /> MAKING BIG THINGS AND TO EASIER{" "}
              <br /> AND MORE FUN{" "}
            </h2>
          </div>
        </div>
        {/* right */}
        <div
          className="w-2/4 h-full p-5 flex flex-col gap-5 items-center"
          style={{ borderRadius: "0 10px 10px 0" }}
        >
          <div className="w-full h-20 p-2 flex justify-center items-center">
            <h2 className="font-semibold text-2xl">Login Gets Started</h2>
          </div>
          <div className="w-full h-20 p-2 flex flex-col">
            <form onSubmit={handleLoginSubmit}>
              <div className="flex flex-col gap-2 mb-5">
                <h2 className="font-bold">Email</h2>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Masukkan email ..."
                  className="shadow-lg rounded h-8 border-current"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 mb-5 relative">
                <h2 className="font-bold">Password</h2>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  placeholder="Masukkan password ..."
                  className="shadow-lg rounded h-8 border-current pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-2 top-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {error && (
                <div className="w-full h-auto flex justify-center items-center">
                  <p className="text-red-500">{error}</p>
                </div>
              )}
              <div className="w-full h-auto flex justify-center items-center">
                <button
                  type="submit"
                  className="w-9/12 py-2 px-4 rounded text-white mt-10"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(74,34,195,1) 0%, rgba(180,0,245,1) 100%)",
                  }}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

<style>@media</style>;

export default Login;
