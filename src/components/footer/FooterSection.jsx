import { Link } from "react-router-dom";

const FooterSection = ({ title, elements }) => {
  return (
    <div className="text-[#253D4E] space-y-5">
      <h3 className="font-quicksand font-bold text-2xl">{title}</h3>

      <ul className="flex flex-col gap-[13px]">
        {elements.map((el, idx) => {
          const { link, text } = el;

          return (
            <li key={idx}>
              <Link to={link} className="text-[15px] hover:text-[#3BB77E]">
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterSection;
