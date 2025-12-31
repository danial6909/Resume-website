export default function StatsGrid({ stats, color }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col">
          <span className="text-3xl font-bold" style={{ color }}>{stat.number}</span>
          <span className="text-text-muted text-sm mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}