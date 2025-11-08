import React, { useEffect, useState } from "react";
import { Mail, Phone, Edit, Trash2 } from "lucide-react";
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
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTeachers();
  }, []);

  const handleEditClick = (teacher) => {
    setEditData(teacher);
    setEditOpen(true);
  };

  const handleEditSave = async (formData) => {
    try {
      await updateTeacherById(editData.id, formData);
      // Refresh list
      const data = await getAllTeachers();
      setTeachers(data);
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update teacher");
    }
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    try {
      await deleteTeacherById(id);
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete teacher");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Teachers</h2>
      <div className="bg-background rounded-lg border shadow">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher, idx) => (
              <TableRow key={teacher.id} className="h-10">
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>
                  <a
                    href={`mailto:${teacher.email}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    <Mail size={16} />
                    {teacher.email}
                  </a>
                </TableCell>
                <TableCell>
                  {teacher.contactNumber ? (
                    <a
                      href={`tel:${teacher.contactNumber}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      <Phone size={16} />
                      {teacher.contactNumber}
                    </a>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Edit"
                    onClick={() => handleEditClick(teacher)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit size={13} className="text-blue-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDelete(teacher.id)}
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
        entityType="teacher"
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default Teachers;
