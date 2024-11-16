import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InfoHeader from '../../shared/InfoHeader';
import { Input, Select } from 'antd';
import { InputNumber } from 'antd';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { hotelType } from '../../shared/constsData';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Image } from 'antd';
import {
  useDeleteHotelPhoto,
  useGetHotel,
  useUpdateHotel,
} from '../../services/hotel';
import { Spin } from 'antd';

type Inputs = {
  name: string;
  type: string;
  featured: boolean;
  rating: number;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  rooms: string[];
  title: string;
  desc: string;
  cheapestPrice: number;
};

import { useLocation } from 'react-router-dom';
import { SearchInput } from '../SearchInput/SearchInput';

const UpdateHotel = () => {
  const Location = useLocation();

  const hotelId = Location.state;

  const { data: singleHotelData } = useGetHotel(hotelId, !!hotelId);
  const { mutate: deleteHotelImage } = useDeleteHotelPhoto();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      featured: singleHotelData?.featured,
      type: singleHotelData?.type,
      name: singleHotelData?.name,
      address: singleHotelData?.address,
      cheapestPrice: singleHotelData?.cheapestPrice,
      city: singleHotelData?.city,
      desc: singleHotelData?.desc,
      distance: singleHotelData?.distance,
      photos: singleHotelData?.photos,
      rating: singleHotelData?.rating,
      rooms: singleHotelData?.rooms,
      title: singleHotelData?.title,
    },
  });
  const ratingValue = getValues('rating');
  const [rating, setRating] = useState(ratingValue || 0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const { mutate: updateHotel, isPending } = useUpdateHotel();

  useEffect(() => {
    if (singleHotelData) {
      setValue('featured', singleHotelData.featured);
      setValue('type', singleHotelData.type);
      setValue('name', singleHotelData.name);
      setValue('address', singleHotelData.address);
      setValue('cheapestPrice', singleHotelData.cheapestPrice);
      setValue('city', singleHotelData.city);
      setValue('desc', singleHotelData.desc);
      setValue('distance', singleHotelData.distance);
      setValue('photos', singleHotelData.photos);
      setValue('rating', singleHotelData.rating || 0);
      setValue('rooms', singleHotelData.rooms);
      setValue('title', singleHotelData.title);
      setRating(singleHotelData.rating);
    }
  }, [singleHotelData, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();

    // return console.log('Data', data, hotelId);

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Append files to FormData
    selectedFiles.forEach((file) => {
      formData.append('files', file); // Field name should match multer setup
    });

    // Append rating to FormData
    // console.log(rating);

    // formData.append('rating', rating.toString());
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    updateHotel({ formData, id: hotelId });
  };

  const handleStarClick = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || []);
  //   setSelectedFiles(files);
  //   // setValue('photos', files);
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  // const getFileURL = (item: File | string) => {
  //   if (item instanceof File) {
  //     return URL.createObjectURL(item);
  //   }
  //   return item;
  // };

  const getFileURL = (file: File | string) => {
    if (typeof file === 'string') {
      // API image URL
      return file;
    }
    // Local file
    return URL.createObjectURL(file);
  };

  // const handleImgDelete = (item: { name: string }) => {
  //   setSelectedFiles(selectedFiles.filter((img) => img.name !== item.name));
  // };

  const handleImgDelete = (item: { name: string }, index: any) => {
    if (typeof item === 'string') {
      const data = {
        imageUrl: item,
        publicId: singleHotelData?.photoPublicIds[index],
        hotelId: singleHotelData?._id,
      };
      deleteHotelImage(data);
    } else {
      setSelectedFiles(selectedFiles.filter((file) => file.name !== item.name));
    }
  };

  const handleSeeMoreClick = (idx: number) => {
    setPreviewIndex(idx);
    setPreviewVisible(true);
  };

  const allImages: any = [
    ...(singleHotelData?.photos
      ? singleHotelData.photos.map((url) => ({ type: 'api', url }))
      : []),
    ...selectedFiles.map((file) => ({ type: 'local', file })),
  ];

  console.log('sele', allImages);

  return (
    <div>
      <InfoHeader
        title="Update Hotel"
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
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Name</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.name.message
                ? errors.name.message
                : 'Please enter your Name!'}
            </span>
          )}
        </div>

        {/* //2 in one  */}
        <div className="flex gap-10">
          <div className="relative flex flex-col gap-1">
            <label className="font-semibold">Type</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={Object.values(hotelType)[0]}
                  style={{ width: 120 }}
                  {...field}
                  options={Object.keys(hotelType)
                    .filter((v) => isNaN(Number(v)))
                    .map((item) => ({
                      value: item,
                      label: item.toUpperCase(),
                    }))}
                />
              )}
            />
            {errors.type && (
              <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
                {errors.type.message
                  ? errors.type.message
                  : 'Please enter your Name!'}
              </span>
            )}
          </div>
          <div className="relative flex flex-col gap-1">
            <label className="font-semibold">Featured</label>
            <Controller
              name="featured"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={false}
                  style={{ width: 120 }}
                  {...field}
                  options={[
                    { value: true, label: 'true' },
                    { value: false, label: 'false' },
                  ]}
                />
              )}
            />
            {errors.type && (
              <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
                {errors.type.message
                  ? errors.type.message
                  : 'Please enter your Name!'}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-10">
          {/* Rating  */}
          <div className="relative flex flex-col gap-1">
            <input
              className="hidden"
              type="number"
              value={rating}
              readOnly
              {...register('rating', { min: 0, max: 5 })}
            />
            <label className="font-semibold">Rating</label>
            <div className="flex gap-1 py-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} onClick={() => handleStarClick(value)}>
                  {value <= rating ? (
                    <BsStarFill size={18} color="yellow" />
                  ) : (
                    <BsStar />
                  )}
                </div>
              ))}
            </div>
            {errors.rating && (
              <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
                {errors.rating.message
                  ? errors.rating.message
                  : 'Please enter your Rating!'}
              </span>
            )}
          </div>
          {/* // cheapest Price  */}
          <div className="relative flex flex-col gap-1">
            <label className="font-semibold">Cheapest Price</label>
            <Controller
              name="cheapestPrice"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputNumber min={1} defaultValue={100} {...field} />
              )}
            />
            {errors.cheapestPrice && (
              <span className="text-red-500 font-normal absolute -bottom-8 text-xs ">
                {errors.cheapestPrice.message
                  ? errors.cheapestPrice.message
                  : 'Please enter your cheapestPrice!'}
              </span>
            )}
          </div>
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">City</label>
          <Controller
            name="city"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.city && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.city.message
                ? errors.city.message
                : 'Please enter your city!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Address</label>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.address && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.address.message
                ? errors.address.message
                : 'Please enter your address!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Distance</label>
          <Controller
            name="distance"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.distance && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.distance.message
                ? errors.distance.message
                : 'Please enter your distance!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <label className="font-semibold">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.title && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.title.message
                ? errors.title.message
                : 'Please enter your title!'}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-1 ">
          <label className="font-semibold">Description</label>
          <Controller
            name="desc"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.desc && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.desc.message
                ? errors.desc.message
                : 'Please enter your Description!'}
            </span>
          )}
        </div>
        {/* //photos  */}
        <div className="relative flex flex-col gap-1 col-span-2">
          <Controller
            name="photos"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <input
                className="hidden"
                type="file"
                id="photos"
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                  field.onChange(e.target.files); // Update field value with file list
                }}
                // Ensure value is undefined to avoid setting it directly
                value={undefined}
              />
            )}
          />

          <label htmlFor="photos" className="font-semibold">
            Photos
          </label>
          <div className="flex gap-2 items-center max-sm:flex-col">
            <label
              className="bg-slate-100 px-5 py-1 rounded-lg border-2 h-10"
              htmlFor="photos"
            >
              Upload
            </label>
            <div className="flex flex-wrap">
              {allImages.slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="relative group select-none">
                  <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={item.type === 'api' ? item.url : getFileURL(item.file)}
                    alt={`photo-${index}`}
                  />
                  <div className="rounded-full absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 gap-2">
                    <MdOutlineRemoveRedEye
                      className="cursor-pointer hover:text-blue-300"
                      onClick={() => {
                        handleSeeMoreClick(index);
                      }}
                      size={20}
                    />
                    <MdOutlineDeleteForever
                      className="cursor-pointer hover:text-red-300"
                      onClick={() =>
                        handleImgDelete(
                          item.type === 'api' ? item.url : item.file,
                          index
                        )
                      }
                      size={20}
                    />
                  </div>
                </div>
              ))}
              {allImages.length > 5 && (
                <p className="bg-gray-300 rounded-full w-8 h-8 text-center py-1">
                  +{allImages.length - 5}
                </p>
              )}
            </div>
          </div>
          {errors.photos && (
            <span className="text-red-500 font-normal absolute -bottom-4 text-xs ">
              {errors.photos.message ? errors.photos.message : 'select photos!'}
            </span>
          )}
        </div>
        <button
          className="col-span-2 bg-green-300 w-max py-2 px-4 text-white font-bold active:scale-75 transition-all duration-200"
          type="submit"
        >
          {isPending ? <Spin size="small" /> : <p>Submit</p>}
        </button>
      </form>

      <div className="flex justify-center gap-4">
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => setPreviewVisible(visible),
            onChange: (current) => setPreviewIndex(current),
            current: previewIndex,
          }}
        >
          {allImages.map((item: any, index: number) => (
            <Image
              key={index}
              width={20}
              height={20}
              src={item.type === 'api' ? item.url : getFileURL(item.file)}
              className="hidden"
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};

export default UpdateHotel;
