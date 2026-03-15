import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, BookOpen, Search } from "lucide-react";
import {
  getAllModules,
  updateModuleById,
  deleteModuleById,
} from "@/services/moduleServices";
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

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getAllModules();
      setModules(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleEditClick = (mod) => { setEditData(mod); setEditOpen(true); };

  const handleEditSave = async (formData) => {
    try {
      await updateModuleById(editData.id, formData);
      await fetchAll();
      setEditOpen(false);
    } catch (err) { alert("Failed to update module"); }
  };

  const handleEditCancel = () => { setEditOpen(false); setEditData(null); };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      await deleteModuleById(id);
      setModules((prev) => prev.filter((m) => m.id !== id));
    } catch (err) { alert("Failed to delete module"); }
  };

  const filtered = modules.filter(
    (m) =>
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.moduleCode?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loading />;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Modules</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{modules.length} module{modules.length !== 1 ? "s" : ""}</p>
        </div>
      </div>
      <div className="mb-4 relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Search by name or code…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100" />
      </div>
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50/70 hover:bg-gray-50/70">
              <TableHead className="w-12 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">#</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Name</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Code</TableHead>
              <TableHead className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Description</TableHead>
              <TableHead className="w-24 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BookOpen size={36} className="text-muted-foreground/40" />
                    <p className="font-medium">No modules found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((mod, idx) => (
                <TableRow key={mod.id} className="border-b transition-colors hover:bg-gray-50">
                  <TableCell className="px-5 py-3 text-sm text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <BookOpen size={14} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{mod.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-mono font-medium text-gray-700">
                      {mod.moduleCode}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs px-5 py-3 text-sm text-muted-foreground">
                    {mod.description || <span className="text-muted-foreground/40">—</span>}
                  </TableCell>
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEditClick(mod)}
                        className="h-7 w-7 rounded-md text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDelete(mod.id)}
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
      <EditModal open={editOpen} initialData={editData} entityType="module" onSave={handleEditSave} onCancel={handleEditCancel} />
    </>
  );
};

export default Modules;
