import { useCustomer } from "../../hooks/useCustomer";
import { useCustomersStore } from "../../store/customers.store";
import { useCustomerDetailsStore } from "../../store/customer-details.store";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, type CustomerFormValues } from "../../lib/validations/customer.schema";
import { useEffect } from "react";
import Loading from "../Loading";
import DetailsConstants from "../../constants/details";
import Methadata from "./Methadata";
import EditableField from "./EditbleField";
import Title from "./Title";
import CustomField from "./CustomField";

export function CustomerDetail() {
  const { selectedCustomerId, setSelectedCustomerId } = useCustomersStore();
  const { 
    isEditing, 
    setIsEditing, 
    customFields,
    setCustomFields, 
    addCustomField, 
    updateCustomField, 
    removeCustomField, 
    editingFieldIndex,
    setEditingFieldIndex, 
    reset,
  } = useCustomerDetailsStore();
  const { 
    customer, 
    isLoading, 
    update, 
    isUpdating, 
    delete: deleteCustomer, 
    isDeleting 
  } = useCustomer(selectedCustomerId);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      custom_fields: [],
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
        custom_fields: customer.custom_fields ?? [],
      });
      setCustomFields(customer.custom_fields ?? []);
    }
  }, [customer]);

  if (!selectedCustomerId) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a customer to view details
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!customer) return null;

  const handleSave = form.handleSubmit((values) => {
    update({ ...values, custom_fields: customFields });
    setIsEditing(false);
  });

  const handleCancel = () => {
    form.reset();
    setCustomFields(customer.custom_fields ?? []);
    setIsEditing(false);
    reset();
  };

  const handleDelete = () => {
    if (confirm(`Delete ${customer.first_name} ${customer.last_name}?`)) {
      deleteCustomer(undefined, {
        onSuccess: () => setSelectedCustomerId(null),
      });
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Title>
          {customer.first_name} {customer.last_name}
        </Title>
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save"}
              </Button>
            </>
          )}
        </div>
      </div>

      <Separator />

      {/* Fields */}
      <div className="grid grid-cols-2 gap-4">
        {DetailsConstants.FIELDS.map((field) => (
          <EditableField
            key={field}
            label={field.replace("_", " ")}
            value={customer[field]}
            isEditing={isEditing}
            register={form.register}
            field={field}
            error={form.formState.errors[field]}
          />
        ))}
      </div>

      <Separator />
        <Methadata createdAt={customer.created_at} updatedAt={customer.updated_at} />
      <Separator />

      {/* Custom Fields */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Custom Fields</h3>
          {isEditing && (
            <Button variant="outline" size="sm" onClick={addCustomField}>
              + Add Field
            </Button>
          )}
        </div>

        {customFields.length === 0 && (
          <p className="text-sm text-muted-foreground">No custom fields</p>
        )}

        {customFields.map((field, index) => (
          <div key={index} className="flex items-center gap-2">
            {isEditing && editingFieldIndex === index ? (
              <CustomField
                index={index}
                field={field}
                updateCustomField={updateCustomField}
                setEditingFieldIndex={setEditingFieldIndex}
                removeCustomField={removeCustomField}
              />
            ) : (
              <>
                <Badge variant="outline">{field.key}</Badge>
                <span className="text-sm flex-1">{field.value}</span>
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingFieldIndex(index)}
                  >
                    Edit
                  </Button>
                )}
              </>
            )}
          </div>
        ))}

        {/* Validation errors for custom fields */}
        {form.formState.errors.custom_fields?.root && (
          <p className="text-xs text-red-500">
            {form.formState.errors.custom_fields.root.message}
          </p>
        )}
      </div>
    </div>
  );
}