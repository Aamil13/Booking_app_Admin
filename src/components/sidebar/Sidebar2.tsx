import { useEffect, useState } from 'react';
import icon from '../../../public/favicon-32x32.png';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { AiOutlineTransaction } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';
import SideBarLinks from './SideBarLinks';
import { sideBarData } from './sideBarData';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import { message } from 'antd';
import { useMainStore } from '../../store/store';

const Sidebar2 = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<string>(location.pathname);
  const resetStore = useMainStore((state) => state.resetUserName);
  const [dashOpen, setDashOpen] = useState(true);
  const [_, __, deleteCookie] = useCookie('access_token');
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleLogOut = () => {
    deleteCookie();
    message.success('Logged Out', 2);
    resetStore();
    navigate('/login');
  };

  useEffect(() => {
    if (selectedValue !== location.pathname) {
      setSelectedValue(location.pathname);
    }
  }, [location.pathname]);
  return (
    <div
      className={` top-0 h-screen flex flex-col overflow-y-scroll overflow-x-hidden no-scrollbar justify-between  border-r-2 lg:min-w-64 lg:sticky  fixed bg-white z-[60]  ${dashOpen ? 'left-0 ' : '-left-56  '}  lg:mt-2 lg:rounded-e-xl transition-all`}
    >
      <IoIosArrowForward
        onClick={() => setDashOpen(!dashOpen)}
        className={`${dashOpen ? ' rotate-180' : ''}  transition-all duration-200 text-white absolute bg-green-300 rounded-full w-6 h-6 top-1/2  -right-0 lg:hidden `}
      />
      <div className="  ">
        <div className="flex w-full items-center justify-start gap-3 py-5 px-6">
          <img src={icon} alt="icon" />
          <Link to={'/'}>
            <p className="text-xl font-bold text-slate-700">Booking-Admin</p>
          </Link>
        </div>

        <div className="px-6  pt-6 flex flex-col  transition-all duration-300">
          <Link to={'/'}>
            <div className="mb-2">
              <div
                onClick={(e) =>
                  setSelectedValue((e.target as HTMLInputElement).innerText)
                }
                className={`${selectedValue == '/' ? 'bg-green-400 text-white' : 'hover:bg-green-100'} p-2 rounded-md text-sm font-semibold  flex items-center gap-2 cursor-pointer text-[#959698] `}
              >
                <TbLayoutDashboardFilled
                  className={`${selectedValue == '/' ? 'text-white' : ''} text-sm`}
                />
                Dashboard
              </div>
            </div>
          </Link>

          <Link to={'/Users'}>
            <div className="mb-2">
              <div
                onClick={(e) =>
                  setSelectedValue((e.target as HTMLInputElement).innerText)
                }
                className={`${selectedValue == '/Users' ? 'bg-green-400 text-white' : 'hover:bg-green-100'} p-2 rounded-md text-sm font-semibold  flex items-center gap-2 cursor-pointer text-[#959698] `}
              >
                <TbLayoutDashboardFilled
                  className={`${selectedValue == '/Users' ? 'text-white' : ''} text-sm`}
                />
                Users
              </div>
            </div>
          </Link>
          <div className=" flex flex-col ">
            {sideBarData.map((item) => (
              <SideBarLinks
                key={item.title}
                title={item.title}
                subLinks={item.subLinks}
                icon={item.icon}
                selectedValue={selectedValue}
                onChange={handleChange}
              />
            ))}
            <Link to={'/Bookings'}>
              <div
                onClick={(e) =>
                  setSelectedValue((e.target as HTMLInputElement).innerText)
                }
                className={`${selectedValue == '/Bookings' ? 'bg-green-400 text-white' : 'hover:bg-green-100'} p-2 rounded-md text-sm font-semibold  flex items-center gap-2 cursor-pointer text-[#959698] `}
              >
                <AiOutlineTransaction
                  className={`${selectedValue == '/Bookings' ? 'text-white' : ''} text-sm`}
                />
                Bookings
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* bottom links */}
      <div className="py-5 px-6 flex flex-col gap-2">
        <Link to={'/Help-Center'}>
          <div
            onClick={(e) =>
              setSelectedValue((e.target as HTMLInputElement).innerText)
            }
            className={`${selectedValue == 'Help-Center' ? 'bg-slate-200 text-slate-900' : 'hover:bg-green-100'}  p-2 rounded-md text-sm font-semibold  flex items-center gap-2 cursor-pointer text-[#959698] `}
          >
            <IoIosHelpCircleOutline
              className={`${selectedValue == 'Help-Center' ? 'text-green-400' : ''} text-sm`}
            />
            Help-Center
          </div>
        </Link>
        <Link to={'/Settings'}>
          <div
            onClick={(e) =>
              setSelectedValue((e.target as HTMLInputElement).innerText)
            }
            className={`${selectedValue == 'Settings' ? 'bg-slate-200 text-slate-900' : 'hover:bg-green-100'}  p-2 rounded-md text-sm font-semibold  flex items-center gap-2 cursor-pointer text-[#959698] `}
          >
            <IoSettings
              className={`${selectedValue == 'Settings' ? 'text-green-400' : ''} text-sm`}
            />
            Settings
          </div>
        </Link>
        <div
          onClick={() => handleLogOut()}
          className={`${selectedValue == 'LogOut' ? 'bg-slate-200 text-slate-900' : 'hover:bg-green-100'}  p-2 rounded-xl text-sm font-semibold  flex items-center gap-2 cursor-pointer text-[#959698] `}
        >
          <AiOutlineLogout
            className={`${selectedValue == 'LogOut' ? 'text-green-400' : ''} text-sm`}
          />
          LogOut
        </div>
        {/* //primium service  */}
        <div className="max-w-56 flex flex-col justify-center items-center gap-4 bg-[#f1f5ff] py-3 px-4 rounded-md ">
          <h3 className="font-semibold">Premium Service</h3>
          <p className="text-xs max-w-32 text-center text-slate-400">
            Learn how to provide exceptional customer support and build loyalty.
          </p>
          <button className="bg-green-300 text-sm py-2 px-2 rounded-md text-white">
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
