import React, { useState } from "react";

const DataTabs = ({ tabData }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const onChange = (tab) => setCurrentTab(tab);

  return (
    <div className="tabs">
      {/* ================ TAB NAV ================ */}
      <nav className="px-0 mx-[-24px] text-sm font-medium">
        <ul className="flex space-x-3">
          {tabData.map((tab, key) => {
            const isActive = key === currentTab;

            return (
              <li key={tab.label}>
                <button
                  className={`py-6 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-700 hover:border-b-2 hover:border-blue-500 dark:text-gray-100 dark:hover:text-gray-200 ${
                    isActive
                      ? "text-blue-500 dark:text-gray-100 border-b-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => onChange(key)}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* ================ TAB NAV ================ */}

      {/* ================ TAB CONTENT ================ */}
      <div className="tab-content">{tabData[currentTab].content}</div>
      {/* ================ TAB CONTENT ================ */}
    </div>
  );
};

export default DataTabs;
