import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="text-gray-700">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;