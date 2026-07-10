import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRobot, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const username = localStorage.getItem("username") || "User";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const activeClass =
    "text-cyan-400 border-b-2 border-cyan-400 pb-1";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-700">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <div className="flex items-center gap-3">

          <FaRobot className="text-cyan-400 text-3xl" />

          <h1 className="text-white text-2xl font-bold">
            AI Interview Coach
          </h1>

        </div>

        <div className="flex items-center gap-8">

          <Link
            to="/dashboard"
            className={`text-white hover:text-cyan-400 transition ${
              location.pathname === "/dashboard"
                ? activeClass
                : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className={`text-white hover:text-cyan-400 transition ${
              location.pathname === "/history"
                ? activeClass
                : ""
            }`}
          >
            History
          </Link>

          <div className="flex items-center gap-2">

            <FaUserCircle className="text-cyan-400 text-3xl" />

            <span className="text-white font-semibold">
              {username}
            </span>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition hover:scale-105"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;