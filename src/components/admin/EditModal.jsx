import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BUILT_IN_FIELDS = {
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

const EditModal = ({ open, initialData, entityType, onSave, onCancel, fieldConfig }) => {
  // fieldConfig prop overrides built-in field definitions
  const activeFields = fieldConfig || BUILT_IN_FIELDS[entityType] || [];

  const getDefaultValues = () => {
    const defaults = {};
    activeFields.forEach((f) => {
      const raw = initialData?.[f.key];
      if (f.type === "checkbox") {
        defaults[f.key] = raw === true || raw === "true";
      } else {
        defaults[f.key] = raw !== undefined && raw !== null ? String(raw) : "";
      }
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
            {activeFields.map((field) => (
              <FormField
                key={field.key}
                control={form.control}
                name={field.key}
                rules={{
                  required: field.required ? "This field is required" : false,
                }}
                render={({ field: f }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.key}>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <select
                          id={field.key}
                          {...f}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                        >
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "checkbox" ? (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            id={field.key}
                            type="checkbox"
                            checked={!!f.value}
                            onChange={(e) => f.onChange(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#F84178] focus:ring-[#F84178]"
                          />
                          <span className="text-sm text-muted-foreground">{field.checkboxLabel || field.label}</span>
                        </div>
                      ) : (
                        <Input
                          id={field.key}
                          type={field.type}
                          {...f}
                        />
                      )}
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