import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { IoIosArrowForward } from 'react-icons/io';

import { GoDot } from 'react-icons/go';
import { Link } from 'react-router-dom';

type props = {
  title: string;
  subLinks: string[];
  icon: IconType;
  selectedValue: string;
  onChange: (value: string) => void;
};

const SideBarLinks = ({
  title,
  subLinks,
  icon,
  onChange,
  selectedValue,
}: props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-2">
      <div
        className={`${open || selectedValue.includes(title) ? ' bg-slate-100 text-slate-900' : 'hover:bg-green-100'} flex items-center justify-between  p-2 rounded-md transition-all duration-200 text-[#959698] `}
        onClick={() => setOpen(!open)}
      >
        <li className="cursor-pointer  font-semibold  flex items-center gap-2 text-sm">
          <p
            className={` ${selectedValue.includes(title) ? 'text-green-400 ' : ''}text-sm `}
          >
            {' '}
            {React.createElement(icon)}
          </p>
          {title}
        </li>
        <IoIosArrowForward
          className={`${open ? ' rotate-90' : ''}  transition-all duration-200 text-slate-500`}
        />
      </div>

      <div
        className={` ${open ? 'h-36' : 'h-0'} transition-all overflow-hidden ps-5 font-semibold text-slate-800 `}
      >
        <div>
          <div>
            {subLinks.map((item, key) => (
              <Link
                to={`${item.includes('View/Delete') ? `/${title}` : `/${title}/${item}`}`}
                key={key}
              >
                <div
                  className={`${selectedValue == '/' + title + '/' + item ? 'bg-green-400 text-white' : selectedValue == `/${title}` && key == 0 ? 'bg-green-400 text-white' : 'hover:bg-slate-100'} flex gap-2 items-center p-2 rounded-md mt-1 cursor-pointer`}
                  onClick={() => onChange('/' + title + '/' + item)}
                >
                  <GoDot />

                  {item}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarLinks;
