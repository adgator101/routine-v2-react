import React, { useState, useEffect } from 'react'; // Added missing useEffect import
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import TodoCard from './TodoCard';
import TodoForm from './TodoForm';

const TodoSection = () => {
    const [todoList, setTodoList] = useState([]);
    const [showForm, setShowForm] = useState(false);



    const handleRemove = (index) => {
        const tasks = [...todoList]; 
        tasks.splice(index, 1); 
        setTodoList(tasks); 
        localStorage.setItem('tasks', JSON.stringify(tasks))
      };
      

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('tasks'));
        if (todos) {
            setTodoList(todos);
        }
    }, [showForm]);

    return (
        <div className="max-w-3xl mx-auto p-6 relative">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-800">Todo</h1>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm px-3 py-1">
                        {todoList.length}
                    </Badge>
                </div>
                
                <button 
                    onClick={() => setShowForm(true)} 
                    className="group flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Add Task
                    <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors">
                        <Plus className="w-4 h-4" />
                    </div>
                </button>
            </div>

            <div className="space-y-4">
                {todoList.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <Plus className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-700">No tasks yet</h3>
                            <p className="text-gray-500 max-w-sm">
                                Create your first task by clicking the 'Add Task' button above
                            </p>
                        </div>
                    </div>
                ) : (
                    todoList.map((todoItem, index) => (
                        <div 
                           key={index}
                            className="transform w-full max-w-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <TodoCard 
                            key={index} 
                            handleComplete = {() => handleRemove(index)}
                            handleRemove = {() => handleRemove(index)}
                            todoItem={todoItem} />
                        </div>
                    ))
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10">
                    <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <TodoForm onClose={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TodoSection;
