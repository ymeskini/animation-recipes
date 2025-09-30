import * as RadioGroup from "@radix-ui/react-radio-group";
import { useId, useState } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "../../utils/cn";

const options = [
  { value: "1tb", label: "1TB SSD Storage", price: 0 },
  { value: "2tb", label: "2TB SSD Storage", price: 400 },
  { value: "4tb", label: "4TB SSD Storage", price: 1000 },
  { value: "8tb", label: "8TB SSD Storage", price: 2200 },
];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  signDisplay: "never",
});

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <div className="mt-5 text-right">
      <button
        disabled={pending}
        className="rounded bg-sky-500 px-3 py-1 text-sm font-semibold text-white"
        type="submit"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default function SelectorGroup() {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState(options[0].value);
  const selectedOption = options.find(
    (o) => o.value === selectedValue
  ) as (typeof options)[0];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">SelectorGroup</h1>
      <div className="w-full max-w-sm">
        <div className="p-4">
          <form
            action={async (formData) => {
              // add timeout to simulate network
              await new Promise((resolve) => setTimeout(resolve, 1000));
              const value = formData.get("storage");
              alert(value);
            }}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   alert(selectedValue);
            // }}
            className="w-full max-w-xs"
          >
            <label htmlFor={id} className="font-medium">
              Storage
            </label>

            <RadioGroup.Root
              onValueChange={setSelectedValue}
              className="mt-8 space-y-4"
              name="storage"
              id={id}
            >
              {options.map((option) => (
                <RadioGroup.Item
                  className={cn(
                    "flex justify-between w-full rounded border p-4",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                    option.value === selectedValue
                      ? "border-sky-500 ring-1 ring-inset ring-sky-500"
                      : "border-gray-500"
                  )}
                  key={option.value}
                  value={option.value}
                >
                  <span className="font-semibold">{option.label}</span>

                  {selectedValue !== option.value && (
                    <span>
                      {option.price > selectedOption.price ? "+ " : "- "}
                      {priceFormatter.format(
                        option.price - selectedOption.price
                      )}
                    </span>
                  )}
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>

            <Submit />
          </form>
        </div>
      </div>
    </div>
  );
}
