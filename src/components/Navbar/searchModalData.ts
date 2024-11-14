import { IoCreateOutline } from 'react-icons/io5';
import { RxUpdate } from 'react-icons/rx';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { AiOutlineTransaction } from 'react-icons/ai';
export const SearchPagesData = [
  {
    title: 'User-Page',
    pages: [
      { name: 'Create-Hotel', icon: IoCreateOutline },
      { name: 'Update-Hotel', icon: RxUpdate },
      { name: 'Delete-Hotel', icon: MdOutlineDeleteForever },
      { name: 'View-Hotel', icon: GrView },
    ],
  },
  {
    title: 'Hotel-Page',
    pages: [
      { name: 'Create-Hotel', icon: IoCreateOutline },
      { name: 'Update-Hotel', icon: RxUpdate },
      { name: 'Delete-Hotel', icon: MdOutlineDeleteForever },
      { name: 'View-Hotel', icon: GrView },
    ],
  },
  {
    title: 'Room-Page',
    pages: [
      { name: 'Create-Hotel', icon: IoCreateOutline },
      { name: 'Update-Hotel', icon: RxUpdate },
      { name: 'Delete-Hotel', icon: MdOutlineDeleteForever },
      { name: 'View-Hotel', icon: GrView },
    ],
  },
  {
    title: 'Other-Page',
    pages: [
      { name: 'Bookings', icon: AiOutlineTransaction },
      { name: 'Dashboard', icon: TbLayoutDashboardFilled },
    ],
  },
];
