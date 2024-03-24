import React from "react";
import { getDetails } from "../API/Auth";
import { useEffect, useState } from "react";
import Accountheader from "../Components/Accountheader.jsx";
import GeneralPage from "../Components/AccountPages/GeneralPage.jsx";
import SecurityPage from "../Components/AccountPages/SecurityPage.jsx";
import ShareDataPage from "../Components/AccountPages/ShareDataPage.jsx";
import Shop from "../Components/AccountPages/Shop.jsx";

function Account() {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("General");
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    let profileData = await getDetails();
    setData(profileData);
  };

  const handleTabClick = (tab) => {
    console.log(`Selected tab: ${tab}`);
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "General":
        return <GeneralPage />;
      case "Security":
        return <SecurityPage />;
      case "Share Data":
        return <ShareDataPage />;
      case "Shop":
        return <Shop />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Accountheader Username={data.username} handleTabClick={handleTabClick} />

      {renderTabContent()}
    </div>
  );
}

export default Account;
