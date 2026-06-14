import DateUtils from "~/utils/date";
import Field from "./Field";

interface MethadataProps {
    createdAt: string;
    updatedAt: string;
}
const Methadata = ({ createdAt, updatedAt }: MethadataProps) =>{
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Field label="Created At" value={DateUtils.toLocaleString(createdAt)} />
        <Field label="Updated At" value={DateUtils.toLocaleString(updatedAt)} />
      </div>
    )
}

export default Methadata;