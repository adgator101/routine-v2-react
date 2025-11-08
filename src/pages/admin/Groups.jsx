import React, { useEffect, useState } from "react";
import { getAllGroups } from "@/services/groupServices";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
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
              <TableHead className="w-[60px] py-2 px-3">#</TableHead>
              <TableHead className="py-2 px-3">Name</TableHead>
              <TableHead className="w-[120px] text-right py-2 px-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group, idx) => (
              <TableRow key={group.id || group.name} className="h-8">
                <TableCell className="py-2 px-3">{idx + 1}</TableCell>
                <TableCell className="py-2 px-3 font-medium">{group.name}</TableCell>
                <TableCell className="py-2 px-3 flex justify-end gap-2">
                  <Button size="icon" variant="ghost" aria-label="Edit group">
                    <Pencil />
                  </Button>
                  <Button size="icon" variant="destructive" aria-label="Delete group">
                    <Trash2 />
                  </Button>
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