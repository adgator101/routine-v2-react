import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function Events() {
  return (
    <div className="mx-10 mt-20 flex flex-col gap-32">
      <div className="event-header flex justify-between">
        <p className="text-3xl font-bold">Event management</p>
        <button className="add-event">Add Event</button>
      </div>
      <div className="event-main-container flex flex-col gap-8">
        <div className="event-search-form">
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder={"Search Events"}
              className="w-1/2 rounded-lg border border-gray-200 px-4 py-3 focus:border-0"
            />
          </form>
        </div>
        <div className="event-table">
          <Table className={"mt-4 border border-gray-200 bg-white"}>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">GitHub 101</TableCell>
                <TableCell>2025/03/01</TableCell>
                <TableCell>SR-01</TableCell>
                <TableCell>Upcoming</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>  <TableRow>
                <TableCell className="font-medium">GitHub 101</TableCell>
                <TableCell>2025/03/01</TableCell>
                <TableCell>SR-01</TableCell>
                <TableCell>Upcoming</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Events;
