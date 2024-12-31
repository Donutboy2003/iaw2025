// components/ui/tabs.tsx

import { useState, useRef } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % tabs.length;
      tabsRef.current[nextIndex]?.focus();
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      tabsRef.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="w-full">
      {/* Pills Container */}
      <div
        role="tablist"
        className="
          flex items-center justify-center
          flex-wrap md:flex-nowrap
          gap-2
          mx-auto
          mb-4
          w-full
        "
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              flex-1 
              px-4 py-2 
              text-sm sm:text-base font-medium
              rounded-full
              transition
              whitespace-nowrap
              text-center
              h-12
              ${
                activeTab === tab.id
                  ? "bg-gold text-black shadow-lg"
                  : "bg-gray-800 text-white hover:bg-gray-700 shadow-md"
              }
              focus:outline-none focus:ring-2 focus:ring-yellow-400
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 p-4 bg-black bg-opacity-40 rounded-lg shadow-md">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div
                key={tab.id}
                id={`${tab.id}-panel`}
                role="tabpanel"
                aria-labelledby={`${tab.id}-tab`}
                className="text-white text-sm sm:text-base"
              >
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
