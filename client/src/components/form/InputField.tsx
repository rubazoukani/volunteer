import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { InputField as InputFieldType } from "../../misc/types";

const InputField = ({
  name,
  label,
  type,
  styles,
  labelStyle,
  placeholder,
  dir,
  innerDivStyle,
  inputMode,
  Icon,
  iconStyle,
  autoComplete = "on"
}: InputFieldType): React.ReactNode => {
  return (
    <Form.Group className={styles}>
      <div className={innerDivStyle}>
        {label && (
          <Form.Label className={labelStyle}>
            {Icon && <span className={iconStyle}>{Icon}</span>}
            <span>{label}:</span>
          </Form.Label>
        )}

        <Field
          type={type}
          name={name}
          inputMode={inputMode}
          className="form-control"
          placeholder={placeholder}
          dir={dir}
          autoComplete={autoComplete}
        />
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default InputField;
