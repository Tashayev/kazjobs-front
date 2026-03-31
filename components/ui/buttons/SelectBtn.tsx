import { cn } from "@/lib/utils";

type Prop = {
  value: string
  onClick: (value: string) => void
  label: string
  isSelected: boolean
}

const SelectBtn = ({ value, onClick, label, isSelected }: Prop) => {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        "flex-1 py-2 rounded-md border text-sm font-medium transition-all",
        isSelected
          ? "bg-blue-600 text-white border-blue-600"
          : "text-gray-600 border-gray-300 hover:border-blue-600"
      )}
    >
      {label}
    </button>
  )
}

export default SelectBtn
