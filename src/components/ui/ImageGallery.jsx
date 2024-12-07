import { classNames } from "primereact/utils";
import { useState } from "react";

const ImageGallery = ({ images, name, maxWidth }) => {
  const [current, setCurrent] = useState(0);
  const changeCurrent = (index) => setCurrent(index);

  const viewImageWidth = (maxWidth - (images.length - 1) * 20) / 4;

  return (
    <div className="row flex-col space-y-[30px]">
      <div
        className="border border-[#ECECEC] rounded-[15px]"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <img src={images[current]} alt={name || "product image"} />
      </div>

      <div className="row justify-between gap-5 w-full">
        {images.map((image, index) => {
          const selected = index === current;

          return (
            <div
              key={index}
              className={classNames(
                "bg-[#F7F8FA] rounded-[17px]",
                "cursor-pointer hover:bg-[#f3f3f3]",
                {
                  "border-2 border-[#A2D2C9]": selected,
                }
              )}
              style={{
                maxWidth: `${viewImageWidth}px`,
              }}
              onClick={() => changeCurrent(index)}
            >
              <img
                src={image}
                alt={name || "product image"}
                className="pointer-events-none"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
