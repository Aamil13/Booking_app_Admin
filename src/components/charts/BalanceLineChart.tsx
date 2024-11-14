import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { DatePickerProps } from 'antd';

import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

// const data = [
//   {
//     month: 'Jan',
//     total: 331,
//   },
//   {
//     month: 'Feb',
//     total: 102,
//   },

//   {
//     month: 'March',
//     total: 81,
//   },
//   {
//     month: 'April',
//     total: 20,
//   },
//   {
//     month: 'May',
//     total: 100,
//   },
//   {
//     month: 'June',
//     total: 4,
//   },
//   {
//     month: 'July',
//     total: 0,
//   },
//   {
//     month: 'Aug',
//     total: 0,
//   },
//   {
//     month: 'Sep',
//     total: 0,
//   },
//   {
//     month: 'Oct',
//     total: 0,
//   },
//   {
//     month: 'Nov',
//     total: 0,
//   },
//   {
//     month: 'Dec',
//     total: 100,
//   },
// ];

const BalanceLineChart = ({ data }: any) => {
  return (
    <div className="w-full h-full border-2 p-4  flex flex-col gap-10 rounded-md">
      <div className="flex items-center justify-between px-10">
        <div className="flex justify-between gap-1">
          <p className="text-xl font-semibold"> Balance</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-gray-900  font-semibold">₹120340</p>

          <span className="flex items-center bg-green-300 px-3 py-2 rounded-lg text-xs">
            <FaArrowUp />
            10%
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="month" tickCount={5} />
          <YAxis tickCount={4} />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type="linear"
            dataKey="total"
            stroke="#AEF359"
            strokeWidth={5}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceLineChart;
