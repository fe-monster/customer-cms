import type { FieldError, UseFormRegister } from "react-hook-form";
import type { CustomerFormValues } from "~/lib/validations/customer.schema";

interface EditableFieldProps {
    key: string;
    value: string;
    label: string;
    isEditing: boolean;
    register: UseFormRegister<CustomerFormValues>;
    field: any;
    error?: FieldError;

}
const EditableField = ({ key, value, label, isEditing, register,field ,error}: EditableFieldProps) => {
    return (
        <div key={key} className="flex flex-col gap-1">
            <label className="text-sm text-muted-foreground capitalize">
              {label}
            </label>
            {isEditing ? (
              <input
                {...register(field)}
                className="border rounded px-3 py-1.5 text-sm"
              />
            ) : (
              <p className="text-sm">{value}</p>
            )}
             {error && (
                <p className="text-xs text-red-500">{error.message}</p>
              )}
          </div>
    )
}

export default EditableField;