"use client";

import React, { useRef, useState } from "react";
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
  FaCamera,
  FaTimes,
} from "react-icons/fa";
import MobileSectionTopBar from "./MobileSectionTopBar";
import { useUploadAvatarMutation } from "@/lib/features/profile/profileApi";

const ProfileComponent = () => {
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  // redux
  const {
    data: profile,
    refetch,
    isLoading,
  } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [uploadAvatar, { isLoading: uploading }] = useUploadAvatarMutation();

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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await uploadAvatar(formData).unwrap();
      await refetch();
    } catch (err) {
      console.log(err);
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
              <div className="relative">
                {/* Profile Image */}
                <Image
                  src={profile?.avatar || "/default-profile.png"}
                  alt="Profile"
                  width={120}
                  height={120}
                  onClick={() => setPreviewOpen(true)}
                  className="h-32 w-32 rounded-full object-cover border-2 border-gray-300 cursor-pointer transition hover:scale-105"
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                    <div className="h-10 w-10 rounded-full border-4 border-white border-t-transparent animate-spin" />
                  </div>
                )}

                {/* Camera Button */}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg hover:bg-yellow-500 transition cursor-pointer"
                >
                  <FaCamera size={16} />
                </button>

                {/* Hidden Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>

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

const InfoCard = ({ icon, title, value }) => (
  <div className="rounded-xl border border-gray-100 p-5 transition">
    <div className="mb-3 text-xl text-yellow-500">{icon}</div>

    <p className="text-sm text-gray-500">{title}</p>

    <h4 className="mt-1 font-semibold text-gray-800 break-all">{value}</h4>
  </div>
);

export default ProfileComponent;
