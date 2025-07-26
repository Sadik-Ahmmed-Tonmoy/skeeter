// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// interface CardMotionProps extends React.ComponentProps<typeof Card> {
//   children: React.ReactNode;
//   hoverEffect?: "lift" | "glow" | "scale" | "none";
// }

// export const CardMotion = React.forwardRef<
//   HTMLDivElement,
//   CardMotionProps
// >(({ children, className, hoverEffect = "lift", ...props }, ref) => {
//   const getMotionProps = () => {
//     switch (hoverEffect) {
//       case "lift":
//         return {
//           whileHover: { y: -8, transition: { duration: 0.2 } },
//           whileTap: { y: -4 },
//         };
//       case "glow":
//         return {
//           whileHover: {
//             boxShadow: "0 0 20px rgba(149, 76, 233, 0.3), 0 0 40px rgba(149, 76, 233, 0.1)",
//             transition: { duration: 0.3 },
//           },
//         };
//       case "scale":
//         return {
//           whileHover: { scale: 1.05, transition: { duration: 0.2 } },
//           whileTap: { scale: 1.02 },
//         };
//       case "none":
//       default:
//         return {};
//     }
//   };

//   return (
//     <motion.div
//       {...getMotionProps()}
//       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//     >
//       <Card ref={ref} className={className} {...props}>
//         {children}
//       </Card>
//     </motion.div>
//   );
// });

// CardMotion.displayName = "CardMotion";

// // Re-export card components with enhanced motion versions
// export const CardMotionHeader = CardHeader;
// export const CardMotionTitle = CardTitle;
// export const CardMotionDescription = CardDescription;
// export const CardMotionContent = CardContent;
// export const CardMotionFooter = CardFooter;