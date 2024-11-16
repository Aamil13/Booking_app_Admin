import {
  Bar,
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const BalanceBarChart = ({ dailyIncomeArray }: any) => {
  return (
    <div className="w-full h-full border-2 p-4 flex flex-col gap-10 rounded-md">
      <div className="flex items-center justify-between px-10">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Total Cumulative Balance</p>
          <p className="text-gray-400 text-lg font-semibold">₹ 120340</p>
        </div>

        <DatePicker onChange={onChange} picker="week" />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={dailyIncomeArray}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis type="number" />
          <YAxis dataKey="date" type="category" scale="auto" />
          <Tooltip />
          {/* <Legend />/ */}

          <Bar dataKey="total" barSize={30} fill="#AEF359" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceBarChart;
