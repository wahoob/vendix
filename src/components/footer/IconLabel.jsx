const IconLabel = ({ Icon, label, text }) => {
  return (
    <li className="flex gap-2">
      <div className="text-[#3BB77E]">
        <div className="size-4">
          <Icon />
        </div>
      </div>

      <p className="text-[15px] font-semibold text-[#253D4E]">
        {label}: <span className="font-normal">{text}</span>
      </p>
    </li>
  );
};

export default IconLabel;
