import React, { useEffect, useState } from "react";
import { Mail, Phone, Edit, Trash2, Search, GraduationCap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAllTeachers,
  updateTeacherById,
  deleteTeacherById,
} from "@/services/teacherServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/admin/Loading";
import EditModal from "@/components/admin/EditModal";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getAllTeachers();
      setTeachers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleEditClick = (teacher) => { setEditData(teacher); setEditOpen(true); };

  const handleEditSave = async (formData) => {
    try {
      await updateTeacherById(editData.id, formData);
      await fetchAll();
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update teacher");
    }
  };

  const handleEditCancel = () => { setEditOpen(false); setEditData(null); };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await deleteTeacherById(id);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete teacher");
    }
  };

  const filtered = teachers.filter(
    (t) =>
      !search ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Teachers</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {teachers.length} teacher{teachers.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="flex items-center gap-2 self-start rounded-lg border bg-white px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition hover:bg-gray-50 sm:self-auto"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50/70 hover:bg-gray-50/70">
              <TableHead className="w-12 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">#</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Name</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Contact</TableHead>
              <TableHead className="w-24 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <GraduationCap size={36} className="text-muted-foreground/40" />
                    <p className="font-medium">No teachers found</p>
                    {search && <p className="text-sm">Try a different search term.</p>}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((teacher, idx) => (
                <TableRow key={teacher.id} className="border-b transition-colors hover:bg-gray-50">
                  <TableCell className="px-5 py-3 text-sm text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-pink-400 text-xs font-bold text-white">
                        {teacher.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                      <span className="text-sm font-medium text-foreground">{teacher.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <a href={`mailto:${teacher.email}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-pink-600">
                      <Mail size={13} />{teacher.email}
                    </a>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    {teacher.contactNumber ? (
                      <a href={`tel:${teacher.contactNumber}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-pink-600">
                        <Phone size={13} />{teacher.contactNumber}
                      </a>
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEditClick(teacher)}
                        className="h-7 w-7 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDelete(teacher.id)}
                        className="h-7 w-7 rounded-md text-red-400 hover:bg-red-50 hover:text-red-600">
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
      <EditModal open={editOpen} initialData={editData} entityType="teacher" onSave={handleEditSave} onCancel={handleEditCancel} />
    </>
  );
};

export default Teachers;
