import React, { useEffect, useState } from "react";
import { getAllGroups } from "@/services/groupServices";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import Loading from "@/components/admin/Loading";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Groups</h2>
      <div className="rounded-lg border bg-background shadow">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="h-8">
              <TableHead className="w-[60px] py-4 px-6">#</TableHead>
              <TableHead className="py-4 px-6">Name</TableHead>
              <TableHead className="w-[120px] py-4 px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group, idx) => (
              <TableRow key={group.id || group.name} className="h-8">
                <TableCell className="py-4 px-6">{idx + 1}</TableCell>
                <TableCell className="py-4 px-6 font-medium">{group.name}</TableCell>
                <TableCell className="py-4 px-6 flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700" title="Edit">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Groups;