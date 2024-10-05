import { useState } from "react";
import "./component-styles.css";

type Props = {
  name: string;
  type: string;
  required?: boolean;
  value: string;
  asTextArea?: boolean;
  className?: string;
  onChange: (val: string) => void;
};

export default function FormInput({
  name,
  type,
  required = false,
  value,
  asTextArea = false,
  className = "",
  onChange,
}: Props) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={name}
        className={`transition-all ease-in ${
          !focus ? "form-label-default" : "form-label-focus"
        }`}
      >
        {name}
      </label>
      {!asTextArea ? (
        <input
          className={`${!focus ? "form-input-default" : "form-input-focus"}`}
          type={type}
          id={name}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false || value !== "")}
          autoFocus={focus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <textarea
          className={`${
            !focus ? "form-input-default" : "form-input-focus"
          } min-h-14 overflow-y-auto h-auto`}
          id={name}
          required={required}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false || value !== "")}
          autoFocus={focus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
