import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  AlertTriangle,
  CalendarClock,
  Users2,
  BookOpen,
  DoorOpen,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { getAllTeachers } from "@/services/teacherServices";
import { getAllUsers } from "@/services/userServices";
import { getIssueStats, getIssues } from "@/services/issueServices";
import { getAllGroups } from "@/services/groupServices";
import { getAllModules } from "@/services/moduleServices";
import { getAllRooms } from "@/services/roomServices";
import { formatDate } from "@/lib/dateUtils";

const StatCard = ({ icon: Icon, label, value, sub, color, to }) => (
  <Link
    to={to}
    className="group relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1.5 text-3xl font-bold text-foreground">
          {value ?? <span className="inline-block h-8 w-16 animate-pulse rounded bg-muted" />}
        </p>
        {sub && (
          <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
        )}
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-pink-600 transition-colors">
      <span>View details</span>
      <ArrowRight size={12} />
    </div>
  </Link>
);

const IssueStatusBadge = ({ status }) => {
  const map = {
    OPEN: "bg-red-100 text-red-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    RESOLVED: "bg-green-100 text-green-700",
    CLOSED: "bg-gray-100 text-gray-600",
  };
  const labels = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    CLOSED: "Closed",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${map[status] || map.CLOSED}`}>
      {labels[status] || status}
    </span>
  );
};

function Dashboard() {
  const [stats, setStats] = useState({
    teachers: null,
    users: null,
    issueStats: null,
    groups: null,
    modules: null,
    rooms: null,
  });
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [teachers, users, issueStats, groups, modules, rooms, issues] =
        await Promise.allSettled([
          getAllTeachers(),
          getAllUsers(),
          getIssueStats(),
          getAllGroups(),
          getAllModules(),
          getAllRooms(),
          getIssues(),
        ]);

      setStats({
        teachers: teachers.status === "fulfilled" ? teachers.value?.length ?? 0 : "—",
        users: users.status === "fulfilled" ? users.value?.length ?? 0 : "—",
        issueStats: issueStats.status === "fulfilled" ? issueStats.value?.data : null,
        groups: groups.status === "fulfilled" ? groups.value?.length ?? 0 : "—",
        modules: modules.status === "fulfilled" ? modules.value?.length ?? 0 : "—",
        rooms: rooms.status === "fulfilled" ? rooms.value?.length ?? 0 : "—",
      });

      if (issues.status === "fulfilled") {
        const all = Array.isArray(issues.value?.data) ? issues.value.data : [];
        setRecentIssues(
          [...all]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openIssues = stats.issueStats?.byStatus?.open ?? 0;
  const inProgressIssues = stats.issueStats?.byStatus?.inProgress ?? 0;
  const resolvedIssues = stats.issueStats?.byStatus?.resolved ?? 0;
  const totalIssues = stats.issueStats?.total ?? 0;

  const resolutionRate =
    totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Welcome back — here's what's happening today.
          </p>
        </div>
        <button
          onClick={fetchAll}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Primary stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={GraduationCap}
          label="Teachers"
          value={stats.teachers}
          sub="Registered faculty"
          color="bg-violet-500"
          to="/admin/teachers"
        />
        <StatCard
          icon={Users}
          label="Users"
          value={stats.users}
          sub="Registered students"
          color="bg-blue-500"
          to="/admin/users"
        />
        <StatCard
          icon={AlertTriangle}
          label="Open Issues"
          value={stats.issueStats !== undefined ? openIssues : null}
          sub={`${inProgressIssues} in progress`}
          color={openIssues > 0 ? "bg-red-500" : "bg-green-500"}
          to="/admin/issues"
        />
        <StatCard
          icon={TrendingUp}
          label="Resolution Rate"
          value={stats.issueStats !== undefined ? `${resolutionRate}%` : null}
          sub={`${resolvedIssues} of ${totalIssues} resolved`}
          color="bg-emerald-500"
          to="/admin/issues"
        />
      </div>

      {/* Secondary stat cards + Issue breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Resources mini-cards */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Resources Overview
          </h2>
          <div className="space-y-3">
            {[
              { icon: Users2, label: "Groups", value: stats.groups, color: "text-pink-500 bg-pink-50", to: "/admin/groups" },
              { icon: BookOpen, label: "Modules", value: stats.modules, color: "text-indigo-500 bg-indigo-50", to: "/admin/modules" },
              { icon: DoorOpen, label: "Rooms", value: stats.rooms, color: "text-amber-500 bg-amber-50", to: "/admin/rooms" },
              { icon: CalendarClock, label: "Routines", value: "—", color: "text-teal-500 bg-teal-50", to: "/admin/routines" },
            ].map(({ icon: Icon, label, value, color, to }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${color}`}>
                    <Icon size={15} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {value ?? <span className="inline-block h-4 w-8 animate-pulse rounded bg-muted" />}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Issue breakdown */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Issue Breakdown
          </h2>
          <div className="space-y-3">
            {[
              { label: "Open", value: openIssues, total: totalIssues, color: "bg-red-500", textColor: "text-red-600" },
              { label: "In Progress", value: inProgressIssues, total: totalIssues, color: "bg-yellow-400", textColor: "text-yellow-600" },
              { label: "Resolved", value: resolvedIssues, total: totalIssues, color: "bg-green-500", textColor: "text-green-600" },
              { label: "Closed", value: stats.issueStats?.byStatus?.closed ?? 0, total: totalIssues, color: "bg-gray-300", textColor: "text-gray-500" },
            ].map(({ label, value, total, color, textColor }) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">{label}</span>
                  <span className={`font-bold ${textColor}`}>{value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${color}`}
                    style={{ width: total > 0 ? `${Math.round((value / total) * 100)}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-foreground">
            Quick Links
          </h2>
          <div className="flex flex-col gap-2">
            {[
              { label: "Manage Routines", to: "/admin/routines", icon: CalendarClock, color: "text-teal-600 bg-teal-50 hover:bg-teal-100" },
              { label: "View All Issues", to: "/admin/issues", icon: AlertTriangle, color: "text-red-600 bg-red-50 hover:bg-red-100" },
              { label: "Manage Teachers", to: "/admin/teachers", icon: GraduationCap, color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
              { label: "Manage Users", to: "/admin/users", icon: Users, color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
            ].map(({ label, to, icon: Icon, color }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${color}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} />
                  <span>{label}</span>
                </div>
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Issues table */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Recent Issues</h2>
          <Link
            to="/admin/issues"
            className="flex items-center gap-1 text-xs font-medium text-pink-600 hover:text-pink-700"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="space-y-2 p-5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 w-full animate-pulse rounded bg-muted" />
              ))}
            </div>
          ) : recentIssues.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="mb-2 h-10 w-10 text-green-400" />
              <p className="font-medium text-foreground">No issues reported</p>
              <p className="text-sm text-muted-foreground">All systems are running smoothly.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50/60 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Reporter</th>
                  <th className="px-5 py-3">Group</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentIssues.map((issue) => (
                  <tr key={issue.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-foreground">
                      {issue.issueType?.replace(/_/g, " ") ?? "Unknown"}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {issue.user?.name ?? "Anonymous"}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {issue.group?.name ?? "—"}
                    </td>
                    <td className="px-5 py-3">
                      <IssueStatusBadge status={issue.status} />
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">
                      {formatDate(issue.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
