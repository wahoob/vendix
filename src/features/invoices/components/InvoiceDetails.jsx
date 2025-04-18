import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useRef } from "react";
import html2canvas from "html2canvas";

import { logo } from "../../../assets/images";

import { AsyncContentWrapper, CardInfo } from "../../../components";
import { ProductsInOrder } from "../../products";

import { formatShortDate } from "../../../utils/functions.utils";

import { useGetInvoiceQuery } from "../invoicesApiSlice";

const pt = {
  title: "text-lg",
  value: "text-neutral-400",
};

const InvoiceDetails = ({ id }) => {
  const { data, isSuccess, ...rest } = useGetInvoiceQuery({ id });
  const invoiceRef = useRef(null);
  const hiddenElementRef = useRef(null);

  const downloadPDF = async () => {
    const invoiceElement = invoiceRef.current;

    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      windowWidth: 1060,
      ignoreElements: (el) => el === hiddenElementRef.current,
    });
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `invoice-${data.invoiceNumber}.png`;
    link.click();
  };

  return (
    <>
      <div
        className={classNames(
          "rounded-xl overflow-hidden shadow-shadow4",
          "w-full max-w-5xl mx-auto",
        )}
        ref={invoiceRef}
      >
        <div className="bg-footer-tabpanel">
          <div
            className={classNames(
              "py-12 px-4 max-w-4xl mx-auto space-y-4",
              "row justify-between max-sm:block gap-x-4",
            )}
          >
            <img
              src={logo}
              alt="logo"
              className="max-w-56 sm:max-w-72 max-sm:mx-auto"
            />

            <div className="font-bold text-end space-y-1 max-sm:text-center">
              <h3>Date: {isSuccess && formatShortDate(data?.createdAt)}</h3>
              <h3>INVOICE NO: #{data?.invoiceNumber}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white py-8 [&>div]:mx-auto [&>div]:px-4">
          <AsyncContentWrapper
            {...rest}
            isSuccess={isSuccess}
            render={() => {
              const {
                order: {
                  products,
                  total,
                  shippingFee,
                  shippingAddress: { country, state, city, street },
                },
                user: {
                  fullName: { firstName, lastName },
                  email,
                },
                createdAt,
              } = data;

              return (
                <>
                  <div className="border-b">
                    <div
                      className={classNames(
                        "grid sm:grid-cols-[repeat(2,max-content)] gap-6",
                        "sm:justify-items-start justify-center sm:justify-between",
                        "pb-8 max-w-3xl mx-auto",
                      )}
                    >
                      <CardInfo
                        title="Invoice To"
                        sections={{
                          name: `${firstName} ${lastName}`,
                          email,
                          address: `${country}, ${state}, ${city} ${street}`,
                        }}
                        pt={pt}
                      />
                      <CardInfo
                        title="Bill To"
                        sections={{
                          test1: "Vendix Inc",
                          test2: "billing@vendix.com",
                          test3: "205 North Michigan Avenue,",
                          test4: "Suite 810 Chicago, 60601, USA",
                        }}
                        pt={pt}
                      />
                      <CardInfo
                        title="Due Date:"
                        sections={{ dueDate: formatShortDate(createdAt) }}
                        pt={pt}
                      />
                      <CardInfo
                        title="Payment Method"
                        sections={{ test1: "Pay On Delivery" }}
                        pt={pt}
                      />
                    </div>
                  </div>

                  <div className="pt-8 max-w-4xl">
                    <ProductsInOrder
                      items={products}
                      total={total.toFixed(2)}
                      shippingFee={shippingFee.toFixed(2)}
                      ref={hiddenElementRef}
                    />
                  </div>

                  <div className="text-right mt-8 font-medium text-[15px] text-neutral-400 max-w-4xl">
                    <p>Thanks you for your purchase.</p>
                    <p>Vendix INC</p>
                  </div>
                </>
              );
            }}
          />
        </div>
      </div>

      {isSuccess && (
        <div className="mx-auto w-fit">
          <Button
            label="Download"
            icon="pi pi-download"
            pt={{
              root: "bg-[#3BB77E] px-6 py-2 rounded mt-3",
              label: "text-white",
              icon: "text-white",
            }}
            severity="success"
            onClick={downloadPDF}
          />
        </div>
      )}
    </>
  );
};

export default InvoiceDetails;
