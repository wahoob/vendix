import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useCarousel } from "../../hooks";

const buttonStyles = (side) => ({
  root: classNames(
    `absolute ${side}-2 top-1/2 -translate-y-1/2 z-30`,
    "bg-[#F2F3F4] size-9 rounded-full"
  ),
  icon: "text-[#7E7E7E]",
});

const Carousel = ({ itemTemplate, items, additionalElement }) => {
  const { current, height, currentRef, back, next, changeCurrent } =
    useCarousel(items, 20000);

  const content = items.map((item, index) => {
    let className;
    const isVisible = index === current;
    const isNext = index === (current + 1) % items.length;

    if (isVisible) {
      className = "translate-x-0 delay-100";
    } else if (isNext) {
      className = "translate-x-full opacity-0";
    } else {
      className = "-translate-x-full opacity-0";
    }

    return (
      <div
        key={index}
        className={classNames(
          "absolute transition-all duration-500",
          className
        )}
        ref={current === index ? currentRef : null}
      >
        {itemTemplate(item)}
      </div>
    );
  });

  return (
    <div className="relative p-14 md:px-[4.7rem] md:py-[5.8rem] overflow-hidden">
      <Button
        severity="secondary"
        icon="pi pi-chevron-left"
        pt={buttonStyles("left")}
        onClick={back}
      />

      <div
        className="relative transition-all duration-500"
        style={{ height: height ? `${height}px` : "auto" }}
      >
        {content}
      </div>

      <Button
        severity="secondary"
        icon="pi pi-chevron-right"
        pt={buttonStyles("right")}
        onClick={next}
      />

      {additionalElement}

      <ul
        className={classNames(
          "row gap-[6px]",
          "absolute bottom-5 left-1/2 -translate-x-1/2"
        )}
      >
        {[...Array(items.length).keys()].map((index) => (
          <li
            key={index}
            className={classNames(
              "size-[15px] rounded-full transition-all",
              "cursor-pointer",
              index === current ? "bg-[#3BB77E]" : "border border-[#253D4E]"
            )}
            onClick={() => changeCurrent(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
