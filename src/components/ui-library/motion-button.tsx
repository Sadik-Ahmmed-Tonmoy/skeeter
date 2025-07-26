// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Button, type ButtonProps } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// interface MotionButtonProps extends ButtonProps {
//   glowEffect?: boolean;
//   rippleEffect?: boolean;
//   bounceEffect?: boolean;
//   scaleEffect?: boolean;
// }

// export const MotionButton = React.forwardRef<
//   HTMLButtonElement,
//   MotionButtonProps
// >(
//   (
//     {
//       className,
//       variant,
//       size,
//       glowEffect = false,
//       rippleEffect = false,
//       bounceEffect = false,
//       scaleEffect = true,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     let whileHoverAnimation = {};
    
//     if (scaleEffect) {
//       whileHoverAnimation = { scale: 1.03 };
//     }
    
//     if (bounceEffect) {
//       whileHoverAnimation = {
//         ...whileHoverAnimation,
//         y: -3,
//       };
//     }
    
//     if (glowEffect) {
//       whileHoverAnimation = {
//         ...whileHoverAnimation,
//         boxShadow: variant === "default" 
//           ? "0 0 15px rgba(125, 95, 255, 0.5)" 
//           : "0 0 8px rgba(225, 225, 235, 0.3)",
//       };
//     }
    
//     return (
//       <motion.div
//         whileHover={whileHoverAnimation}
//         whileTap={{ scale: 0.98 }}
//         transition={{ type: "spring", stiffness: 400, damping: 17 }}
//       >
//         <Button
//           ref={ref}
//           variant={variant}
//           size={size}
//           className={cn(
//             rippleEffect && "relative overflow-hidden",
//             glowEffect && "transition-shadow duration-300",
//             className
//           )}
//           {...props}
//         >
//           {children}
//         </Button>
//       </motion.div>
//     );
//   }
// );

// MotionButton.displayName = "MotionButton";