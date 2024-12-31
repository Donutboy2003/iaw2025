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
      <div className="flex border-b border-gray-600">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === tab.id
                ? "border-gold text-gold"
                : "border-transparent text-white hover:text-gold"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="mt-4 p-4 rounded-lg transition"
        style={{
          background: "transparent",
          boxShadow: "8px 8px 16px rgba(0,0,0,0.6), -8px -8px 16px rgba(255,255,255,0.1)",
        }}
      >
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div key={tab.id} className="text-white">
                {tab.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Tabs;
