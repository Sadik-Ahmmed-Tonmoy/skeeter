/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box } from "@/components/ui-library/box";
import { Flex } from "@/components/ui-library/flex";
import { ArrowLeft, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/buttons/button";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(false);


  const token = useAppSelector(useCurrentToken);
  const { data: userData } = useGetMeQuery({
    skip: !token, // Skip if no token is available
  });




  // Close sidebar on route change or window resize (on larger screens)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-3 lg:px-16 border-b border-[#74747480] py-2">
           <Box
            className={cn(
              "sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden"
            )}
            //   px={4}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
        
            
          </Box>


        <h3 className="text-[40px] text-[#004138] times-new-roman">VetCheck</h3>
        {/* profile icon with name */}
     <div>
      {/*  */}
         <div className="hidden  lg:flex items-center space-x-4">
          {userData?.result?.profileImage ? (
            <img
              src={userData?.result?.profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-contain border"
            />
          ) : (
            <IoPersonCircleOutline size={38} />
          )}

          <div>
            <p className="text-base font-semibold text-[#171717]">
              {userData?.result?.fullName}
            </p>
            <p className="text-base font-medium text-[#747474]">Admin</p>
          </div>
        </div>
     </div>
      </div>
      <Flex className="h-full relative">
        {/* Desktop sidebar */}
        <Box
          as="aside"
          className="hidden lg:block w-72  h-full sticky top-0 overflow-hidden"
        >
          <SidebarNav setShowSidebar={setShowSidebar}/>
        </Box>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {showSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setShowSidebar(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed top-0 left-0 bottom-0 w-full max-w-72 border-r z-50 bg-white lg:hidden"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-2"
                  onClick={() => setShowSidebar(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <SidebarNav setShowSidebar={setShowSidebar} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <Box as="main" className="flex-1 min-w-0">
          {/* Mobile header */}
       

          {/* Component content */}

          <Box className="flex-1">{children}</Box>
        </Box>
      </Flex>
    </>
  );
}

const SidebarNav = ({ setShowSidebar }: any) => {

  const sections = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M2.72778 3.76953H4.71997V4.94141H2.72778V3.76953Z"
            className="fill-current"
          />
          <path
            d="M2.72778 5.76172H4.71997V6.93359H2.72778V5.76172Z"
            className="fill-current"
          />
          <path
            d="M9.00391 3.76953H10.9961V4.94141H9.00391V3.76953Z"
            className="fill-current"
          />
          <path
            d="M9.00391 5.76172H10.9961V6.93359H9.00391V5.76172Z"
            className="fill-current"
          />
          <path
            d="M0 1.99219C0 6.7189 0 13.2942 0 18.0078H20C20 17.1425 20 2.90588 20 1.99219C19.3562 1.99219 0.467682 1.99219 0 1.99219ZM7.44797 3.16406H12.5522V7.53906H7.44797V3.16406ZM1.17188 3.16406H6.27609V7.53906H1.17188V3.16406ZM18.8281 16.8359H1.17188V8.71094C2.95395 8.71094 17.0515 8.71094 18.8281 8.71094V16.8359ZM13.7239 7.53906V3.16406H18.8281V7.53906H13.7239Z"
            className="fill-current"
          />
          <path
            d="M15.28 3.76953H17.2722V4.94141H15.28V3.76953Z"
            className="fill-current"
          />
          <path
            d="M15.28 5.76172H17.2722V6.93359H15.28V5.76172Z"
            className="fill-current"
          />
          <path
            d="M10.5518 10.6473L7.49847 13.7006L6.09543 12.2977L3.35693 15.0362L4.18549 15.8649L6.09543 13.9549L7.49847 15.358L10.5518 12.3045L12.7002 14.453L16.6431 10.5101L15.8145 9.6814L12.7002 12.7957L10.5518 10.6473Z"
            className="fill-current"
          />
        </svg>
      ),
    },
    {
      title: "User List",
      href: "/dashboard/user-list",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clipPath="url(#clip0_386_939)">
            <path
              d="M9.93522 8.87265C11.4949 8.87265 12.7639 7.60371 12.7639 6.04399C12.7639 4.48428 11.4949 3.21538 9.93522 3.21538C8.3755 3.21538 7.10657 4.48432 7.10657 6.04399C7.10657 7.60371 8.3755 8.87265 9.93522 8.87265ZM9.93522 4.39068C10.8469 4.39068 11.5885 5.13236 11.5885 6.04395C11.5885 6.95563 10.8469 7.69727 9.93522 7.69727C9.02359 7.69727 8.28191 6.95559 8.28191 6.04395C8.28191 5.13236 9.02359 4.39068 9.93522 4.39068Z"
              className="fill-current"
            />
            <path
              d="M9.93525 14.0123C13.7984 14.0123 16.9414 10.8693 16.9414 7.00613C16.9414 3.14294 13.7985 0 9.93525 0C6.07202 0 2.92908 3.14294 2.92908 7.00613C2.92908 10.8693 6.07202 14.0123 9.93525 14.0123ZM6.57028 11.7654C7.0349 10.7376 8.07833 10.0481 9.23138 10.0481H10.6392C11.7922 10.0481 12.8356 10.7376 13.3002 11.7654C12.349 12.44 11.1876 12.837 9.93529 12.837C8.68288 12.837 7.52157 12.44 6.57028 11.7654ZM9.93525 1.17534C13.1504 1.17534 15.7661 3.79102 15.7661 7.00613C15.7661 8.53345 15.1755 9.92525 14.2111 10.9659C13.9365 10.4764 13.5624 10.0424 13.1133 9.70193C12.3976 9.15943 11.5421 8.87269 10.6392 8.87269H9.23134C8.3284 8.87269 7.47287 9.15943 6.75724 9.70193C6.30814 10.0424 5.93399 10.4764 5.65939 10.9659C4.69499 9.92521 4.10442 8.53345 4.10442 7.00613C4.10442 3.79102 6.72014 1.17534 9.93525 1.17534Z"
              className="fill-current"
            />
            <path
              d="M3.87899 16.8481L3.11471 15.304L2.35038 16.8481L0.64563 17.0978L1.87805 18.3019L1.58876 20.0003L3.11471 19.2003L4.64065 20.0003L4.35132 18.3019L5.58371 17.0978L3.87899 16.8481Z"
              className="fill-current"
            />
            <path
              d="M10.7644 16.8481L10.0001 15.304L9.2358 16.8481L7.53101 17.0978L8.76343 18.3019L8.47414 20.0003L10.0001 19.2003L11.526 20.0003L11.2367 18.3019L12.4691 17.0978L10.7644 16.8481Z"
              className="fill-current"
            />
            <path
              d="M19.3545 17.0978L17.6497 16.8481L16.8855 15.304L16.1212 16.8481L14.4164 17.0978L15.6488 18.3019L15.3595 20.0003L16.8855 19.2003L18.4114 20.0003L18.1221 18.3019L19.3545 17.0978Z"
              className="fill-current"
            />
          </g>
          <defs>
            <clipPath id="clip0_386_939">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      title: "Article",
      href: "/dashboard/article",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4.82139 2.14285C4.11099 2.14285 3.42969 2.42506 2.92736 2.92739C2.42503 3.42972 2.14282 4.11102 2.14282 4.82142V15.1786C2.14282 15.889 2.42503 16.5703 2.92736 17.0726C3.42969 17.5749 4.11099 17.8571 4.82139 17.8571H15.1785C15.8889 17.8571 16.5702 17.5749 17.0726 17.0726C17.5749 16.5703 17.8571 15.889 17.8571 15.1786V4.82142C17.8571 4.11102 17.5749 3.42972 17.0726 2.92739C16.5702 2.42506 15.8889 2.14285 15.1785 2.14285H4.82139ZM3.21425 4.82142C3.21425 4.39518 3.38357 3.9864 3.68497 3.685C3.98637 3.38361 4.39515 3.21428 4.82139 3.21428H15.1785C15.6048 3.21428 16.0136 3.38361 16.315 3.685C16.6164 3.9864 16.7857 4.39518 16.7857 4.82142V15.1786C16.7857 15.6048 16.6164 16.0136 16.315 16.315C16.0136 16.6164 15.6048 16.7857 15.1785 16.7857H4.82139C4.39515 16.7857 3.98637 16.6164 3.68497 16.315C3.38357 16.0136 3.21425 15.6048 3.21425 15.1786V4.82142ZM4.28568 6.42857C4.28568 6.04969 4.43619 5.68632 4.7041 5.41841C4.97201 5.15051 5.33537 5 5.71425 5H14.2857C14.6646 5 15.0279 5.15051 15.2958 5.41841C15.5637 5.68632 15.7143 6.04969 15.7143 6.42857V7.85714C15.7143 8.23602 15.5637 8.59938 15.2958 8.86729C15.0279 9.1352 14.6646 9.28571 14.2857 9.28571H5.71425C5.33537 9.28571 4.97201 9.1352 4.7041 8.86729C4.43619 8.59938 4.28568 8.23602 4.28568 7.85714V6.42857ZM5.71425 6.07142C5.61953 6.07142 5.52869 6.10905 5.46171 6.17603C5.39474 6.24301 5.35711 6.33385 5.35711 6.42857V7.85714C5.35711 7.95186 5.39474 8.0427 5.46171 8.10968C5.52869 8.17665 5.61953 8.21428 5.71425 8.21428H14.2857C14.3804 8.21428 14.4712 8.17665 14.5382 8.10968C14.6052 8.0427 14.6428 7.95186 14.6428 7.85714V6.42857C14.6428 6.33385 14.6052 6.24301 14.5382 6.17603C14.4712 6.10905 14.3804 6.07142 14.2857 6.07142H5.71425ZM4.28568 11.25C4.28568 11.1079 4.34212 10.9717 4.44259 10.8712C4.54305 10.7707 4.67931 10.7143 4.82139 10.7143H8.74997C8.89205 10.7143 9.02831 10.7707 9.12877 10.8712C9.22924 10.9717 9.28568 11.1079 9.28568 11.25C9.28568 11.3921 9.22924 11.5283 9.12877 11.6288C9.02831 11.7293 8.89205 11.7857 8.74997 11.7857H4.82139C4.67931 11.7857 4.54305 11.7293 4.44259 11.6288C4.34212 11.5283 4.28568 11.3921 4.28568 11.25ZM4.82139 13.3929C4.67931 13.3929 4.54305 13.4493 4.44259 13.5498C4.34212 13.6502 4.28568 13.7865 4.28568 13.9286C4.28568 14.0706 4.34212 14.2069 4.44259 14.3074C4.54305 14.4078 4.67931 14.4643 4.82139 14.4643H8.74997C8.89205 14.4643 9.02831 14.4078 9.12877 14.3074C9.22924 14.2069 9.28568 14.0706 9.28568 13.9286C9.28568 13.7865 9.22924 13.6502 9.12877 13.5498C9.02831 13.4493 8.89205 13.3929 8.74997 13.3929H4.82139ZM11.0714 11.6071C11.0714 10.9171 11.6314 10.3571 12.3214 10.3571H14.4643C15.1543 10.3571 15.7143 10.9171 15.7143 11.6071V13.75C15.7143 14.0815 15.5826 14.3995 15.3481 14.6339C15.1137 14.8683 14.7958 15 14.4643 15H12.3214C11.9899 15 11.6719 14.8683 11.4375 14.6339C11.2031 14.3995 11.0714 14.0815 11.0714 13.75V11.6071ZM12.3214 11.4286C12.274 11.4286 12.2286 11.4474 12.1951 11.4809C12.1616 11.5144 12.1428 11.5598 12.1428 11.6071V13.75C12.1428 13.8486 12.2228 13.9286 12.3214 13.9286H14.4643C14.5116 13.9286 14.557 13.9098 14.5905 13.8763C14.624 13.8428 14.6428 13.7974 14.6428 13.75V11.6071C14.6428 11.5598 14.624 11.5144 14.5905 11.4809C14.557 11.4474 14.5116 11.4286 14.4643 11.4286H12.3214Z"
            className="fill-current"
          />
        </svg>
      ),
    },
    {
      title: "Grounding Sound",
      href: "/dashboard/grounding-sound",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M2.08337 10C2.08337 6.26806 2.08337 4.40209 3.24274 3.24271C4.40212 2.08334 6.26809 2.08334 10 2.08334C13.732 2.08334 15.598 2.08334 16.7574 3.24271C17.9167 4.40209 17.9167 6.26806 17.9167 10C17.9167 13.7319 17.9167 15.5979 16.7574 16.7573C15.598 17.9167 13.732 17.9167 10 17.9167C6.26809 17.9167 4.40212 17.9167 3.24274 16.7573C2.08337 15.5979 2.08337 13.7319 2.08337 10Z"
            stroke="#747474"
            strokeWidth="1.5"
          />
          <path
            d="M10.8333 12.0833C10.8333 13.2339 9.90054 14.1667 8.74996 14.1667C7.59937 14.1667 6.66663 13.2339 6.66663 12.0833C6.66663 10.9328 7.59937 10 8.74996 10C9.90054 10 10.8333 10.9328 10.8333 12.0833ZM10.8333 12.0833V5.83334C11.111 6.25001 11.3333 8.00001 13.3333 8.33334"
            stroke="#747474"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Create Goals",
      href: "/dashboard/goals",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M3.75 7.91666C3.75 11.3684 6.54822 14.1667 10 14.1667C13.4517 14.1667 16.25 11.3684 16.25 7.91666C16.25 4.46487 13.4517 1.66666 10 1.66666C6.54822 1.66666 3.75 4.46487 3.75 7.91666Z"
            stroke="#747474"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 8.47225C7.5 8.47225 8.125 8.47225 8.75 9.58333C8.75 9.58333 10.7353 6.80556 12.5 6.25"
            stroke="#747474"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.0687 12.5L14.6272 15.1749C14.9861 16.8936 15.1655 17.7529 14.7969 18.1602C14.4284 18.5675 13.7883 18.2172 12.5082 17.5165L10.6137 16.4794C10.3112 16.3138 10.1599 16.2311 10 16.2311C9.84008 16.2311 9.68883 16.3138 9.38633 16.4794L7.49173 17.5165C6.21164 18.2172 5.5716 18.5675 5.20304 18.1602C4.83449 17.7529 5.01391 16.8936 5.37276 15.1749L5.93127 12.5"
            stroke="#747474"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const pathname = usePathname();
  const isActive = (href: string) => {
    const normalizedHref = href.replace(/\/$/, "");
    const normalizedPath = pathname.replace(/\/$/, "");

    if (normalizedHref === "/dashboard") {
      return normalizedPath === "/dashboard";
    }

    return normalizedPath.startsWith(normalizedHref);
  };



  return (
    <div className="flex flex-col  h-full p-4 space-y-2 lg:ps-14 mt-10 lg:mt-0">
      {sections.map((section) => (
        <div     key={section.href}  onClick={() => setShowSidebar(false)}>
          <Link
      
          href={section.href}
          // onClick={() => setShowSidebar(false)}
          className={cn(
            "flex items-center space-x-2 p-2 text-[#747474] hover:bg-[#00473E] hover:text-white rounded transition-colors",
            {
              "bg-[#00473E] text-white": isActive(section.href),
            }
          )}
        >
          <span
            className={cn({
              "text-white": isActive(section.href),
              "text-[#747474]": !isActive(section.href),
            })}
          >
            {section.icon}
          </span>
          <span className="font-medium">{section.title}</span>
        </Link>
        </div>
      ))}
    </div>
  );
};
