import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { getAllTeachers } from "@/services/teacherServices";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/admin/Loading";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading)
    return <Loading />;

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold">Teachers</h2>
      <div className="rounded-lg border bg-background shadow">
        <Table className="text-sm">
        <TableHeader>
          <TableRow className="h-10">
            <TableHead className="w-[60px] py-4 px-5">#</TableHead>
            <TableHead className="py-4 px-5">Name</TableHead>
            <TableHead className="py-4 px-5">Email</TableHead>
            <TableHead className="py-4 px-5">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher, idx) => (
            <TableRow key={teacher.id} className="h-10">
              <TableCell className="py-4 px-5">{idx + 1}</TableCell>
              <TableCell className="py-4 px-5 font-medium">{teacher.name}</TableCell>
              <TableCell className="py-4 px-5">
                <a
                  href={`mailto:${teacher.email}`}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Mail size={16} />
                  {teacher.email}
                </a>
              </TableCell>
              <TableCell className="py-4 px-5">
                {teacher.contactNumber ? (
                  <a
                    href={`tel:${teacher.contactNumber}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <Phone size={16} />
                    {teacher.contactNumber}
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Teachers;