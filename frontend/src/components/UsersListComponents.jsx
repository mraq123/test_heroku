import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";

const UsersListComponents = () => {
  const [getUsers, setGetUsers] = useState();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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

  // get data
  const userList = async () => {
    try {
      const response = await axios.get("https://be-node.vercel.app/users");
      setGetUsers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    userList();
  }, []);

  // delete button
  const deleteProduct = async (userId) => {
    const isConfirmed = window.confirm("Apakah kamu ingin menghapus user?");
    if (isConfirmed) {
      try {
        await axios.delete(`https://be-node.vercel.app/users/${userId}`);
        userList();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="w-full h-auto flex flex-col ">
      <div className="flex gap-2">
        <div className="flex justify-center items-center">
          <FaUser style={{ fontSize: "30px" }} />
        </div>

        <div className="flex justify-center items-center">
          <h1 className="font-bold" style={{ fontSize: "25px" }}>
            Users
          </h1>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-5">
        <div className="">
          <Link to={"/addusers"}>
            <button className="mr-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-5">
              Add New
            </button>{" "}
          </Link>
        </div>

        <table
          className=" bg-white border border-gray-200 rounded-lg shadow-lg"
          style={{ width: "99%" }}
        >
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">No</th>
              <th className="py-3 px-6">UserName</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 ">
            {getUsers &&
              getUsers.map((user, i) => {
                return (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-50"
                    key={user.id}
                  >
                    <td className="py-3 px-6 text-left">{i + 1}</td>
                    <td className="py-3 px-6 text-left">{user.username}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="flex gap-2 mt-2">
                      <Link to={`/editusers/${user.id}`}>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        onClick={() => deleteProduct(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersListComponents;
