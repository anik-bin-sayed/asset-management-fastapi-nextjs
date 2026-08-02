"use client";

import { useUserProfileQuery } from "@/lib/features/profile/profileApi";
import React, { useState } from "react";
import ProfileNavbar from "../Profile/ProfileNavbar";
import MobileSectionTopBar from "../Profile/MobileSectionTopBar";
import Image from "next/image";
import CountryFlag from "../Profile/ui/CountryFlag";

import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaUser,
  FaVenusMars,
} from "react-icons/fa6";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import { useGetProfileQuery } from "@/lib/features/auth/authApi";
import Loader from "@/utils/Loader";

const UserProfile = ({ userId }) => {
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const {
    data: profile,
    isLoading,
    isError,
  } = useUserProfileQuery({ user_id: userId });

  const {
    data: UserProfile,
    refetch,
    isLoading: UserProfileLoading,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(profile?.id);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  if (UserProfileLoading || isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar profile={UserProfile} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <MobileSectionTopBar />
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 h-fit">
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Profile Image */}
                <Image
                  src={profile?.avatar || "/images/default.jpg"}
                  alt="Profile"
                  width={120}
                  height={120}
                  onClick={() => setPreviewOpen(true)}
                  className="h-32 w-32 rounded-full object-cover border-2 border-gray-300 cursor-pointer transition hover:scale-105"
                />
              </div>
              <h2 className="mt-4 text-2xl font-bold">{profile?.name}</h2>
              {/* country */}
              <CountryFlag profile={profile} />
              <p className="text-sm text-gray-500">{profile?.email}</p>
              <span className="mt-4 rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-700 capitalize">
                {profile?.role}
              </span>
            </div>
            <div className="mt-6 text-center">
              {profile?.bio && (
                <p className="text-sm text-gray-600">{profile.bio}</p>
              )}
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h3 className="text-xl font-bold">Account Information</h3>

              <button
                onClick={copyId}
                className="flex items-center gap-2 rounded-lg border bg-gray-50 px-3 py-2 text-sm transition hover:bg-gray-100 cursor-pointer"
              >
                <span className="max-w-45 truncate">ID: {profile?.id}</span>

                {copied ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <FaCopy className="text-gray-500" />
                )}
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoCard icon={<FaUser />} title="Name" value={profile?.name} />

              <InfoCard
                icon={<FaEnvelope />}
                title="Email"
                value={profile?.email}
              />

              <InfoCard
                icon={<FaPhoneAlt />}
                title="Phone"
                value={profile?.phone || "-"}
              />

              <InfoCard
                icon={<FaVenusMars />}
                title="Gender"
                value={profile?.gender || "-"}
              />

              <InfoCard
                icon={<FaBirthdayCake />}
                title="Date of Birth"
                value={profile?.date_of_birth || "-"}
              />

              <InfoCard
                icon={<FaMapMarkerAlt />}
                title="Address"
                value={profile?.address || "-"}
              />

              <InfoCard
                icon={<FaGlobe />}
                title="Country"
                value={profile?.country || "-"}
              />

              <InfoCard
                icon={<FaGlobe />}
                title="Website"
                value={profile?.website || "-"}
              />

              <InfoCard
                icon={<FaGithub />}
                title="GitHub"
                value={profile?.github || "-"}
              />

              <InfoCard
                icon={<FaLinkedin />}
                title="LinkedIn"
                value={profile?.linkedin || "-"}
              />

              <InfoCard
                icon={<FaShieldAlt />}
                title="Role"
                value={profile?.role}
              />

              <InfoCard
                icon={
                  profile?.is_verified ? <FaCheckCircle /> : <FaTimesCircle />
                }
                title="Verification"
                value={profile?.is_verified ? "Verified" : "Not Verified"}
              />

              <InfoCard
                icon={<FaCalendarAlt />}
                title="Joined"
                value={
                  profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : "-"
                }
              />
            </div>
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Close */}
          <button
            onClick={() => setPreviewOpen(false)}
            className="absolute top-6 right-6 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100 cursor-pointer"
          >
            <FaTimes />
          </button>

          <Image
            src={profile?.avatar || "/default-profile.png"}
            alt="Profile"
            width={700}
            height={700}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => {
  const isUrl = (text) => {
    if (!text || text === "-") return false;

    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="rounded-xl border border-gray-100 p-5 transition">
      <div className="mb-3 text-xl text-black">{icon}</div>

      <p className="text-sm text-gray-500">{title}</p>

      <h4 className="mt-1 font-semibold text-gray-800 break-all">
        {isUrl(value) ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </h4>
    </div>
  );
};

export default UserProfile;
