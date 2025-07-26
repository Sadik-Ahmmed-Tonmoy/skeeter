// "use client";

// import React from "react";
// import { Box } from "@/components/ui-library/box";
// import { Flex } from "@/components/ui-library/flex";
// import { Text } from "@/components/ui-library/typography";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// interface ComponentProp {
//   name: string;
//   type: string;
//   defaultValue?: string;
//   description: string;
//   required?: boolean;
// }

// interface ComponentPropsTableProps {
//   props: ComponentProp[];
//   className?: string;
// }

// export function ComponentPropsTable({ props, className }: ComponentPropsTableProps) {
//   return (
//     <Box 
//       className={cn(
//         "rounded-lg border overflow-hidden",
//         className
//       )}
//       p={0}
//     >
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[180px]">Name</TableHead>
//             <TableHead className="w-[180px]">Type</TableHead>
//             <TableHead className="w-[120px]">Default</TableHead>
//             <TableHead>Description</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {props.map(prop => (
//             <TableRow key={prop.name}>
//               <TableCell className="font-mono text-sm whitespace-nowrap">
//                 <Flex align="center" gap={2}>
//                   {prop.name}
//                   {prop.required && (
//                     <Badge variant="outline" className="text-xs">Required</Badge>
//                   )}
//                 </Flex>
//               </TableCell>
//               <TableCell className="font-mono text-xs">
//                 <Box 
//                   p={1} 
//                   px={2} 
//                   className="bg-muted/50 rounded-sm inline-block max-w-full overflow-hidden text-ellipsis"
//                 >
//                   {prop.type}
//                 </Box>
//               </TableCell>
//               <TableCell className="text-muted-foreground">
//                 {prop.defaultValue ? (
//                   <Box p={1} px={2} className="bg-muted/50 rounded-sm font-mono text-xs inline-block">
//                     {prop.defaultValue}
//                   </Box>
//                 ) : (
//                   <Text size="sm">-</Text>
//                 )}
//               </TableCell>
//               <TableCell>
//                 <Text size="sm">{prop.description}</Text>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }