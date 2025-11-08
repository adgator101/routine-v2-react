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
import { Edit, Trash2 } from "lucide-react";
import Loading from "@/components/admin/Loading";
import EditModal from "@/components/admin/EditModal";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        const data = await getAllGroups();
        setGroups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllGroups();
  }, []);

  const handleEditClick = (group) => {
    setEditData(group);
    setEditOpen(true);
  };

  const handleEditSave = async (formData) => {
    try {
      await updateGroupById(editData.id, formData);
      // Refresh list
      const data = await getAllGroups();
      setGroups(data);
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update group");
    }
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    try {
      await deleteGroupById(id);
      setGroups(groups.filter((g) => g.id !== id));
    } catch (err) {
      alert("Failed to delete group");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Groups</h2>
      <div className="bg-background rounded-lg border shadow">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="h-8">
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group, idx) => (
              <TableRow key={group.id || group.name} className="h-8">
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Edit"
                    onClick={() => handleEditClick(group)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit size={13} className="text-blue-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDelete(group.id)}
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
        entityType="group"
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default Groups;
