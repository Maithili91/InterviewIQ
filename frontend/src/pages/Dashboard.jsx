 
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import RecentInterview from "../components/RecentInterview";
import { useEffect, useState } from "react";
import api from "../services/api";
function Dashboard() {
  const [resumeText, setResumeText] = useState("");
 const [resumeName, setResumeName] = useState("");
const uploadResume = async (e) => {

    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    const res = await api.post(
        "/resume/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    setResumeText(res.data.resume);
    setResumeName(file.name);

    alert("Resume Uploaded Successfully");
};

  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const [role, setRole] = useState("Data Analyst");
  const [difficulty, setDifficulty] = useState("Medium");
  const [stats, setStats] = useState({
  completed: 0,
  average: 0,
  best: 0
});

useEffect(() => {
  loadStats();
}, []);

const loadStats = async () => {
  try {
    const userId = localStorage.getItem("user_id") || 1;

    const res = await api.get(`/dashboard/stats/${userId}`);

    setStats(res.data);

  } catch (err) {
    console.log(err);
  }
};
  return (
    <>
      <Navbar />

     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">

        <div className="max-w-7xl mx-auto p-10">

         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900 p-10 shadow-2xl">

  <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl"></div>

  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>

  <div className="relative z-10">

    <h1 className="text-5xl font-bold text-white">
      Welcome back, {username} 👋
    </h1>

    <p className="text-cyan-100 text-lg mt-4 max-w-2xl">
      Practice AI-powered interviews, improve your communication skills,
      and prepare for your dream job with personalized AI feedback.
    </p>

    <div className="flex gap-4 mt-8 flex-wrap">

      <span className="bg-white/20 px-4 py-2 rounded-full text-white">
        🤖 AI Powered
      </span>

      <span className="bg-white/20 px-4 py-2 rounded-full text-white">
        🎤 Voice Interview
      </span>

      <span className="bg-white/20 px-4 py-2 rounded-full text-white">
        📄 Resume Based
      </span>

      <span className="bg-white/20 px-4 py-2 rounded-full text-white">
        📊 Analytics
      </span>

    </div>

  </div>

</div>

          {/* Statistics */}

          <div className="grid grid-cols-3 gap-6 mt-10">

              <StatCard
              title="Interviews"
              value={stats.completed}
              color="text-cyan-500"
            />

            <StatCard
              title="Average Score"
              value={stats.average}
              color="text-green-500"
            />

            <StatCard
              title="Best Score"
              value={stats.best}
              color="text-purple-500"
            />

          </div>

          {/* Setup */}

          <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

            <h2 className="text-3xl font-bold">

              Start New Interview

            </h2>

            <div className="grid grid-cols-2 gap-6 mt-8">

              <div>

                <label className="font-semibold">

                  Job Role

                </label>

                <select
                  className="w-full border rounded-lg p-3 mt-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >

                   <option>Data Analyst</option>
                  <option>Data Scientist</option>
                  <option>Machine Learning Engineer</option>
                  <option>Python Developer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Java Developer</option>
                  <option>DevOps Engineer</option>
                  <option>Cloud Engineer</option>
                  <option>Cyber Security Analyst</option>
                  <option>Software Engineer</option>
                  <option>System Engineer</option>

                </select>

              </div>

              <div>

                <label className="font-semibold">

                  Difficulty

                </label>

                <select
                  className="w-full border rounded-lg p-3 mt-2"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >

                  <option>Easy</option>

                  <option>Medium</option>

                  <option>Hard</option>

                </select>

              </div>

            </div>
        <label className="mt-6 flex items-center justify-center w-full cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-bold shadow-lg transition duration-300 hover:scale-105">


    📄 Upload Resume

      <input
        type="file"
        accept=".pdf"
        onChange={uploadResume}
        className="hidden"
    />

         </label>
       

{resumeName && (
    <div className="mt-4 bg-green-100 border border-green-300 rounded-xl p-3 text-green-700 font-medium">
        ✅ Resume Uploaded: {resumeName}
    </div>
)}

<button
    onClick={() =>
        navigate("/interview", {
            state: {
                role,
                difficulty,
                resume: resumeText,
            },
        })
    }
    className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 hover:scale-105"
>
    🚀 Start Interview
</button>

          </div>

          {/* Bottom */}

          <div className="grid grid-cols-2 gap-6 mt-10">

            <RecentInterview />

            <div className="bg-white rounded-2xl shadow-lg p-6">

              <h2 className="text-2xl font-bold">

                AI Tips

              </h2>

              <ul className="mt-5 space-y-4">

                <li>✔ Speak confidently</li>

                <li>✔ Use STAR Method</li>

                <li>✔ Give practical examples</li>

                <li>✔ Maintain eye contact</li>

                <li>✔ Think before answering</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;