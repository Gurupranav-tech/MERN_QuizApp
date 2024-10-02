import { useEffect, useState } from "react";
import "./component-styles.css";

type Props = {
  name: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
};

export default function FormInput({
  name,
  type,
  required = false,
  value,
  onChange,
}: Props) {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (value) setFocus(true);
  }, [value, focus]);

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`transition-all ease-in ${
          !focus ? "form-label-default" : "form-label-focus"
        }`}
      >
        {name}
      </label>
      <input
        className={`${!focus ? "form-input-default" : "form-input-focus"}`}
        type={type}
        id={name}
        required={required}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoFocus={focus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
