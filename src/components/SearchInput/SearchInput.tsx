import { Select, Spin } from 'antd';
import { useState } from 'react';

import { useSearchHotel } from '../../services/hotel';
import { useNavigate } from 'react-router-dom';

export const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = (props) => {
  const [value, setValue] = useState<string | null>(null);
  const [searcValue, setSearchValue] = useState('');
  const {
    data: searchedHotel = [],
    isFetching,
    isLoading,
  } = useSearchHotel(searcValue);

  const navigate = useNavigate();
  const handleSearch = (newValue: string) => {
    // console.log('val', newValue, value);
    setSearchValue(newValue);
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
    // Location.state = newValue;
    navigate('.', { state: newValue });
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={
        isFetching ? (
          <div className="flex items-center justify-center">
            <Spin size="small" />
          </div>
        ) : isLoading && searchedHotel?.length === 0 ? (
          'No results'
        ) : null
      }
      options={(searchedHotel || []).map((d: any) => ({
        value: d._id,
        label: d.name,
      }))}
    />
  );
};
