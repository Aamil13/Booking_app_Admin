import React, { useState } from 'react';
import { Image, Skeleton } from 'antd';

interface ImagesProp {
  images: string[];
  isLoading: boolean;
}

const ImageSeeMore: React.FC<ImagesProp> = ({ images, isLoading }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [_, setPreviewStartIndex] = useState(0);

  const handleSeeMoreClick = () => {
    setPreviewStartIndex(5); // Start preview from the 6th image
    setPreviewVisible(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-wrap gap-4 justify-center">
          <Skeleton.Image className="w-[140px]" active={isLoading} />
          <Skeleton.Image className="w-[140px]" active={isLoading} />
          <Skeleton.Image className="w-[140px]" active={isLoading} />
        </div>
      ) : (
        <Image.PreviewGroup
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => setPreviewVisible(visible),

            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {images
              ?.slice(0, 5)
              .map((src, index) => (
                <Image
                  className="bg-neutral-100 object-cover rounded-lg"
                  key={index}
                  width={140}
                  height={100}
                  src={src}
                />
              ))}

            {images?.length > 6 && (
              <div
                className="inline-block rounded-lg w-[140px] h-[100px] relative bg-gray-100 text-center cursor-pointer"
                onClick={handleSeeMoreClick}
              >
                <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-500">
                  +
                </span>
              </div>
            )}
          </div>

          {images
            ?.slice(5)
            .map((src, index) => (
              <Image
                key={5 + index}
                width={20}
                height={20}
                src={src}
                className="hidden"
              />
            ))}
        </Image.PreviewGroup>
      )}
    </>
  );
};

export default ImageSeeMore;
