// "use client";

// import React from "react";
// import { Box } from "@/components/ui-library/box";
// import { Heading, Text } from "@/components/ui-library/typography";
// import { cn } from "@/lib/utils";

// interface ComponentSectionProps {
//   id?: string;
//   title: string;
//   description?: string;
//   className?: string;
//   children: React.ReactNode;
// }

// export function ComponentSection({
//   id,
//   title,
//   description,
//   className,
//   children,
// }: ComponentSectionProps) {
//   return (
//     <Box 
//       id={id} 
//       className={cn("mb-10", className)}
//     >
//       <Heading 
//         // level="h2" 
//         className="mb-2 pb-1 border-b scroll-m-20"
//       >
//         {title}
//       </Heading>
//       {description && (
//         <Text size="lg" color="muted" className="mt-2 mb-6">
//           {description}
//         </Text>
//       )}
//       {children}
//     </Box>
//   );
// }