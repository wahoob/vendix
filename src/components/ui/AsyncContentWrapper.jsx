import { classNames } from "primereact/utils";

const AsyncContentWrapper = ({
  isSuccess,
  isLoading,
  isFetching,
  loadOnFetch = true,
  isError,
  error,
  render,
}) => {
  let content;
  if (isLoading || (isFetching && loadOnFetch)) {
    content = (
      <i
        className={classNames(
          "pi pi-spin pi-spinner-dotted",
          "text-3xl text-center w-full"
        )}
      ></i>
    );
  } else if (isSuccess) {
    content = render();
  } else if (isError) {
    console.log(error);
    content = (
      <i
        className={classNames(
          "pi pi-exclamation-circle",
          "text-3xl text-center text-red-500 w-full"
        )}
      ></i>
    );
  }

  return content;
};

export default AsyncContentWrapper;
