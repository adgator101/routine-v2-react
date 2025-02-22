import React, { useState, useEffect } from "react"; // Added missing useEffect import
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import TodoCard from "/src/components/TodoCard";
import TodoForm from "/src/components/TodoForm";

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleRemove = (index) => {
    const tasks = [...todoList];
    tasks.splice(index, 1);
    setTodoList(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const handleComplete = (index) => {
    const updatedTodoList = todoList.map((item, i) =>
      i === index ? { ...item, status: !item.status } : item,
    );

    setTodoList(updatedTodoList);
    localStorage.setItem("tasks", JSON.stringify(todoList));
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("tasks"));
    if (todos) {
      setTodoList(todos);
    }
  }, [showForm]);

  return (
    <div className="relative mx-auto max-w-3xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Todo</h1>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 text-sm">
            {todoList.length}
          </Badge>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="hover:from-blue-700 hover:to-blue-800 group flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-white shadow-md transition-all duration-300 hover:shadow-lg"
        >
          Add Task
          <div className="rounded-full bg-white/20 p-1 transition-colors group-hover:bg-white/30">
            <Plus className="h-4 w-4" />
          </div>
        </button>
      </div>

      <div className="space-y-4">
        {todoList.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-gray-100 p-3">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">
                No tasks yet
              </h3>
              <p className="max-w-sm text-gray-500">
                Create your first task by clicking the 'Add Task' button above
              </p>
            </div>
          </div>
        ) : (
          todoList.map((todoItem, index) => (
            <div
              key={index}
              className="w-full max-w-2xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <TodoCard
                key={index}
                handleComplete={() => handleComplete(index)}
                handleRemove={() => handleRemove(index)}
                todoItem={todoItem}
              />
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50">
          <div className="absolute left-1/2 top-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 transform">
            <TodoForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDo;
