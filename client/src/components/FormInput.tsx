import { useState } from "react";
import "./component-styles.css";

type Props = {
  name: string;
  type: string;
  required?: boolean;
};

export default function FormInput({ name, type, required = false }: Props) {
  const [focus, setFocus] = useState(false);

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
      />
    </div>
  );
}
