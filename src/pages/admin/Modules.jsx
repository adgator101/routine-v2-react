import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchAllModules = async () => {
      try {
        const data = await getAllModules();
        setModules(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllModules();
  }, []);

  const handleEditClick = (module) => {
    setEditData(module);
    setEditOpen(true);
  };

  const handleEditSave = async (formData) => {
    try {
      await updateModuleById(editData.id, formData);
      // Refresh list
      const data = await getAllModules();
      setModules(data);
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update module");
    }
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this module?")) return;
    try {
      await deleteModuleById(id);
      setModules(modules.filter((m) => m.id !== id));
    } catch (err) {
      alert("Failed to delete module");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Modules</h2>
      <div className="bg-background rounded-lg border shadow">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules.map((module, idx) => (
              <TableRow key={module.id} className="h-10">
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{module.name}</TableCell>
                <TableCell>{module.moduleCode}</TableCell>
                <TableCell>
                  {module.description || (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Edit"
                    onClick={() => handleEditClick(module)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit size={13} className="text-blue-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDelete(module.id)}
                    className="ml-1 h-6 w-6 p-0"
                  >
                    <Trash2 size={13} className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EditModal
        open={editOpen}
        initialData={editData}
        entityType="module"
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default Modules;
