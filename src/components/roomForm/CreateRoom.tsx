import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InfoHeader from '../../shared/InfoHeader';
import { Input, InputNumber, message } from 'antd';
import CreateRoomNumbers from '../tags/CreateRoomNumbers';
import { useLocation } from 'react-router-dom';
import { SearchInput } from '../SearchInput/SearchInput';
import { useCreateRoom } from '../../services/room';

type roomType = {
  number: number;
};

type inputs = {
  title: string;
  price: string;
  maxPeople: string;
  desc: string;
  hotelName: string;
  hotelId: string;
  roomNumbers: roomType[];
};

const CreateRoom = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<inputs>({ defaultValues: { maxPeople: '3' } });

  const Location = useLocation();
  const hotelId = Location.state;

  const { mutate: createRoom } = useCreateRoom(hotelId);

  const onSubmit: SubmitHandler<inputs> = (data) => {
    if (!hotelId) {
      return message.warning('Hotel ID Required');
    }

    const newData = { ...data, hotelId };

    createRoom(newData);
  };
  return (
    <div>
      <InfoHeader
        title="Create Room"
        description="Please Complete the form below."
      />
      <div className="p-2 bg-neutral-50 border border-t-0 mb-5">
        <SearchInput
          placeholder="Search Hotel by Name"
          style={{ width: 400 }}
        />{' '}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 max-md:grid-cols-1 max-sm:grid-cols-none max-sm:flex max-sm:flex-col gap-8"
      >
        <div className="relative flex flex-col gap-1 col-span-3">
          <label className="font-semibold">Hotel ID</label>

          <Input
            className="w-1/3"
            value={hotelId}
            placeholder="Select Hotel"
            disabled
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter Room title. ex: King Room" />
            )}
          />
          {errors.title && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.title.message
                ? errors.title.message
                : 'Please enter Room title!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Price</label>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter Room price" />
            )}
          />
          {errors.price && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.price.message
                ? errors.price.message
                : 'Please enter the Room Price!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Max People</label>
          <Controller
            name="maxPeople"
            control={control}
            // rules={{ required: true }}
            render={({ field }) => (
              <InputNumber min={1} defaultValue={3} {...field} />
            )}
          />

          {errors.maxPeople && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.maxPeople.message
                ? errors.maxPeople.message
                : 'Please enter maximum number people allowed!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Description</label>
          <Controller
            name="desc"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Room Description. ex: king size Bed, 1 Bathroom,balcony"
              />
            )}
          />
          {errors.title && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.title.message
                ? errors.title.message
                : 'Please enter Room Description!'}
            </span>
          )}
        </div>
        {/* //room numbers  */}
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Room Numbers</label>
          <Controller
            name="roomNumbers"
            control={control}
            rules={{ required: 'Please enter Room Numbers!' }}
            render={({ field }) => (
              <CreateRoomNumbers
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.roomNumbers && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs">
              {errors.roomNumbers.message}
            </span>
          )}
        </div>
        <button
          className="col-span-2 bg-green-300 w-max py-2 px-4 text-white font-bold active:scale-75 transition-all duration-200"
          type="submit"
        >
          {<p>Submit</p>}
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
