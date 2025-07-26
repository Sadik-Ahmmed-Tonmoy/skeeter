// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// interface MotionSectionProps extends React.HTMLAttributes<HTMLDivElement> {
//   children: React.ReactNode;
//   fadeIn?: boolean;
//   slideIn?: "none" | "up" | "down" | "left" | "right";
//   staggerChildren?: boolean;
//   staggerDelay?: number;
//   viewport?: { once?: boolean; margin?: string };
//   delay?: number;
//   duration?: number;
// }

// export const MotionSection = ({
//   children,
//   className,
//   fadeIn = true,
//   slideIn = "up",
//   staggerChildren = false,
//   staggerDelay = 0.1,
//   viewport = { once: true, margin: "-100px" },
//   delay = 0,
//   duration = 0.5,
//   ...props
// }: MotionSectionProps) => {
//   // Animation variants for the container
//   const containerVariants = {
//     hidden: { opacity: fadeIn ? 0 : 1 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration,
//         delay,
//         staggerChildren: staggerChildren ? staggerDelay : 0,
//       },
//     },
//   };

//   // Animation variants for children (when staggered)
//   const childVariants = {
//     hidden: {
//       opacity: 0,
//       y: slideIn === "up" ? 20 : slideIn === "down" ? -20 : 0,
//       x: slideIn === "left" ? 20 : slideIn === "right" ? -20 : 0,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       x: 0,
//       transition: {
//         duration: 0.4,
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.section
//       className={cn("w-full", className)}
//       initial="hidden"
//       whileInView="visible"
//       viewport={viewport}
//       variants={containerVariants}
//       {...props}
//     >
//       {staggerChildren
//         ? React.Children.map(children, (child) => (
//             <motion.div variants={childVariants}>{child}</motion.div>
//           ))
//         : children}
//     </motion.section>
//   );
// };