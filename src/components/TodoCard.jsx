import React from 'react';
import { Check, Trash, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const TodoCard = ({todoItem, handleComplete, handleRemove}) => {
    const formatDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPriorityConfig = (priority) => {
        const configs = {
            low: {
                colors: "bg-blue-100 text-blue-800 border-blue-200",
                hoverColors: "group-hover:bg-blue-200"
            },
            medium: {
                colors: "bg-yellow-100 text-yellow-800 border-yellow-200",
                hoverColors: "group-hover:bg-yellow-200"
            },
            high: {
                colors: "bg-red-100 text-red-800 border-red-200",
                hoverColors: "group-hover:bg-red-200"
            }
        };
        return configs[priority] || configs.medium;
    };

    return (
        <Card className="group transition-all duration-300 hover:shadow-lg hover:border-blue-200">
            <CardContent className="p-6">
                <div className="flex items-start gap-6">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-xl overflow-hidden">
                            <img 
                                src="/api/placeholder/400/400"
                                alt="Task thumbnail" 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                                {todoItem.title}
                            </h2>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={handleRemove} 
                                    className="p-2 rounded-lg transition-all duration-200 hover:bg-red-50 hover:scale-105"
                                    aria-label="Delete task"
                                >
                                    <Trash className="w-5 h-5 text-gray-400 hover:text-red-500" />
                                </button>
                                <button 
                                    onClick={handleComplete}
                                    className="p-2 rounded-lg transition-all duration-200 hover:bg-green-50 hover:scale-105"
                                    aria-label="Complete task"
                                >
                                    <Check className="w-5 h-5 text-gray-400 hover:text-green-500" />
                                </button>
                            </div>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {todoItem.description}
                        </p>

                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{formatDate(todoItem.dueDate)}</span>
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <Badge 
                                className={`
                                    px-2 py-1 text-xs font-medium capitalize transition-colors duration-300
                                    ${getPriorityConfig(todoItem.priority).colors}
                                    ${getPriorityConfig(todoItem.priority).hoverColors}
                                `}
                            >
                                {todoItem.priority}
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default TodoCard;