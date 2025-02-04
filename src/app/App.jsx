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
            toast: {
              message: ({ state, index }) => ({
                className: classNames(
                  "my-4 rounded-md w-full bg-opacity-70 border-l-[6px]",
                  {
                    "border-[#3B82F6] text-blue-700":
                      state.messages[index] &&
                      state.messages[index].message.severity == "info",
                    "border-[#3BB77E] text-green-700":
                      state.messages[index] &&
                      state.messages[index].message.severity == "success",
                    "border-[#FF5757] text-red-700":
                      state.messages[index] &&
                      state.messages[index].message.severity == "error",
                    "border-[#CC8925]":
                      state.messages[index] &&
                      state.messages[index].message.severity == "warn",
                  }
                ),
              }),
              content: "text-left",
            },
            datatable: {
              headerRow: "whitespace-nowrap",
              bodyRow: ({ context }) => ({
                className: classNames("whitespace-nowrap", {
                  "text-[#495058] bg-transparent": context.selected,
                }),
              }),
              column: {
                headerCell: "text-[#495058] font-medium",
                headerCheckbox: ({ context }) => ({
                  box: classNames("border bg-[#F8F9FA] size-4 rounded", {
                    "border-[#CACBCB] ": !context.checked,
                    "border-[#3BB77E] bg-[#3BB77E]": context.checked,
                  }),
                  root: "size-4",
                  icon: "size-3",
                }),
                rowCheckbox: ({ context }) => ({
                  box: classNames("border bg-[#F8F9FA] size-4 rounded", {
                    "border-[#CACBCB] ": !context.checked,
                    "border-[#3BB77E] bg-[#3BB77E]": context.checked,
                  }),
                  root: "size-4",
                  icon: "size-3",
                }),
                bodyCell: "leading-none",
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
