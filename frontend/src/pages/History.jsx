import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {

      const userId = localStorage.getItem("user_id") || 1;

      const res = await api.get(`/history/${userId}`);

      setHistory(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-7xl mx-auto py-10">

          <h1 className="text-4xl font-bold mb-8">
            📜 Interview History
          </h1>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-slate-900 text-white">

                <tr>

                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Difficulty</th>
                  <th className="p-4 text-left">Score</th>
                  <th className="p-4 text-left">Feedback</th>

                </tr>

              </thead>

              <tbody>

                {history.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      {item.role}
                    </td>

                    <td className="p-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                        {item.difficulty}

                      </span>

                    </td>

                    <td className="p-4">

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                        ⭐ {item.score}

                      </span>

                    </td>

                    <td className="p-4">

                      {item.feedback}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {history.length === 0 && (

              <div className="text-center py-10 text-gray-500">

                No Interviews Yet

              </div>

            )}

          </div>

        </div>

      </div>

    </>
  );
}

export default History;