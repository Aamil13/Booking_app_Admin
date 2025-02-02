import { useState } from 'react';
import { useGetAllReservation } from '../../services/booking';
import InfoHeader from '../../shared/InfoHeader';
import { Table } from 'antd';

const index = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { data: bookingData, isFetching } = useGetAllReservation(
    currentPage,
    itemsPerPage
  );

  const columns = [
    {
      title: 'User name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'room no.',
      dataIndex: 'roomno',
      key: 'roomno',
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },

    {
      title: 'Booked at',
      key: 'createdAt',
      render: (_: any, record: any) => (
        <p>{new Date(record.createdAt).toLocaleDateString()}</p>
      ),
    },
    {
      title: 'dates',
      key: 'dates',
      render: (_: any, record: any) => (
        <div className="flex flex-col gap-2">
          {record?.BookedDates?.map((item: string, idx: number) => (
            <p key={idx}>
              {new Date(item[0]).toLocaleString()} to{' '}
              {new Date(item[item.length - 1]).toLocaleString()}
            </p>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <InfoHeader
        title="Bookings List"
        description="View Bookings from here."
      />
      <Table
        dataSource={bookingData?.Bookings}
        columns={columns}
        rowKey={(record) => record?._id}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: bookingData?.count,
          onChange: (page) => setCurrentPage(page), // Update the current page on change
        }}
        loading={isFetching}
        className="border border-t-0 overflow-x-auto"
      />
    </div>
  );
};

export default index;
