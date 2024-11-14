import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const data = [
  {
    name: 'Hotels',
    total: 331,
  },
  {
    name: 'Apartments',
    total: 102,
  },

  {
    name: 'Resorts',
    total: 81,
  },
  {
    name: 'Villas',
    total: 20,
  },
  {
    name: 'Cabins',
    total: 100,
  },
  {
    name: 'Cottages',
    total: 4,
  },
  {
    name: 'Hostels',
    total: 0,
  },
];

const AreaChartContainer = ({ hotelsData }: any) => {
  return (
    <div className="w-full h-full border-2 p-4 flex flex-col gap-10 rounded-md">
      <div className="flex items-center justify-between px-10">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Hotel-Types</p>
          <p className="text-gray-400 text-xs">
            Total count of different available hotels
          </p>
        </div>

        <DatePicker onChange={onChange} />
      </div>
      {/* <Line height={40} data={data} options={options} /> */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={hotelsData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" stroke="#ccc" />
          <XAxis dataKey="type" tickCount={100} />
          <YAxis tickCount={5} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#03AC13"
            fill="#AEF359"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartContainer;
