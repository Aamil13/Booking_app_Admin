import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import { LuUser2 } from 'react-icons/lu';
import { AiOutlineTransaction } from 'react-icons/ai';
import { IoSettings } from 'react-icons/io5';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { TbReportMoney } from 'react-icons/tb';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { FaQuestion } from 'react-icons/fa6';
import { LuLogOut } from 'react-icons/lu';
import { useMainStore } from '../../store/store';

const notiData = [
  {
    dp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1hBUQQqmfCiseLuhDyEXKwHaJL%26pid%3DApi&f=1&ipt=f086661fc1e1930f22d4184877f1790cfa1d44524ff1e678b1391cc62c0e5d35&ipo=images',
    title: 'Congratulation Flora!',
    desc: 'Won the monthly best seller badge',
    date: '25 May',
  },
  {
    dp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Tq1a6zUnVo6IaC1EIWvZzAHaLH%26pid%3DApi&f=1&ipt=2ba9234aeaa13bd9bb2e7e178e6d02efb68859b7e25c5bce2922830e33a0504d&ipo=images',
    title: 'New message recieved',
    desc: 'You have 10 unread messages',
    date: '25 jan',
  },
  {
    dp: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.EyGlgQiGfQ1BNGKI0OH_UQHaEK%26pid%3DApi&f=1&ipt=6c325aa7fdbb56e5b7cadc89885d21d2932d21507e6656877b65e5f5c2491509&ipo=images',
    title: 'Paypal',
    desc: 'Received payment',
    date: '25 dec',
  },
];

export const Shortcutcontent = (
  <div className="w-96 p-2 flex flex-col gap-4">
    <div className="flex justify-between text-xl text-slate-700 border-b ">
      <p>Shortcuts</p>+
    </div>
    <div className="flex justify-between items-center border-b">
      <div className="flex flex-col items-center justify-center w-1/2 h-36 cursor-pointer hover:bg-slate-50">
        <LuUser2
          size={32}
          className="bg-slate-200 rounded-full w-10 h-10 p-2 "
        />
        <h3 className="text-lg">Users</h3>
        <h6 className="text-xs">Manage Users</h6>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-36 cursor-pointer hover:bg-gray-50">
        <TbDeviceDesktopAnalytics
          size={32}
          className="bg-slate-200 rounded-full w-10 h-10 p-2 "
        />
        <h3 className="text-lg">Dashboard</h3>
        <h6 className="text-xs">Dashboard Analytics</h6>
      </div>
    </div>
    <div className="flex justify-between items-center ">
      <div className="flex flex-col items-center justify-center w-1/2 h-36 cursor-pointer hover:bg-slate-50">
        <AiOutlineTransaction
          size={32}
          className="bg-slate-200 rounded-full w-10 h-10 p-2 "
        />
        <h3 className="text-lg">Transactions</h3>
        <h6 className="text-xs">See Transactions</h6>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-36 cursor-pointer hover:bg-gray-50">
        <IoSettings
          size={32}
          className="bg-slate-200 rounded-full w-10 h-10 p-2 "
        />
        <h3 className="text-lg">Settings</h3>
        <h6 className="text-xs">User Settings</h6>
      </div>
    </div>
  </div>
);

export const Notificationsontent = (
  <div className="w-96 p-2 flex flex-col gap-4">
    <div className="flex justify-between text-lg text-slate-700 border-b pb-4">
      <p>Notifications</p>
      <div className="flex items-center gap-2">
        <button className="bg-blue-200 text-sm py-1 px-2 rounded-md">
          1 new{' '}
        </button>
        <HiOutlineMailOpen size={22} />
      </div>
    </div>
    <div className="flex flex-col justify-between items-center ">
      {notiData.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-4 w-full cursor-pointer hover:bg-slate-50 p-2 border-b"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={item.dp}
            alt=""
          />
          <div>
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <h6 className="text-xs">{item.desc}</h6>
            <p className="text-xs my-3  text-gray-300">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="bg-blue-600 p-2 text-white font-bold">
      See All Notification.
    </button>
  </div>
);

export const profileContent = () => {
  const userName = useMainStore((state) => state.userName);
  return (
    <div className="w-60 p-2 flex flex-col gap-2">
      <div className="flex items-start gap-4 w-full cursor-pointer  px-2 pt-2 pb-5 border-b">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1hBUQQqmfCiseLuhDyEXKwHaJL%26pid%3DApi&f=1&ipt=f086661fc1e1930f22d4184877f1790cfa1d44524ff1e678b1391cc62c0e5d35&ipo=images"
          alt=""
        />
        <div>
          <h3 className="text-sm font-semibold">{userName}</h3>
          <h6 className="text-xs">Admin</h6>
          {/* <p className="text-xs my-3  text-gray-300">{item.date}</p> */}
        </div>
      </div>
      <div className="flex flex-col gap-1 border-b pb-6">
        <div className="flex gap-3 hover:bg-slate-50 py-2 px-1 rounded-md cursor-pointer">
          <LuUser2 size={20} />
          <p className="font-medium text-gray-500 ">Profile</p>
        </div>
        <div className="flex gap-3 hover:bg-slate-50 py-2 px-1 rounded-md cursor-pointer">
          <IoSettings size={20} />
          <p className="font-medium text-gray-500 ">Settings</p>
        </div>
        <div className="flex gap-3 hover:bg-slate-50 py-2 px-1 rounded-md cursor-pointer">
          <TbReportMoney size={20} />
          <p className="font-medium text-gray-500 ">Billing Plan</p>
        </div>
      </div>
      {/* last  */}
      <div className="flex flex-col gap-1 border-b pb-6">
        <div className="flex gap-3 hover:bg-slate-50 py-2 px-1 rounded-md cursor-pointer">
          <MdOutlineAttachMoney size={20} />
          <p className="font-medium text-gray-500 ">Pricing</p>
        </div>
        <div className="flex gap-3 hover:bg-slate-50 py-2 px-1 rounded-md cursor-pointer">
          <FaQuestion size={20} />
          <p className="font-medium text-gray-500 ">FAQ</p>
        </div>
      </div>

      <button className="flex justify-center items-center gap-2 bg-red-500 px-2 py-2 rounded-md text-white  font-semibold">
        Logout <LuLogOut size={12} />
      </button>
    </div>
  );
};
