"use client";

import React, { useState } from "react";
import Link from "next/link";
import CreateFreeVideos from "./CreateFreeVideos";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdManageHistory, MdOutlineVideoStable } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import FreeVideoList from "./FreeVideoList";

const CoursesIcon = () => (
  <span className="text-xl">
    <MdOutlineVideoStable />
  </span>
);
const FreeVideosIcon = () => (
  <span className="text-xl">
    <MdOutlineVideoStable />
  </span>
);
const CreateIcon = () => (
  <span className="text-xl">
    <CiCirclePlus />
  </span>
);
const SettingsIcon = () => (
  <span className="text-xl">
    <MdManageHistory />
  </span>
);

const ManageCourse = ({ profileData }) => {
  // Mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "all-free-videos";

  const renderContent = () => {
    switch (activeTab) {
      case "all-courses":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Courses</h2>
            <p className="text-gray-600">
              List of all courses (paid + free) will appear here.
            </p>
            {/* You can put your course table/list here */}
          </div>
        );
      case "all-free-videos":
        return <FreeVideoList />;

      case "create-free-video":
        return <CreateFreeVideos />;
      case "manage-course":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Course Settings</h2>
            <p className="text-gray-600">Edit course details, delete, etc.</p>
          </div>
        );
      default:
        return <div className="p-6">Select an option</div>;
    }
  };

  // Navigation items
  const navItems = [
    { id: "all-courses", label: "All Courses", icon: <CoursesIcon /> },
    { id: "all-free-videos", label: "Free Videos", icon: <FreeVideosIcon /> },
    {
      id: "create-free-video",
      label: "Create Free Video",
      icon: <CreateIcon />,
    },
    { id: "manage-course", label: "Manage Course", icon: <SettingsIcon /> },
  ];

  const handleTabChange = (tabId) => {
    router.push(`?tab=${tabId}`, {
      scroll: false,
    });

    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="text-xl font-bold text-gray-900">Learn </span>
            <span className="text-xl bg-yellow-500 rounded px-2 py-1 font-bold text-gray-900">
              Hub
            </span>
          </Link>

          <button
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(false)}
          >
            <RxCross2 />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-yellow-100 text-yellow-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sidebar footer (optional) */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Admin Panel v1.0</p>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar with hamburger */}
        <header className="bg-white h-16 flex items-center px-4 lg:px-6 border-b border-gray-200 shadow">
          <button
            className="lg:hidden px-2 py-1 rounded-md hover:bg-gray-100 border border-gray-300 text-2xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            <IoReorderThreeOutline />
          </button>
          <h1 className="text-lg font-semibold ml-3">
            {navItems.find((item) => item.id === activeTab)?.label ||
              "Dashboard"}
          </h1>
          <div className="ml-auto flex items-center space-x-3 border border-gray-300 px-4 py-2 rounded-lg bg-gray-100">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border border-gray-400 overflow-hidden">
              <Image
                src={profileData?.avatar || "/images/default.jpg"}
                alt={profileData?.name || "User Avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ManageCourse;
