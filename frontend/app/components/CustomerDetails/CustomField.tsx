import { Button } from "../ui/button";

interface CustomFieldProps {
    field: { key: string; value: string };
    index: number;
    updateCustomField: (index: number, key: string, value: string) => void;
    setEditingFieldIndex: (index: number | null) => void;
    removeCustomField: (index: number) => void
}
const CustomField = ({ field , updateCustomField,index,setEditingFieldIndex,removeCustomField}: CustomFieldProps) => {
    return (
              <>
    <input
      className="border rounded px-2 py-1 text-sm w-1/3"
      placeholder="Key"
      value={field.key}
      onChange={(e) => updateCustomField(index, e.target.value, field.value)}
    />
    <input
      className="border rounded px-2 py-1 text-sm flex-1"
      placeholder="Value"
      value={field.value}
      onChange={(e) => updateCustomField(index, field.key, e.target.value)}
    />
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setEditingFieldIndex(null)}
    >
      ✓
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => removeCustomField(index)}
    >
      ✕
    </Button>
  </>
    )
}

export default CustomField;