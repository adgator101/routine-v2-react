import React, { useEffect, useState } from "react";
import {
  getAllGroups,
  updateGroupById,
  deleteGroupById,
} from "@/services/groupServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Users2, Search } from "lucide-react";
import Loading from "@/components/admin/Loading";
import EditModal from "@/components/admin/EditModal";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getAllGroups();
      setGroups(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleEditClick = (group) => { setEditData(group); setEditOpen(true); };

  const handleEditSave = async (formData) => {
    try {
      await updateGroupById(editData.id, formData);
      await fetchAll();
      setEditOpen(false);
    } catch (err) { alert("Failed to update group"); }
  };

  const handleEditCancel = () => { setEditOpen(false); setEditData(null); };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await deleteGroupById(id);
      setGroups((prev) => prev.filter((g) => g.id !== id));
    } catch (err) { alert("Failed to delete group"); }
  };

  const filtered = groups.filter(
    (g) => !search || g.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Groups</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{groups.length} group{groups.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="mb-4 relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search groups…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
      </div>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50/70 hover:bg-gray-50/70">
              <TableHead className="w-12 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">#</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Name</TableHead>
              <TableHead className="w-24 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users2 size={36} className="text-muted-foreground/40" />
                    <p className="font-medium">No groups found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((group, idx) => (
                <TableRow key={group.id || group.name} className="border-b transition-colors hover:bg-gray-50">
                  <TableCell className="px-5 py-3 text-sm text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                        <Users2 size={14} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{group.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEditClick(group)}
                        className="h-7 w-7 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDelete(group.id)}
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
      <EditModal open={editOpen} initialData={editData} entityType="group" onSave={handleEditSave} onCancel={handleEditCancel} />
    </>
  );
};

export default Groups;
