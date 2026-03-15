import { useEffect, useState, useRef } from "react";
import { Search, Edit, Trash2, ShieldCheck, User, Users as UsersIcon, RefreshCw, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAllUsers,
  searchUsers,
  updateUser,
  deleteUser,
  USER_ROLES,
} from "@/services/userServices";
import { getAllGroups } from "@/services/groupServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditModal from "@/components/admin/EditModal";

const RoleBadge = ({ role }) =>
  role === USER_ROLES.ADMIN ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-semibold text-pink-700">
      <ShieldCheck size={11} />
      Admin
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
      <User size={11} />
      User
    </span>
  );

const LIMIT = 20;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: LIMIT, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const debounceRef = useRef(null);

  const fetchUsers = async (targetPage = page) => {
    setLoading(true);
    try {
      const { data, pagination: pg } = await getAllUsers(targetPage, LIMIT);
      setUsers(Array.isArray(data) ? data : []);
      setPagination(pg);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const runSearch = async (query) => {
    setLoading(true);
    try {
      const data = await searchUsers(query);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (value.trim()) {
        runSearch(value.trim());
      } else {
        setPage(1);
        fetchUsers(1);
      }
    }, 350);
  };

  useEffect(() => {
    if (!search.trim()) {
      fetchUsers(page);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers(1);
    setPage(1);
    getAllGroups().then((data) => setGroups(Array.isArray(data) ? data : [])).catch(() => {});
  }, []);

  const handleEditClick = (user) => {
    setEditData(user);
    setEditOpen(true);
  };

  const handleEditSave = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        emailVerified: formData.emailVerified === true || formData.emailVerified === "true",
        groupId: formData.groupId || null,
      };
      await updateUser(editData.id, payload);
      await fetchUsers(page);
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update user");
    }
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const filtered = users.filter((u) => {
    return roleFilter === "all" || u.role === roleFilter;
  });

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Users</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {pagination.total} registered user{pagination.total !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => fetchUsers(page)}
          disabled={loading}
          className="flex items-center gap-2 self-start rounded-lg border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-gray-50 disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        >
          <option value="all">All Roles</option>
          <option value={USER_ROLES.USER}>User</option>
          <option value={USER_ROLES.ADMIN}>Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50/70 hover:bg-gray-50/70">
              <TableHead className="w-12 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                #
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Role
              </TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Group
              </TableHead>
              <TableHead className="w-24 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 size={18} className="animate-spin text-[#F84178]" />
                    <span className="text-sm">Loading users…</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <UsersIcon size={36} className="text-muted-foreground/40" />
                    <p className="font-medium">No users found</p>
                    {search || roleFilter !== "all" ? (
                      <p className="text-sm">Try adjusting your filters.</p>
                    ) : (
                      <p className="text-sm">No users have registered yet.</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((user, idx) => (
                <TableRow
                  key={user.id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <TableCell className="px-5 py-3 text-sm text-muted-foreground">
                    {(pagination.page - 1) * pagination.limit + idx + 1}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-violet-400 text-xs font-bold text-white">
                        {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${user.email}`}
                      className="hover:text-pink-600 hover:underline"
                    >
                      {user.email}
                    </a>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell className="px-5 py-3 text-sm text-muted-foreground">
                    {user.group?.name ? (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                        {user.group.name}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit"
                        onClick={() => handleEditClick(user)}
                        className="h-7 w-7 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        onClick={() => handleDelete(user.id)}
                        className="h-7 w-7 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && !search.trim() && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing {(pagination.page - 1) * pagination.limit + 1}–
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1 || loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border bg-white shadow-sm transition hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                disabled={loading}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-medium transition ${
                  p === page
                    ? "border-[#F84178] bg-[#F84178] text-white shadow-sm"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages || loading}
              className="flex h-8 w-8 items-center justify-center rounded-lg border bg-white shadow-sm transition hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      <EditModal
        open={editOpen}
        initialData={editData}
        entityType="user"
        onSave={handleEditSave}
        onCancel={handleEditCancel}
        fieldConfig={[
          { label: "Name", key: "name", type: "text", required: true },
          {
            label: "Role", key: "role", type: "select",
            options: [
              { value: USER_ROLES.USER, label: "User" },
              { value: USER_ROLES.ADMIN, label: "Admin" },
            ],
          },
          {
            label: "Group", key: "groupId", type: "select",
            options: [
              { value: "", label: "— No group —" },
              ...groups.map((g) => ({ value: g.id, label: g.name })),
            ],
          },
          { label: "Email Verified", key: "emailVerified", type: "checkbox", checkboxLabel: "Mark email as verified" },
        ]}
      />
    </>
  );
};

export default Users;

