interface FieldProps {
    label: string;
    value: string;
}

const Field = ({ label, value }:FieldProps ) => {
    return (
        <div>
          <p className="text-muted-foreground">{label}</p>
          <p>{value}</p>
        </div>
    )
}
export default Field;