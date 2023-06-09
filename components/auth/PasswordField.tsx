import { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form"
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Input } from "@/components/ui/input"

interface PasswordFieldProps {
    id : string,
    label : string,
    required? : boolean,
    register: UseFormRegister<FieldValues>,
}

const PasswordField : React.FC<PasswordFieldProps> = ({
    id, label, register, required
}) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          {...register(id, { required })} 
          id={id}
          autoComplete="current-password"
        />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none text-sm"
          >
            {showPassword ? <HiEyeOff />: <HiEye />}
          </button>
      </div>
    </div>
  );
};

export default PasswordField;
