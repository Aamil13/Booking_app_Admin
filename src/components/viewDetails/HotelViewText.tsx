import { Skeleton } from 'antd';

type Props = {
  lable: string;
  icon: JSX.Element;
  detail: string;
  isLoading: boolean;
};

const HotelViewText = ({ lable, icon, detail, isLoading }: Props) => {
  return (
    <div>
      <label className="flex items-center gap-1">
        {' '}
        {icon} <span className=" font-semibold text-neutral-400">{lable}</span>
      </label>
      {isLoading ? (
        <Skeleton.Input active={true} size={'small'} block={true} />
      ) : (
        <h3 className="font-semibold ps-5 text-[16px]">{detail}</h3>
      )}
    </div>
  );
};

export default HotelViewText;
