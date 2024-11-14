import AreaChart from '../charts/AreaChart';
import Cards from '../cards/Cards';
import BalanceBarChart from '../charts/BalanceBarChart';
import HotelPieChart from '../charts/HotelPieChart';
import BalanceLineChart from '../charts/BalanceLineChart';
import { useDashBoardData, useGetHotelsCount } from '../../services/dashboard';
import { Spin } from 'antd';

const DashBoard = () => {
  const { data, isFetching } = useDashBoardData();
  const { data: hotelsData } = useGetHotelsCount();

  return (
    <div className="flex flex-col gap-4 h-max">
      <div className="flex flex-wrap gap-4 w-full xl:justify-between justify-center">
        <Cards
          title={'Total Income'}
          sum={data?.totalIncome || 0}
          lastmonthsum={10}
          isRs={true}
        />
        <Cards title={'Total Users'} sum={data?.totalUsers} lastmonthsum={10} />
        <Cards title={'Total Hotels'} sum={20} lastmonthsum={10} />
        <Cards
          title={'Profits this month'}
          sum={data?.totalMonthlyIncome || 0}
          lastmonthsum={100}
        />
      </div>
      {isFetching ? (
        <div className="h-96 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="h-[510px]  w-full">
            <AreaChart hotelsData={hotelsData} />
          </div>
          <div className="h-[510px] max-md:h-[1120px]  w-full flex max-md:flex-col justify-between gap-2">
            <BalanceBarChart dailyIncomeArray={data?.dailyIncomeArray} />
            <HotelPieChart hotelsData={hotelsData} />
          </div>
          <div className="h-[510px]  w-full">
            <BalanceLineChart data={data?.totalMonthlyIncomeForYear} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
