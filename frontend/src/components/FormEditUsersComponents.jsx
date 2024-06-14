import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormEditUsersComponents = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUsersById = async () => {
      try {
        const response = await axios.get(
          `https://be-node.vercel.app/users/${id}`
        );
        setUsername(response.data.username);
        setEmail(response.data.email);

        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUsersById();
  }, [id]);

  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        email,
        password,
        confirmPassword,
        role,
      };
      await axios.patch(`https://be-node.vercel.app/users/${id}`, userData);
      alert("Berhasil Update User");
      navigate("/users");
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="w-full h-auto flex flex-col ">
        <div className="w-full h-auto">
          <div className="title">EDIT USERS</div>
        </div>

        <div className="w-1/4 h-auto flex flex-col gap-2 mt-5">
          <form onSubmit={UpdateUser}>
            {msg && <div className="text-red-500 mb-4">{msg}</div>}
            <div className="flex flex-col gap-2">
              <h2 className="font-bold">UserName</h2>
              <input
                type="text"
                name="username"
                className="shadow-lg rounded h-8 border-current rounded-lg"
                placeholder="Masukkan Username ..."
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="font-bold">Email</h2>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email ..."
                className="shadow-lg rounded h-8 border-current	rounded-lg	"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="font-bold">Password</h2>
              <input
                type="password"
                name="password"
                className="shadow-lg rounded h-8 border-current	rounded-lg"
                placeholder="Masukkan Password ..."
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="font-bold">Confirm Password</h2>
              <input
                type="password"
                name="confirmPass"
                className="shadow-lg rounded h-8 border-current	rounded-lg"
                placeholder="Ulangi Password ..."
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="font-bold">Role</h2>
              <select
                className="shadow-lg rounded h-8 border-current	rounded-lg "
                style={{ backgroundColor: "white" }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="flex gap-2 mt-5 ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                type="submit"
              >
                Update
              </button>
              <Link to={"/users"}>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                  type="submit"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormEditUsersComponents;
