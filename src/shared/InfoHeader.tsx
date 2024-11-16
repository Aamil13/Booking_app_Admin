import { Checkbox, Popover } from 'antd';
import { IoSettings } from 'react-icons/io5';

import type { CheckboxProps } from 'antd';

type Props = {
  title: string;
  description: string;
  isDelete?: boolean;
  setIsDelete?: (value: boolean) => void;
  isSetting?: boolean;
};

const InfoHeader = ({
  title,
  description,
  isDelete,
  setIsDelete,
  isSetting = false,
}: Props) => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    // console.log(`checked = ${e.target.checked}`);
    if (setIsDelete) {
      setIsDelete(e.target.checked);
    }
  };

  const content = (
    <div>
      <Checkbox checked={isDelete} onChange={onChange}>
        Delete without asking!
      </Checkbox>
    </div>
  );
  return (
    <div className="bg-slate-50 p-6 border border-b-0 rounded-t-lg relative">
      <h3 className="text-xl font-bold">{title}</h3>
      <h6 className="text-xs text-slate-600">{description}</h6>

      {isSetting && (
        <div className="absolute right-4 top-10">
          <Popover content={content} title="Option" trigger="click">
            <IoSettings size={24} />
          </Popover>
        </div>
      )}
    </div>
  );
};

export default InfoHeader;
