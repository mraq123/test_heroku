import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const GetMe = async () => {
    try {
      const xid = sessionStorage.getItem("id");
      if (!xid) {
        navigate("/");
      }
      const response = await axios.get("https://be-node.vercel.app/me/" + xid);
      setUser(response.data);
      // console.log("NAVBAR", response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    GetMe();
  }, []);

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow pl-10 pr-10"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <div className="navbar-item">
            <BsFillMegaphoneFill style={{ width: "5rem", height: "100%" }} />
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              {user ? (
                <div className="navbar-item flex gap-2">
                  <h1>{user.user.email}</h1>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
