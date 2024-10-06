import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type: "primary" | "secondary" | "error";
  animated?: boolean;
  buttonType?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type,
  animated = false,
  buttonType = "button",
  className = "",
  disabled = false,
}: Props) {
  const animationProps = animated
    ? {
        whileHover: {
          scale: 1.1,
        },
        whileTap: {
          scale: 0.9,
        },
      }
    : {};

  const colorScheme = () => {
    if (type === "primary") return "bg-primary-color text-white";
    else if (type === "secondary") return "bg-white text-primary-color";
    else if (type === "error") return "bg-red-500 text-white";
  };

  const classes = `rounded-xl py-2 text-lg font-bold ${colorScheme()}`;
  type === "primary"
    ? "bg-primary-color text-white rounded-xl py-2 text-lg font-bold"
    : "bg-white text-primary-color rounded-xl py-2 text-lg font-bold";

  return (
    <motion.button
      type={buttonType}
      {...animationProps}
      className={
        classes + " flex items-center justify-evenly gap-3 px-4 " + className
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
