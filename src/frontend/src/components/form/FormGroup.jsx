import React from "react";

const FormGroup = ({ label, required = false, labelClass = "", children }) => (
    <div className="form-group">
        <label className={labelClass}>
            {label} {required && <abbr title="required">*</abbr>}
        </label>
        {children}
    </div>
);

export default FormGroup;
