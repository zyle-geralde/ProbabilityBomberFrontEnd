import React, { useState } from "react";
import HomeNavbar from "../../components/navbar/HomeNavbar";
import LessonProgress from "../../components/statistic/LessonProgress";
import CompletionBreakdown from "../../components/statistic/CompletionBreakdown";
import UpdatePasswordForm from "../../components/forms/UpdatePasswordForm";
import Achievements from "../../components/statistic/Achievements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserTag,faExclamationCircle, faEnvelope, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("statistics"); // default is statistics
  const stages = [
    // Change to get actual data
  { title: "Basic Probability", score: 80, durationMinutes: 20 },
  { title: "Independent & Dependent Probability", score: 65, durationMinutes: 30 },
  { title: "Bayes’ Theorem", score: 90, durationMinutes: 25 },
  ];
  return (
    <>
      <HomeNavbar />

      {/* Header with gradient background */}
      <div className="relative min-h-[300px] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-300 to-[#641B2E] opacity-80"></div>

        <img
          src="/images/authentication_background.png"
          alt="Profile Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <ol className="flex items-center space-x-2 text-sm mb-4">
            <li>
              <Link to="/lessonPage" className="text-white hover:text-gray-200 font-medium">
                Homepage
              </Link>
            </li>
            <li className="text-white">/</li>
            <li className="text-white font-medium min-w-0">Profile</li>
          </ol>

            {/* Username + Info */}
            <h1 className="!text-6xl text-center font-bold mb-2">Username</h1>
            <div className="flex mt-10 flex-col md:flex-row items-center justify-center gap-6 text-gray-200 text-lg">
            <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-white" />
                <strong>Full Name:</strong> <span id="fullname">John Doe</span>
            </span>

            <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-white" />
                <strong>UserName:</strong> <span id="username">John Doe</span>
            </span>

            <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                <strong>Email:</strong> <span id="email">sampleemail@gmail.com</span>
            </span>

            <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-white" />
                <strong>Created At:</strong> <span id="createdAt">5/19/2025</span>
            </span>
            </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto py-8 px-4 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-end gap-6 mb-6 text-sm font-medium border-b">
          <button
            onClick={() => setActiveTab("statistics")}
            className={`pb-2 ${
              activeTab === "statistics"
                ? "border-b-2 border-[#641B2E] text-[#641B2E]"
                : "text-gray-500 hover:text-[#641B2E]"
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setActiveTab("updatePassword")}
            className={`pb-2 ${
              activeTab === "updatePassword"
                ? "border-b-2 border-[#641B2E] text-[#641B2E]"
                : "text-gray-500 hover:text-[#641B2E]"
            }`}
          >
            Update Password
          </button>
        </div>

        {/* Content based on tab */}
        {activeTab === "statistics" ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Stage Progress
                </h2>
                <div className="h-fit">
                  <LessonProgress stages={stages} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Completion Breakdown
                </h2>
                <div className="h-fit">
                  <CompletionBreakdown stages={stages} />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Achievement</h2>
              <div className="h-fit">
                <Achievements/>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Update Password
            </h2>
            {/* Icon above form */}
            <div className="flex justify-center mb-4 text-[#641B2E]">
                <FontAwesomeIcon icon={faExclamationCircle} size="4x" />
            </div>
            <UpdatePasswordForm />
          </div>
        )}
      </div>
    </>
  );
}
