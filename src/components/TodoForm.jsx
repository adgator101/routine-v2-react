import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

const TodoForm = ({ onClose }) => {
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium',
            dueDate: new Date() 
        }
    });

    const onSubmit = (data) => {
        const taskData = {
            ...data,
            dueDate: data.dueDate.getTime() 
        };
        
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            const taskList = JSON.parse(tasks);
            taskList.push(taskData);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            toast.success('Task added');
        } else {
            localStorage.setItem('tasks', JSON.stringify([taskData]));
            toast.success('Task added');
        }
        onClose();
    };

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Add New Task</CardTitle>
                <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-full"
                >
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            rules={{ required: 'Title is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter task title..." 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            rules={{ required: 'Description is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter task description..." 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            rules={{ required: 'Priority is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex space-x-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="low" id="low" />
                                                <FormLabel htmlFor="low" className="text-blue-600">Low</FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="medium" id="medium" />
                                                <FormLabel htmlFor="medium" className="text-yellow-600">Medium</FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="high" id="high" />
                                                <FormLabel htmlFor="high" className="text-red-600">High</FormLabel>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dueDate"
                            rules={{ required: 'Due date is required' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date & Time </FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={field.onChange}
                                            showTimeSelect
                                            dateFormat="Pp" 
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4 pt-4">
                            <Button 
                                type="submit" 
                                className="flex-1 bg-accent hover:bg-pink-700"
                            >
                                Add Task
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={onClose}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default TodoForm;
