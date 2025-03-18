import { twMerge } from "tailwind-merge";

import { getClassNames } from "../../utils/functions.utils";

const SocialMediaLinks = ({ facebook, instagram, twitter, pt }) => {
  const openLink = (url) => window.open(url, "_blank").focus();

  return (
    <ul
      className={twMerge(
        "row justify-between [&>*]:cursor-pointer text-[#3BB77E]",
        getClassNames(pt, "root"),
      )}
    >
      <li className="hover:text-blue-600" onClick={() => openLink(facebook)}>
        <i className="pi pi-facebook" />
      </li>
      <li className="hover:text-pink-500" onClick={() => openLink(instagram)}>
        <i className="pi pi-instagram" />
      </li>
      <li className="hover:text-black" onClick={() => openLink(twitter)}>
        <i className="pi pi-twitter" />
      </li>
    </ul>
  );
};

export default SocialMediaLinks;
