import NavBar from '../components/Navbar/NavBar';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar2 from '../components/sidebar/Sidebar2';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { message } from 'antd';

const Root = () => {
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == '/Rooms/Update' && location?.state == null) {
      message.warning('Please select a room!', 1);
      navigate('/Rooms');
    }
  }, [location]);

  return (
    <div className="flex justify-between bg-neutral-100">
      <Sidebar2 />

      <div className="w-full px-8 bg-white mt-2 max-lg:mt-0 ms-4 max-lg:ms-0 rounded-s-xl max-lg:rounded-none border max-lg:border-0 overflow-x-hidden">
        <NavBar />
        <div className="px-10 py-7"></div>
        <AnimatePresence mode="sync">
          <motion.div
            key={location.pathname}
            initial={{ x: '20%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-20%', opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 0.3, duration: 0.2 }}
            className=""
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Root;
