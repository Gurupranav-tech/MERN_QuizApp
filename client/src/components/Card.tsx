import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  animate?: boolean;
  big?: boolean;
};

export default function Card({
  children,
  animate = false,
  big = false,
}: CardProps) {
  return (
    <motion.article
      whileHover={{ scale: animate ? 1.1 : 1.0 }}
      className={`bg-white text-text-color w-full sm:w-[${
        big ? "400px" : "300px"
      }] rounded-lg px-10 py-5 drop-shadow-lg`}
    >
      {children}
    </motion.article>
  );
}

export function CardHeader({ children }: CardProps) {
  return (
    <div className="text-2xl font-semibold pb-2 border-b-2 border-text-color text-center">
      {children}
    </div>
  );
}

export function CardBody({ children }: CardProps) {
  return (
    <div className="mt-3 break-all hyphens-auto text-wrap">{children}</div>
  );
}
