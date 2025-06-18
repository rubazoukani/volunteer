import React from "react";
import { Form } from "react-bootstrap";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { TextAreaField as TextAreaFieldType } from "../../misc/types";

const TextAreaField = ({
  name,
  label,
  styles,
  labelStyle,
  placeholder,
  dir,
  innerDivStyle,
  Icon,
  iconStyle,
}: TextAreaFieldType): React.ReactNode => {
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
          as="textarea"
          name={name}
          className="form-control"
          placeholder={placeholder}
          dir={dir}
          rows={4}
        />
      </div>

      <ErrorMessage name={name}>
        {(msg) => <TextError msg={msg} />}
      </ErrorMessage>
    </Form.Group>
  );
};

export default TextAreaField;
