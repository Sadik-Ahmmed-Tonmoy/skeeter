// "use client";

// import React from "react";
// import { Flex } from "@/components/ui-library/flex";
// import { Box } from "@/components/ui-library/box";
// import { Heading, Text } from "@/components/ui-library/typography";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { ChevronRight, Github, Package } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { usePathname } from "next/navigation";

// interface Breadcrumb {
//   label: string;
//   href: string;
// }

// interface ComponentHeaderProps {
//   title: string;
//   description: string;
//   version?: string;
//   status?: "stable" | "beta" | "experimental" | "deprecated";
//   breadcrumbs?: Breadcrumb[];
//   sourceHref?: string;
//   packageName?: string;
//   className?: string;
// }

// export function ComponentHeader({
//   title,
//   description,
//   version = "1.0.0",
//   status = "stable",
//   breadcrumbs,
//   sourceHref,
//   packageName,
//   className,
// }: ComponentHeaderProps) {
//   const pathname = usePathname();
  
//   const statusColors = {
//     stable: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
//     beta: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
//     experimental: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
//     deprecated: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
//   };

//   // Generate breadcrumbs based on current path if not provided
//   const generatedBreadcrumbs = React.useMemo(() => {
//     if (breadcrumbs) return breadcrumbs;
    
//     if (!pathname) return [];
    
//     const segments = pathname.split('/').filter(Boolean);
//     return segments.map((segment, index) => {
//       const href = `/${segments.slice(0, index + 1).join('/')}`;
//       return {
//         label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
//         href,
//       };
//     });
//   }, [pathname, breadcrumbs]);

//   return (
//     <Box 
//       className={cn(
//         "border-b bg-card/40 backdrop-blur-sm sticky top-0 z-10", 
//         className
//       )} 
//       p={0}
//     >
//       <Box p={6} className="container mx-auto">
//         {generatedBreadcrumbs.length > 0 && (
//           <Flex className="mb-4 text-sm" align="center" gap={1}>
//             {generatedBreadcrumbs.map((crumb, i) => (
//               <React.Fragment key={crumb.href}>
//                 {i > 0 && <ChevronRight className="h-3 w-3 mx-1 text-muted-foreground" />}
//                 <Link 
//                   href={crumb.href}
//                   className={cn(
//                     "text-muted-foreground hover:text-foreground transition-colors",
//                     i === generatedBreadcrumbs.length - 1 && "font-medium text-foreground"
//                   )}
//                 >
//                   {crumb.label}
//                 </Link>
//               </React.Fragment>
//             ))}
//           </Flex>
//         )}
        
//         <Flex direction="row" justify="between" className="w-full">
//           <Box>
//             <Heading level="h1" className="mb-2">{title}</Heading>
//             <Text size="lg" color="muted" className="max-w-3xl">
//               {description}
//             </Text>
//           </Box>
          
//           <Flex gap={3} className="hidden lg:flex">
//             {sourceHref && (
//               <Button variant="outline" size="sm" asChild>
//                 <Link href={sourceHref} target="_blank" rel="noreferrer noopener">
//                   <Github className="h-4 w-4 mr-2" />
//                   Source
//                 </Link>
//               </Button>
//             )}
//             {packageName && (
//               <Button variant="outline" size="sm" asChild>
//                 <Link href={`https://www.npmjs.com/package/${packageName}`} target="_blank" rel="noreferrer noopener">
//                   <Package className="h-4 w-4 mr-2" />
//                   {packageName}
//                 </Link>
//               </Button>
//             )}
//           </Flex>
//         </Flex>
        
//         <Flex gap={3} className="mt-4">
//           <Badge variant="outline" className="font-mono text-xs">v{version}</Badge>
//           <Badge className={cn("text-xs", statusColors[status])}>
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </Badge>
//         </Flex>
//       </Box>
//     </Box>
//   );
// }