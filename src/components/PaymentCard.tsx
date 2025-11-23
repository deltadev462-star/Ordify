 import { CheckCircle } from "lucide-react";

export default function PaymentCard({
  amount = 20,
  bonusText = "Charge Now and Get 20$",
  features = [],
  buttonText = "Charge Your Wallet",
  onButtonClick,
}: {
  amount?: number;
  bonusText?: string;
  features?: string[];
  buttonText?: string;
  onButtonClick: () => void;
}) {
  return (
    <div className="  bg-white rounded-xl shadow-md border border-[#d6d6d6] dark:border-[#424242] dark:bg-[#101010]   p-6 text-center space-y-4">
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white">${amount}</h2>
      <p className="text-gray-600 dark:text-gray-400">{bonusText}</p>

      <hr className="border-[#d6d6d6] dark:border-[#424242]" />

      <ul className="space-y-3 text-gray-700 dark:text-gray-400 mt-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 justify-end">
            <span>{feature}</span>
            <CheckCircle className="text-green-500 w-5 h-5" />
          </li>
        ))}
      </ul>

      <button
        onClick={onButtonClick}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
      >
        {buttonText}
      </button>
    </div>
  );
}

