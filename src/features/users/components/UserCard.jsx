import { Button } from "primereact/button";

import { person } from "../../../assets/images";

const UserCard = ({ name, role }) => {
  return (
    <div className="row flex-wrap gap-x-2 w-full whitespace-nowrap">
      <div className="row gap-2">
        <img
          src={person}
          alt="person"
          className="size-11 rounded-full object-cover"
        />

        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-[#B2B9C1]">{role}</p>
        </div>
      </div>

      <Button
        label="More info"
        icon="pi pi-question-circle"
        pt={{
          root: "bg-orange-400 hover:bg-orange-500 px-4 sm:px-2 py-1.5 ml-auto",
          label: "text-white text-[11px] font-medium max-sm:hidden",
          icon: "text-white text-sm max-sm:m-0",
        }}
      />
    </div>
  );
};

export default UserCard;
