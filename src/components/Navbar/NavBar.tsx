import { Avatar, Modal, Popover } from 'antd';
import { MdDashboardCustomize } from 'react-icons/md';
import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { SearchPagesData } from './searchModalData';
import { FiBell } from 'react-icons/fi';
import {
  Shortcutcontent,
  Notificationsontent,
  profileContent,
} from './popData';

const NavBar = () => {
  const [modal2Open, setModal2Open] = useState(false);

  return (
    <>
      <div className="sticky left-0 top-6 border w-full py-3 px-4 flex justify-between rounded-lg z-50 backdrop-blur-sm">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setModal2Open(true)}
        >
          <IoIosSearch size={24} />
          <p className="text-slate-400">Search</p>
        </div>
        <div className="flex gap-2 items-center text-xl">
          <Popover
            placement="bottomRight"
            content={Shortcutcontent}
            trigger="click"
            className="w-10"
          >
            <MdDashboardCustomize />
          </Popover>

          <Popover
            placement="bottomRight"
            content={Notificationsontent}
            trigger="click"
            className="w-10"
          >
            <FiBell />
          </Popover>

          <Popover
            placement="bottomRight"
            content={profileContent}
            trigger="click"
            className="w-10"
          >
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
          </Popover>
        </div>
      </div>
      <Modal
        // title="Vertically centered modal dialog"
        // centered
        open={modal2Open}
        // onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer=""
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <IoIosSearch size={24} />
            <input type="text" className=" w-11/12 py-1 px-2 outline-none" />
          </div>
          <div className="flex flex-wrap gap-28  justify-center p-6">
            {SearchPagesData.map((item) => (
              <div key={item.title}>
                <h3 className=" text-slate-300 text-center font-serif">
                  {item.title}
                </h3>
                {item.pages.map((itm) => (
                  <div
                    key={item + itm.name}
                    className="text-sm text-slate-900 font-semibold py-1 flex items-center gap-2"
                  >
                    {React.createElement(itm.icon)}
                    {itm.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
