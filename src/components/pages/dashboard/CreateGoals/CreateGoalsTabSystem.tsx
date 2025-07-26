"use client";

import { ConfigProvider } from "antd";
import { useSearchParams } from "next/navigation";
import AllGoalsGridView from "./AllGoalsGridView";
import CreateGoalsForm from "./CreateGoalsForm";


export default function CreateGoalsTabSystem() {
  const query = useSearchParams();
  const initialTab = query?.get("tab") || "all-goals";

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(query.toString());
    if (tab === "create") {
      params.set("tab", "create");
    } else if (tab === "all-goals") {
      params.set("tab", "all-goals");
    }
    // Update the URL with the new query parameters
    window.history.pushState({}, "", `?${params.toString()}`);
  };

  return (
    <div className="md:p-4 bg-[#F9F9FB] my-4 md:border border-[#D9D9D9] rounded h-full overflow-hidden overflow-y-auto">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00473E", // Custom primary color
            colorBgContainer: "white", // Custom background color
          },
        }}
      >
        <div className=" p-6 bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8 justify-center">
              <button
                onClick={() => handleTabChange("all-goals")}
                className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  initialTab === "all-goals"
                    ? "border-[#00473E] text-[#00473E] px-10"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
            All Goals
              </button>
              <button
                onClick={() => handleTabChange("create")}
                className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
                  initialTab === "create"
                    ? "border-[#00473E] text-[#00473E] px-10"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Create New
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {initialTab === "all-goals" ? <AllGoalsGridView /> : <CreateGoalsForm />}
        </div>
      </ConfigProvider>
    </div>
  );
}
