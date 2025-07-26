// "use client";

// import React from "react";
// import { Box } from "@/components/ui-library/box";
// import { Flex } from "@/components/ui-library/flex";
// import { Heading, Text } from "@/components/ui-library/typography";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Copy, Code, Sun, Moon, RotateCcw, Maximize2, ExternalLink, Check } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useTheme } from "next-themes";
// import { motion, AnimatePresence } from "framer-motion";

// interface ComponentPreviewProps {
//   title?: string;
//   description?: string;
//   code?: string;
//   exampleUrl?: string;
//   className?: string;
//   preview: React.ReactNode;
//   children?: React.ReactNode;
// }

// export function ComponentPreview({
//   title,
//   description,
//   code,
//   exampleUrl,
//   className,
//   preview,
//   children,
// }: ComponentPreviewProps) {
//   const { theme, setTheme } = useTheme();
//   const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
//   const [previewMode, setPreviewMode] = React.useState<"responsive" | "default">("default");
//   const [copied, setCopied] = React.useState(false);
  
//   const copyToClipboard = React.useCallback(async () => {
//     if (!code) return;
    
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy code:", err);
//     }
//   }, [code]);

//   return (
//     <Box 
//       className={cn(
//         "rounded-lg border bg-card",
//         className
//       )}
//       p={0}
//     >
//       <Flex justify="between" align="center" className="px-4 py-2 border-b">
//         <Box>
//           {title && <Heading level="h3" className="text-lg">{title}</Heading>}
//           {description && <Text size="sm" color="muted">{description}</Text>}
//         </Box>
//         <Flex gap={2}>
//           <Button 
//             variant="ghost" 
//             size="icon"
//             onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           >
//             <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setPreviewMode(previewMode === "default" ? "responsive" : "default")}
//           >
//             <Maximize2 className="h-4 w-4" />
//             <span className="sr-only">Toggle responsive preview</span>
//           </Button>
//           {exampleUrl && (
//             <Button
//               variant="ghost"
//               size="icon"
//               asChild
//             >
//               <a href={exampleUrl} target="_blank" rel="noreferrer">
//                 <ExternalLink className="h-4 w-4" />
//                 <span className="sr-only">Open example</span>
//               </a>
//             </Button>
//           )}
//         </Flex>
//       </Flex>

//       <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "preview" | "code")}>
//         <TabsList className="border-b rounded-none p-0 h-10 bg-transparent">
//           <TabsTrigger
//             value="preview"
//             className={cn(
//               "rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
//               "px-4 h-10"
//             )}
//           >
//             Preview
//           </TabsTrigger>
//           <TabsTrigger
//             value="code"
//             className={cn(
//               "rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
//               "px-4 h-10"
//             )}
//           >
//             Code
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="preview" className="p-6 bg-background/50">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`preview-${previewMode}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className={cn(
//                 "w-full transition-all",
//                 previewMode === "responsive" ? "flex flex-col space-y-4" : ""
//               )}
//             >
//               {preview}
//               {children}
//             </motion.div>
//           </AnimatePresence>
//         </TabsContent>

//         <TabsContent value="code" className="relative">
//           <Flex justify="end" className="absolute right-4 top-4 z-10">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={copyToClipboard}
//               className="relative"
//             >
//               {copied ? (
//                 <Check className="h-4 w-4 text-green-500" />
//               ) : (
//                 <Copy className="h-4 w-4" />
//               )}
//               <span className="sr-only">Copy code</span>
//             </Button>
//           </Flex>
//           <pre className="p-4 overflow-x-auto bg-muted/50 rounded-b-lg">
//             <code className="text-sm language-tsx">{code}</code>
//           </pre>
//         </TabsContent>
//       </Tabs>
//     </Box>
//   );
// }