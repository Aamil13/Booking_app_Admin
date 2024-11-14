import { useState } from 'react';
import InfoHeader from '../../shared/InfoHeader';
import { Table } from 'antd';
import { useGetAllUsers } from '../../services/users';

const index = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { data: UsersData, isFetching } = useGetAllUsers(
    currentPage,
    itemsPerPage
  );
  console.log('users', UsersData);

  const columns = [
    {
      title: 'User name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Joined at',
      key: 'createdAt',
      render: (_: any, record: any) => (
        <p>{new Date(record.createdAt).toLocaleDateString()}</p>
      ),
    },
    {
      title: 'Total Bookings',
      key: 'Bookings',
      render: (_: any, record: any) => <p>{record?.bookings?.length}</p>,
    },
  ];

  return (
    <div>
      <InfoHeader title="User List" description="View users from here." />
      <Table
        dataSource={UsersData?.users}
        columns={columns}
        rowKey={(record) => record?._id}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: UsersData?.totalCount,
          onChange: (page) => setCurrentPage(page), // Update the current page on change
        }}
        loading={isFetching}
        className="border border-t-0 "
      />
    </div>
  );
};

export default index;
