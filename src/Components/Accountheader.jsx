import React, {useState } from "react";
import "./Accountheader.css";
function Accountheader({Username="Loading User", handleTabClick}) {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="profile">
      <div className="profile-avatar">
        <img
          src="./img/profilePictures/purpleProfilepicture.png"
          alt="profile"
          className="profile-img"
        ></img>
        <div className="profile-name">{Username}</div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
        alt=""
        className="profile-cover"
      ></img>
      <div className="profile-menu">
        <a
          href="#general" 
          className={`profile-menu-link ${activeTab === "General" && "active"}`}
          onClick={() => { handleTabClick("General"); setActiveTab("General");}} 
        >
          General
        </a>
        <a
          href="#security" 
          className={`profile-menu-link ${activeTab === "Security" && "active"}`}
          onClick={() => { handleTabClick("Security"); setActiveTab("Security");}}
        >
          Security
        </a>
        <a
          href="#share-data" 
          className={`profile-menu-link ${activeTab === "Share Data" && "active"}`}
          onClick={() => { handleTabClick("Share Data"); setActiveTab("Share Data");}}
        >
          Share Data
        </a>
        <a
          href="#shop" 
          className={`profile-menu-link ${activeTab === "Shop" && "active"}`}
          onClick={() => { handleTabClick("Shop"); setActiveTab("Shop");}}
        >
          Buy more Storage
        </a>
      </div>
    </div>
  );
}

export default Accountheader;
