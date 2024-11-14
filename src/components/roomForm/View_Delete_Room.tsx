import { Popconfirm, Space, Table } from 'antd';
import InfoHeader from '../../shared/InfoHeader';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useDeleteRoom, useGetRooms } from '../../services/room';

const View_Delete_Room = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { data: Rooms, isFetching } = useGetRooms(currentPage, itemsPerPage);

  const { mutate: deleteRoom } = useDeleteRoom();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  console.log('rrr', Rooms);

  const confirm: any = (roomId: any, hotelID: any) => {
    deleteRoom({ roomId, hotelID });
  };

  const handleDelete = (roomId: string, hotelID: string) => {
    if (isDelete) {
      deleteRoom({ roomId, hotelID });
    } else {
      deleteRoom({ roomId, hotelID });
    }
  };

  const columns = [
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'hotel name',
      key: 'hotelId.name',
      render: (_: any, record: any) => <p>{record?.hotelId?.name}</p>,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },

    {
      title: 'Max People',
      dataIndex: 'maxPeople',
      key: 'maxPeople',
    },
    {
      title: 'Rooms',
      dataIndex: 'roomNumbers',
      key: 'roomNumbers',
      render: (data: any) => (
        <p>{data?.map((item: any) => item?.number)?.join(', ')}</p>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Link
            to={`/Rooms/Update`}
            state={[
              { hotelId: record?.hotelId, roomId: record?._id, url: 'Rooms' },
            ]}
          >
            Update
          </Link>
          /
          <div>
            {isDelete ? (
              <a onClick={() => handleDelete(record?._id, record?.hotelId)}>
                Delete
              </a>
            ) : (
              <Popconfirm
                title="Delete the Room"
                description="Are you sure to delete this Room?"
                onConfirm={() => confirm(record?._id, record?.hotelId)}
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
      <InfoHeader
        title="Room List"
        description="Manage your Rooms from here."
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        isSetting={true}
      />
      <Table
        dataSource={Rooms?.rooms}
        columns={columns}
        rowKey={(record) => record?._id}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: Rooms?.count,
          onChange: (page) => setCurrentPage(page), // Update the current page on change
        }}
        loading={isFetching}
        className="border border-t-0 "
      />
    </div>
  );
};

export default View_Delete_Room;
