import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  getAllRooms,
  updateRoomById,
  deleteRoomById,
} from "@/services/roomServices";
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

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRooms();
  }, []);

  const handleEditClick = (room) => {
    setEditData(room);
    setEditOpen(true);
  };

  const handleEditSave = async (formData) => {
    try {
      await updateRoomById(editData.id, formData);
      // Refresh list
      const data = await getAllRooms();
      setRooms(data);
      setEditOpen(false);
    } catch (err) {
      alert("Failed to update room");
    }
  };

  const handleEditCancel = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await deleteRoomById(id);
      setRooms(rooms.filter((r) => r.id !== id));
    } catch (err) {
      alert("Failed to delete room");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Rooms</h2>
      <div className="bg-background rounded-lg border shadow">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Block</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room, idx) => (
              <TableRow key={room.id} className="h-10">
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell>{room.block}</TableCell>
                <TableCell className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    title="Edit"
                    onClick={() => handleEditClick(room)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit size={13} className="text-blue-500" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    title="Delete"
                    onClick={() => handleDelete(room.id)}
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
        entityType="room"
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default Rooms;
