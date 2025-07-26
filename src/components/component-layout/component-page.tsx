// "use client";

// import React from "react";
// import { Box } from "@/components/ui-library/box";
// import { Flex } from "@/components/ui-library/flex";
// import { ComponentHeader } from "./component-header";
// import { ComponentTabs } from "./component-tabs";
// import { Pencil, Book, Code, Puzzle, GitFork } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";

// interface ComponentPageProps {
//   title: string;
//   description: string;
//   children: React.ReactNode;
//   usage?: React.ReactNode;
//   api?: React.ReactNode;
//   examples?: React.ReactNode;
//   sourceHref?: string;
//   packageName?: string;
//   version?: string;
//   status?: "stable" | "beta" | "experimental" | "deprecated";
//   className?: string;
// }

// export function ComponentPage({
//   title,
//   description,
//   children,
//   usage,
//   api,
//   examples,
//   sourceHref,
//   packageName,
//   version,
//   status = "stable",
//   className,
// }: ComponentPageProps) {
//   const pathname = usePathname();
  
//   const tabs = React.useMemo(() => {
//     const result = [
//       {
//         value: "overview",
//         label: "Overview",
//         icon: <Book className="h-4 w-4 mr-1" />,
//         content: (
//           <motion.div
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {children}
//           </motion.div>
//         ),
//       },
//     ];
    
//     if (usage) {
//       result.push({
//         value: "usage",
//         label: "Usage",
//         icon: <Code className="h-4 w-4 mr-1" />,
//         content: (
//           <motion.div
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {usage}
//           </motion.div>
//         ),
//       });
//     }
    
//     if (api) {
//       result.push({
//         value: "api",
//         label: "API",
//         icon: <Puzzle className="h-4 w-4 mr-1" />,
//         content: (
//           <motion.div
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {api}
//           </motion.div>
//         ),
//       });
//     }
    
//     if (examples) {
//       result.push({
//         value: "examples",
//         label: "Examples",
//         icon: <GitFork className="h-4 w-4 mr-1" />,
//         content: (
//           <motion.div
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {examples}
//           </motion.div>
//         ),
//       });
//     }
    
//     return result;
//   }, [children, usage, api, examples]);

//   return (
//     <Box className={cn("min-h-screen", className)}>
//       <ComponentHeader
//         title={title}
//         description={description}
//         version={version}
//         status={status}
//         sourceHref={sourceHref}
//         packageName={packageName}
//       />
      
//       <ComponentTabs tabs={tabs} persistInUrl />
//     </Box>
//   );
// }