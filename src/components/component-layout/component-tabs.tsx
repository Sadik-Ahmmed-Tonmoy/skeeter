// "use client";

// import React from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Box } from "@/components/ui-library/box";
// import { cn } from "@/lib/utils";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// interface ComponentTab {
//   value: string;
//   label: string;
//   icon?: React.ReactNode;
//   content: React.ReactNode;
// }

// interface ComponentTabsProps {
//   tabs: ComponentTab[];
//   defaultValue?: string;
//   className?: string;
//   persistInUrl?: boolean;
// }

// export function ComponentTabs({
//   tabs,
//   defaultValue,
//   className,
//   persistInUrl = false,
// }: ComponentTabsProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   // If persistInUrl is true, use URL tab parameter or default to first tab
//   const initialTab = React.useMemo(() => {
//     if (persistInUrl) {
//       const tabParam = searchParams?.get("tab");
//       if (tabParam && tabs.some(tab => tab.value === tabParam)) {
//         return tabParam;
//       }
//     }
//     return defaultValue || tabs[0]?.value;
//   }, [defaultValue, persistInUrl, searchParams, tabs]);

//   const [activeTab, setActiveTab] = React.useState(initialTab);

//   // Update URL when tab changes if persistInUrl is true
//   const handleTabChange = React.useCallback((value: string) => {
//     setActiveTab(value);
    
//     if (persistInUrl && pathname) {
//       const params = new URLSearchParams(searchParams?.toString());
//       params.set("tab", value);
//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     }
//   }, [persistInUrl, pathname, router, searchParams]);

//   return (
//     <Tabs 
//       defaultValue={initialTab} 
//       value={activeTab}
//       onValueChange={handleTabChange}
//       className={cn("w-full", className)}
//     >
//       <Box 
//         className="sticky top-[128px] z-10 bg-background/95 backdrop-blur-sm border-b" 
//         p={0}
//       >
//         <Box className="container mx-auto py-2" p={0}>
//           <TabsList className="w-full sm:w-auto">
//             {tabs.map((tab) => (
//               <TabsTrigger 
//                 key={tab.value} 
//                 value={tab.value}
//                 className="flex items-center gap-1.5"
//               >
//                 {tab.icon}
//                 {tab.label}
//               </TabsTrigger>
//             ))}
//           </TabsList>
//         </Box>
//       </Box>
      
//       <Box className="container mx-auto py-6" p={0}>
//         {tabs.map((tab) => (
//           <TabsContent 
//             key={tab.value} 
//             value={tab.value}
//             className="mt-0 focus-visible:outline-none focus-visible:ring-0"
//           >
//             {tab.content}
//           </TabsContent>
//         ))}
//       </Box>
//     </Tabs>
//   );
// }