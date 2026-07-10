import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
 

function Interview() {
  const location = useLocation();
  const resume = location.state?.resume || "";
  const role = location.state?.role || "Data Analyst";
  const difficulty = location.state?.difficulty || "Medium";

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const speakQuestion = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  };

  const generateQuestion = async () => {
    try {
      setLoading(true);

      const res = await api.post("/interview/question", {
        role,
        difficulty,
        resume
      });

      setQuestion(res.data.question);

      speakQuestion(res.data.question);
    } catch (err) {
      console.log(err);
      alert("Unable to generate question.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setAnswer(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  const submitAnswer = async () => {
    if (answer.trim() === "") {
      alert("Please enter your answer.");
      return;
    }

    try {
      const res = await api.post("/interview/submit", {
        user_id: Number(localStorage.getItem("user_id")),
        role,
        difficulty,
        answer,
      });

      setResult(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to submit answer.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center p-8">

      <div className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl p-10">

        <h1 className="text-4xl font-bold text-cyan-400">
          🤖 AI Interview Coach
        </h1>

        <div className="flex gap-3 mt-5">

          <span className="bg-cyan-500 text-white px-4 py-2 rounded-full">
            {role}
          </span>

          <span className="bg-purple-500 text-white px-4 py-2 rounded-full">
            {difficulty}
          </span>

        </div>

        <div className="bg-slate-700 rounded-2xl p-6 mt-8">

          <h2 className="text-white text-2xl font-semibold">
            Interview Question
          </h2>

          <p className="text-gray-200 mt-5 text-lg">

            {loading ? "Generating Question..." : question}

          </p>

        </div>

        <textarea
          rows={7}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type or Speak your answer..."
          className="w-full mt-8 bg-slate-700 text-white rounded-2xl p-5 outline-none"
        />

        <div className="flex gap-4 mt-6 flex-wrap">

          <button
            onClick={startListening}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            {listening ? "🎤 Listening..." : "🎙 Speak"}
          </button>

          <button
            onClick={() => speakQuestion(question)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            🔊 Read Question
          </button>

          <button
            onClick={submitAnswer}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            ✅ Submit Answer
          </button>

          <button
            onClick={() => {
              setAnswer("");
              setResult(null);
              generateQuestion();
            }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            🔄 Next Question
          </button>

        </div>

        {result && (

          <div className="bg-slate-700 rounded-2xl p-6 mt-8">

            <h2 className="text-green-400 text-3xl font-bold">
              ⭐ Score : {result.score}/10
            </h2>

            <div className="text-white whitespace-pre-wrap mt-5">

              {result.feedback}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Interview;