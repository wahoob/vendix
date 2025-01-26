import { Dialog } from "primereact/dialog";
import { useGetMeQuery } from "../usersApiSlice";
import { AsyncContentWrapper } from "../../../components";
import AddressItem from "./AddressItem";

const UserAddressesList = ({ visible, onHide }) => {
  const { data, ...rest } = useGetMeQuery();

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      draggable={false}
      header="Pick one Address"
      pt={{
        root: "w-[min(90%,500px)] h-96",
        header: "pt-4 pb-2",
        closeButton: "focus:shadow-[0_0_0_0.2rem_#88EAAC]",
        content: "px-0",
      }}
    >
      <AsyncContentWrapper
        {...rest}
        render={() =>
          data.addresses.length ? (
            data.addresses.map((address, i) => (
              <AddressItem key={i} {...address} />
            ))
          ) : (
            <div className="row justify-center">
              <p className="text-xl font-semibold text-[#7E7E7E]">
                No Addresses available
              </p>
            </div>
          )
        }
      />
    </Dialog>
  );
};

export default UserAddressesList;
