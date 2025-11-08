import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditModal = ({ open, initialData, entityType, onSave, onCancel }) => {
  // Define fields for each entity type
  const fields = {
    group: [{ label: "Name", key: "name", type: "text" }],
    module: [
      { label: "Name", key: "name", type: "text" },
      { label: "Code", key: "moduleCode", type: "text" },
      { label: "Description", key: "description", type: "text" },
    ],
    room: [
      { label: "Name", key: "name", type: "text" },
      { label: "Block", key: "block", type: "text" },
    ],
    teacher: [
      { label: "Name", key: "name", type: "text" },
      { label: "Email", key: "email", type: "email" },
      { label: "Contact Number", key: "contactNumber", type: "text" },
    ],
  };

  const getDefaultValues = () => {
    const entityFields = fields[entityType] || [];
    const defaults = {};
    entityFields.forEach(f => {
      defaults[f.key] = initialData && initialData[f.key] !== undefined && initialData[f.key] !== null
        ? initialData[f.key]
        : "";
    });
    return defaults;
  };

  const form = useForm({
    defaultValues: getDefaultValues(),
    mode: "onChange",
  });

  useEffect(() => {
    form.reset(getDefaultValues());
  }, [initialData, open, entityType]);

  if (!open) return null;

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="min-w-[320px] rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">
          Edit {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields[entityType]?.map((field) => (
              <FormField
                key={field.key}
                control={form.control}
                name={field.key}
                rules={{
                  required: field.key === "name" ? "This field is required" : false,
                }}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.key}>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        id={field.key}
                        type={field.type}
                        {...f}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditModal;