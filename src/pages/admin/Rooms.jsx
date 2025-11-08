import React, { useEffect, useState } from "react";
import { getAllRooms } from "@/services/roomServices";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/admin/Loading";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Rooms</h2>
      <div className="rounded-lg border bg-background shadow">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="w-[60px] py-4 px-5">#</TableHead>
              <TableHead className="py-4 px-5">Name</TableHead>
              <TableHead className="py-4 px-5">Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room, idx) => (
              <TableRow key={room.id} className="h-10">
                <TableCell className="py-4 px-5">{idx + 1}</TableCell>
                <TableCell className="py-4 px-5 font-medium">{room.name}</TableCell>
                <TableCell className="py-4 px-5">{room.block}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Rooms;