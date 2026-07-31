"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useGetProfileQuery } from "@/lib/features/auth/authApi";

import Loader from "@/utils/Loader";
import ProfileNavbar from "./ProfileNavbar";

import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaShieldAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaCheck,
  FaCopy,
} from "react-icons/fa";
import MobileSectionTopBar from "./MobileSectionTopBar";

const ProfileComponent = () => {
  const [copied, setCopied] = useState(false);

  // redux
  const { data: profile, isLoading } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loader />;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileNavbar profile={profile} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <MobileSectionTopBar />
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 h-fit">
            <div className="flex flex-col items-center">
              <Image
                src="https://i.pravatar.cc/100"
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-yellow-100 object-cover"
              />

              <h2 className="mt-4 text-2xl font-bold">{profile?.name}</h2>

              <p className="text-sm text-gray-500">{profile?.email}</p>

              <span className="mt-4 rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-700 capitalize">
                {profile?.role}
              </span>
              <button className="mt-4 rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-500 cursor-pointer">
                Edit Profile
              </button>
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
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="rounded-xl border border-gray-100 p-5 transition">
    <div className="mb-3 text-xl text-yellow-500">{icon}</div>

    <p className="text-sm text-gray-500">{title}</p>

    <h4 className="mt-1 font-semibold text-gray-800 break-all">{value}</h4>
  </div>
);

export default ProfileComponent;
