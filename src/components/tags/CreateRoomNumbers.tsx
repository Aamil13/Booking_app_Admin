import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Flex, Input, Tag, theme, Tooltip } from 'antd';

type roomType = {
  number: number;
};

interface CreateRoomNumbersProps {
  value?: roomType[];
  onChange?: (value: roomType[]) => void;
}

const tagInputStyle: React.CSSProperties = {
  width: 100,
  height: 26,
  //   marginInlineEnd: 8,
  //   verticalAlign: 'top',
};

const CreateRoomNumbers: React.FC<CreateRoomNumbersProps> = ({
  value = [],
  onChange,
}) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>(
    value.map((room) => room.number.toString())
  );
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const updateRoomNumbers = (newTags: string[]) => {
    const updatedRooms = newTags.map((tag) => ({ number: parseInt(tag, 10) }));
    setTags(newTags);
    if (onChange) {
      onChange(updatedRooms);
    }
  };

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    updateRoomNumbers(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent input of negative values
    const value = e.target.value;
    if (!value || parseInt(value, 10) >= 0) {
      setInputValue(value);
    }
  };

  const handleInputConfirm = () => {
    if (
      inputValue &&
      parseInt(inputValue, 10) >= 0 &&
      !tags.includes(inputValue)
    ) {
      const newTags = [...tags, inputValue];
      const sortedTags = newTags.sort((a: any, b: any) => a - b);
      updateRoomNumbers(sortedTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || parseInt(value, 10) >= 0) {
      setEditInputValue(value);
    }
  };

  const handleEditInputConfirm = () => {
    if (parseInt(editInputValue, 10) >= 0) {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      updateRoomNumbers(newTags);
    }
    setEditInputIndex(-1);
    setEditInputValue('');
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 28,
    background: token.colorBgContainer,
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Flex gap="4px 0" wrap>
      {tags.map<React.ReactNode>((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              size="middle"
              min={0}
              style={tagInputStyle}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            closable={true}
            style={{ userSelect: 'none' }}
            className="h-7 flex items-center "
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="number"
          size="large"
          min={0}
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Room Number
        </Tag>
      )}
    </Flex>
  );
};

export default CreateRoomNumbers;
