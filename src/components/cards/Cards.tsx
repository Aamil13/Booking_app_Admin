import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
type Props = {
  title: string;
  sum: number;
  lastmonthsum: number;
  isRs?: boolean;
};

const Cards = ({ title, sum, lastmonthsum, isRs }: Props) => {
  return (
    <div className="border-2 py-3 px-6 rounded-lg ">
      <h3 className="text-sm font-bold text-gray-500">{title}</h3>
      <h5 className="font-bold text-2xl">{isRs ? '₹' + sum : sum}</h5>
      <p className="flex gap-2 items-center text-xs">
        {sum > lastmonthsum ? (
          <span className="flex items-center bg-green-300 px-2 py-1 rounded-lg text-xs">
            <FaArrowUp />
            {lastmonthsum}%
          </span>
        ) : (
          <span className="flex items-center bg-red-300 px-2 py-1 rounded-lg text-xs">
            <FaArrowDown />
            {lastmonthsum}%
          </span>
        )}
        Compared to last month
      </p>
    </div>
  );
};

export default Cards;
