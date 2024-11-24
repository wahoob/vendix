import { classNames } from "primereact/utils";
import { twMerge } from "tailwind-merge";

import Router from "../router";
import { PrimeReactProvider } from "primereact/api";

const App = () => {
  return (
    <div className="h-screen overflow-y-auto">
      <PrimeReactProvider
        value={{
          pt: {
            divider: {
              root: { className: "p-0 m-0 w-px" },
            },
            dropdown: {
              root: {
                className: "border-none shadow-none row justify-between group",
              },
              input: {
                className: "p-0 font-lato",
              },
              item: ({ context }) => ({
                className: classNames("py-2 px-4 border-0 font-lato", {
                  "bg-neutral-200 text-neutral-800":
                    context.focused && context.selected,
                  "bg-neutral-100 text-neutral-800":
                    !context.focused && context.selected,
                }),
              }),
            },
            multiselect: {
              root: {
                className: "border-none shadow-none row justify-between group",
              },
              label: { className: "p-0 font-lato" },
              trigger: { className: "w-fit" },
              headerCheckboxContainer: { hidden: true },
            },
            button: {
              root: {
                className: "shrink-0",
              },
            },
          },
          ptOptions: {
            mergeSections: true,
            mergeProps: true,
            classNameMergeFunction: twMerge,
          },
        }}
      >
        <Router />
      </PrimeReactProvider>
    </div>
  );
};

export default App;
