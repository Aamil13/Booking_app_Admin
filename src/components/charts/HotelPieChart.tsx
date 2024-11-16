import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const HotelPieChart = ({ hotelsData }: any) => {
  return (
    <div className="w-full h-full border-2 p-4 flex flex-col gap-10 rounded-md">
      <div className="flex items-center justify-between px-10">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Hotel Type Distribution</p>
          {/* <p className="text-gray-400 text-xs">Total Cumulative Balance</p> */}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={hotelsData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="type" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="count"
            stroke="#03AC13"
            fill="#AEF359"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HotelPieChart;
