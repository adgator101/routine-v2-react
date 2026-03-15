import React from "react";
import {
  X,
  Clock,
  MapPin,
  BookOpen,
  Users,
  Award,
  Mail,
  ClipboardList,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ClassDetailModal = ({ data, onModalClose }) => {
  const teacherImage = data?.teacher?.imageUrl || data?.teacher?.image || null;
  const teacherInitial = data?.teacher?.name?.charAt(0)?.toUpperCase() ?? "?";

  const formatTime = (time) => {
    if (!time) return "";
    const [h, m] = time.split(":");
    const hour12 = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 32 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          {/* ── Header bar ─────────────────────────────────────────── */}
          <div className="relative bg-[#F84178] px-6 pb-5 pt-6">
            <button
              onClick={onModalClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 active:scale-90"
            >
              <X size={16} />
            </button>

            {/* Session type pill */}
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
              <Award size={11} />
              {data.classType}
            </span>

            <h1 className="mb-3 pr-8 font-poppins text-xl font-bold leading-tight text-white">
              {data.moduleName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span className="font-medium">
                  {formatTime(data.startTime)} – {formatTime(data.endTime)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} />
                <span className="font-medium">{data.room}</span>
              </div>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────────────── */}
          <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 160px)" }}>
            <div className="space-y-6 p-6">

              {/* Class Information */}
              <section>
                <SectionHeader icon={<ClipboardList size={16} />} title="Class Information" />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <DataCard
                    icon={<BookOpen size={14} className="text-[#F84178]" />}
                    label="Module Code"
                    value={data.moduleCode}
                  />
                  <DataCard
                    icon={<Award size={14} className="text-violet-500" />}
                    label="Class Type"
                    value={data.classType}
                  />
                  <DataCard
                    icon={<Users size={14} className="text-emerald-500" />}
                    label="Group"
                    value={data.joinedGroups?.join(", ") || data.group || "—"}
                  />
                  <DataCard
                    icon={<MapPin size={14} className="text-blue-500" />}
                    label="Room"
                    value={data.room}
                  />
                </div>
              </section>

              {/* Instructor */}
              <section>
                <SectionHeader icon={<User size={16} />} title="Instructor" />
                <div className="mt-3 flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  {/* Avatar */}
                  {teacherImage ? (
                    <img
                      src={teacherImage}
                      alt={data.teacher.name}
                      className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover shadow"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F84178]/10 text-xl font-bold text-[#F84178] shadow-sm border-2 border-white">
                      {teacherInitial}
                    </div>
                  )}

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="font-poppins font-bold text-gray-900">
                      {data.teacher.name}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">Faculty Member</p>
                    {data.teacher.email && (
                      <a
                        href={`mailto:${data.teacher.email}`}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#F84178]/10 px-3 py-1 text-xs font-medium text-[#F84178] transition hover:bg-[#F84178]/20"
                      >
                        <Mail size={11} />
                        {data.teacher.email}
                      </a>
                    )}
                  </div>
                </div>
              </section>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ClassDetailModal;

/* ── Sub-components ──────────────────────────────────────────────────── */

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2">
    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F84178]/10 text-[#F84178]">
      {icon}
    </div>
    <h2 className="font-poppins font-semibold text-gray-800">{title}</h2>
  </div>
);

const DataCard = ({ icon, label, value }) => (
  <div className="group rounded-lg border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F84178]/20 hover:shadow-md">
    <div className="mb-1.5 flex items-center justify-between">
      <p className="text-xs font-medium text-gray-400">{label}</p>
      <div className="rounded-md bg-gray-50 p-1 transition group-hover:bg-[#F84178]/8">
        {icon}
      </div>
    </div>
    <p className="font-semibold text-gray-800 transition-colors group-hover:text-[#F84178]">
      {value || "—"}
    </p>
  </div>
);

