function StatCard({ title, value, color }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-xl p-8 hover:scale-105 transition duration-300">
      <h3 className="text-gray-500">{title}</h3>

      <h1 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

export default StatCard;