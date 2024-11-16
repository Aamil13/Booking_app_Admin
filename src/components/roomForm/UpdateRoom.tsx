import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import InfoHeader from '../../shared/InfoHeader';
import { Input, InputNumber } from 'antd';
import CreateRoomNumbers from '../tags/CreateRoomNumbers';

import { useGetRoom, useUpdateRoom } from '../../services/room';

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

const UpdateRoom = () => {
  const location = useLocation();
  const roomState = location?.state || [];
  const { data: roomData } = useGetRoom(roomState[0]?.roomId);

  const { mutate: updateRoom } = useUpdateRoom();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<inputs>({
    defaultValues: {
      maxPeople: roomData?.maxPeople,
      desc: roomData?.desc,
      title: roomData?.title,
      price: roomData?.price,
      roomNumbers: roomData?.roomNumbers,
    },
  });

  useEffect(() => {
    if (roomData) {
      setValue('maxPeople', roomData?.maxPeople);
      setValue('desc', roomData?.desc);
      setValue('title', roomData?.title);
      setValue('roomNumbers', roomData?.roomNumbers);
      setValue('price', roomData?.price);
    }
  }, [roomData, setValue]);

  const onSubmit: SubmitHandler<inputs> = (data) => {
    console.log(data);

    updateRoom({ roomId: roomState[0]?.roomId, data });
  };

  return (
    <div>
      <InfoHeader
        title="Update Room"
        description="Please Complete the form below."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 max-md:grid-cols-1 max-sm:grid-cols-none max-sm:flex max-sm:flex-col gap-8"
      >
        <div className="relative flex flex-col gap-1 col-span-3">
          <label className="font-semibold">Room ID</label>

          <Input
            className="w-1/3"
            value={roomState[0]?.roomId}
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

export default UpdateRoom;
