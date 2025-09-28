import { useId, useState } from "react";

const plans = [
  {
    label: 'Free',
    id: 'free',
    price: 0,
  },
  {
    label: 'Beginner',
    id: 'beginner',
    price: 99,
  },
  {
    label: 'Expert (Individual)',
    id: 'expert-individual',
    price: 499,
  },
  {
    label: 'Expert (Teams)',
    id: 'expert-teams',
    price: 499,
  },
]

function PlanSelection() {
  const id = useId();
  const [plan, setPlan] = useState(plans[0]);

  return (
    <div className="max-w-3xl mx-auto">
      <PriceDisplay id={plan.id} price={plan.price} />

      <fieldset className="bg-white">
        <legend>Select plan:</legend>
        <div className="flex flex-col gap-2">
          {plans.map((plan) => {
            const uniquePlanId = `${id}-${plan.id}`;

            return (
              <div className="flex items-center border border-dashed border-gray-400 rounded focus-within:outline-2 focus-within:outline-blue-600 focus-within:outline-offset-2" key={plan.id}>
                <input
                  type="radio"
                  name={id}
                  id={uniquePlanId}
                  value={plan.id}
                  onChange={() => setPlan(plan)}
                  className="ml-2 accent-blue-600 focus:outline-none"
                />
                <label htmlFor={uniquePlanId} className="flex-1 p-2 cursor-pointer">{plan.label}</label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export default PlanSelection;

function PriceDisplay({ id, price }: { id: string; price: number }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <div className="my-4 text-6xl font-bold text-center overflow-hidden">
      <div key={id} className="animate-slide-and-color">
        {formattedPrice}
      </div>
    </div>
  );
}
