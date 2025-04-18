import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { getClassNames } from "../../utils/functions.utils";

const CardInfo = ({ title, icon, sections, action, onClick, pt }) => {
  return (
    <div className={classNames("flex gap-4", getClassNames(pt, "root"))}>
      {icon && (
        <div
          className={classNames(
            "row justify-center shrink-0",
            "bg-[#D8F1E5] size-10 rounded-full",
          )}
        >
          <i className={`text-[#3BB77E] pi ${icon} text-lg`} />
        </div>
      )}

      <div className="text-sm font-medium space-y-1">
        <h4 className={classNames("font-bold", getClassNames(pt, "title"))}>
          {title}
        </h4>
        {Object.entries(sections).map(([key, value]) => (
          <p
            key={key}
            className={classNames(getClassNames(pt, "value"), {
              "text-neutral-400": !value,
            })}
          >
            {value || `No ${key} yet.`}
          </p>
        ))}

        {action && (
          <Button
            label={action}
            severity="success"
            pt={{
              label: "font-semibold text-[#3BB77E]",
            }}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default CardInfo;
