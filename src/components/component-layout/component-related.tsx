// "use client";

// import React from "react";
// import { Box } from "@/components/ui-library/box";
// import { Flex } from "@/components/ui-library/flex";
// import { Heading, Text } from "@/components/ui-library/typography";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
// import { motion } from "framer-motion";

// interface RelatedComponent {
//   name: string;
//   description: string;
//   href: string;
//   icon?: React.ReactNode;
// }

// interface ComponentRelatedProps {
//   components: RelatedComponent[];
//   className?: string;
// }

// export function ComponentRelated({ components, className }: ComponentRelatedProps) {
//   if (!components?.length) return null;
  
//   return (
//     <Box className={cn("my-8", className)}>
//       <Heading level="h2" className="mb-6">Related Components</Heading>
      
//       <Flex wrap="wrap" gap={4} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {components.map((component, i) => (
//           <motion.div
//             key={component.href}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: i * 0.1 }}
//           >
//             <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md">
//               <CardHeader>
//                 <Flex justify="between" align="start" gap={3} className="mb-2">
//                   {component.icon && (
//                     <Box className="h-10 w-10 p-2 rounded-md bg-primary/10 text-primary flex items-center justify-center">
//                       {component.icon}
//                     </Box>
//                   )}
//                   <CardTitle className="text-xl">{component.name}</CardTitle>
//                 </Flex>
//                 <CardDescription className="line-clamp-2">
//                   {component.description}
//                 </CardDescription>
//               </CardHeader>
//               <CardFooter className="mt-auto pt-4">
//                 <Link
//                   href={component.href}
//                   className="group inline-flex items-center text-sm font-medium text-primary"
//                 >
//                   View Component
//                   <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </Link>
//               </CardFooter>
//             </Card>
//           </motion.div>
//         ))}
//       </Flex>
//     </Box>
//   );
// }