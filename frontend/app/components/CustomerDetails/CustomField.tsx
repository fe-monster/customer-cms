import { Button } from "../ui/button";

interface CustomFieldProps {
    field: { key: string; value: string };
    index: number;
    updateCustomField: (index: number, key: string, value: string) => void;
    setEditingFieldIndex: (index: number | null) => void;
    removeCustomField: (index: number) => void;
}
const CustomField = ({ field , updateCustomField,index,setEditingFieldIndex,removeCustomField}: CustomFieldProps) => {
    const handleAddCustomField = () => {
        setEditingFieldIndex(null);
    }

    const handleRemoveCustomField = () => {
        removeCustomField(index);
    }

    const handleUpdateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCustomField(index, e.target.value, field.value);
    }

    const handleUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateCustomField(index, field.key, e.target.value);
    }
    return (
              <>
    <input
      className="border rounded px-2 py-1 text-sm w-1/3"
      placeholder="Key"
      value={field.key}
      onChange={handleUpdateKey}
    />
    <input
      className="border rounded px-2 py-1 text-sm flex-1"
      placeholder="Value"
      value={field.value}
      onChange={handleUpdateValue}
    />
    <Button
      variant="ghost"
      size="sm"
      onClick={handleAddCustomField}
    >
      ✓
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRemoveCustomField}
    >
      ✕
    </Button>
  </>
    )
}

export default CustomField;