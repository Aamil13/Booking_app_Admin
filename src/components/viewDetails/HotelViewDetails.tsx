import { FaHotel } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import HotelViewText from './HotelViewText';
import { BsTextCenter } from 'react-icons/bs';
import { MdBedroomChild } from 'react-icons/md';
import { MdMore } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';

type HotelViewType = {
  title: string;
  name: string;
  cheapestPrice: number;
  city: string;
  desc: string;
  distance: string;
  type: string;
  _id: string;
  featured: boolean;
  address: string;
  rooms: string[];
  rating: number;
};

type Props = {
  data: HotelViewType | undefined;
  isLoading: boolean;
};

const HotelViewDetails = ({ data, isLoading }: Props) => {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <HotelViewText
        lable="Hotel Title"
        detail={data?.name || ''}
        icon={<FaHotel className="text-neutral-400" />}
        isLoading={isLoading}
      />
      <HotelViewText
        lable="Hotel Description"
        detail={data?.desc || ''}
        icon={<BsTextCenter className="text-neutral-400" />}
        isLoading={isLoading}
      />
      <HotelViewText
        lable="Location"
        detail={
          data?.address +
          '-' +
          data?.city +
          ', ' +
          data?.distance +
          ' meter from Station'
        }
        icon={<FaLocationDot className="text-neutral-400" />}
        isLoading={isLoading}
      />

      <HotelViewText
        lable="Type"
        detail={data?.type || ''}
        icon={<MdMore className="text-neutral-400" />}
        isLoading={isLoading}
      />
      <HotelViewText
        lable="Price"
        detail={data?.cheapestPrice.toString() || ''}
        icon={<FaRupeeSign className="text-neutral-400" />}
        isLoading={isLoading}
      />
      <div>
        <label className="flex items-center gap-1">
          <MdBedroomChild className="text-neutral-400" />
          <span className=" font-semibold text-neutral-400">Rooms</span>
        </label>
        {data?.rooms.length ? (
          <div className="flex ">
            {data?.rooms.map((item, idx) => (
              <h3 key={item} className="font-bold ps-5 cursor-pointer">
                {idx + 1}Room
              </h3>
            ))}
          </div>
        ) : (
          <h3 className="font-bold ps-5"> 'No rooms Yet!'</h3>
        )}
      </div>
    </div>
  );
};

export default HotelViewDetails;
