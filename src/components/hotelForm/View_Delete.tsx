import {
  Button,
  Modal,
  Popconfirm,
  PopconfirmProps,
  Space,
  Table,
  Tag,
} from 'antd';
import {
  useDeleteHotel,
  useGetHotel,
  useGetHotels,
} from '../../services/hotel';
import InfoHeader from '../../shared/InfoHeader';
import { useState } from 'react';
import ImageSeeMore from '../ImageSeeMore/ImageSeeMore';
import HotelViewDetails from '../viewDetails/HotelViewDetails';
import { Link } from 'react-router-dom';

const View_Delete = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { data: hotelData, isFetching } = useGetHotels(
    currentPage,
    itemsPerPage
  );
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedHotelId, setSelectedHotelId] = useState('');
  const { data: singleHotelData, isFetching: singleHotelFetching } =
    useGetHotel(selectedHotelId, open);

  const { mutate: handleDeleteHotel, contextHolder } =
    useDeleteHotel(currentPage);

  const confirm: PopconfirmProps['onConfirm'] = (hotelID) => {
    handleDelete(hotelID as any);
  };

  const handleDelete = (hotelID: string) => {
    if (isDelete) {
      handleDeleteHotel(hotelID);
    } else {
      handleDeleteHotel(hotelID);
    }
  };

  const typeColors: { [key: string]: string } = {
    Hotel: 'blue',
    Apartments: 'purple',
    Resorts: 'gold',
    Villas: 'green',
    Cabins: 'volcano',
    Cottages: 'magenta',
    Hostels: 'cyan',
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },

    {
      title: 'Cheapest Price',
      dataIndex: 'cheapestPrice',
      key: 'cheapestPrice',
    },
    {
      title: 'Rooms',
      dataIndex: 'rooms',
      key: 'rooms',
      render: (data: string) => data?.length,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured: boolean) => (
        <Tag color={featured ? 'green' : 'volcano'}>
          {featured ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={typeColors[type] || 'default'}>{type}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOpen(true), setSelectedHotelId(record._id);
            }}
          >
            View
          </a>
          /
          <div>
            {isDelete ? (
              <a onClick={() => handleDelete(record._id)}>Delete</a>
            ) : (
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(record._id)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a>Delete</a>
              </Popconfirm>
            )}{' '}
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Modal
        title={<p className="mb-6">Hotel Details</p>}
        footer={
          <div>
            <Link state={singleHotelData?._id} to={`/Hotel/Update`}>
              <Button type="link">Update</Button>
            </Link>
            <Button type="dashed">Delete</Button>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
      >
        {singleHotelData?.photos?.length ? (
          <ImageSeeMore
            images={singleHotelData?.photos}
            isLoading={singleHotelFetching}
          />
        ) : (
          <h3 className="font-bold text-center">No image Available!</h3>
        )}

        <HotelViewDetails
          data={singleHotelData}
          isLoading={singleHotelFetching}
        />
      </Modal>
      <InfoHeader
        title="Hotel List"
        description="Manage your hotels from here."
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        isSetting={true}
      />
      <Table
        dataSource={hotelData?.hotels}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: hotelData?.count,
          onChange: (page) => setCurrentPage(page), // Update the current page on change
        }}
        loading={isFetching}
        className="border border-t-0 overflow-x-auto"
      />
    </div>
  );
};

export default View_Delete;
