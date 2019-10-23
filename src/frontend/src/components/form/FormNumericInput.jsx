import React from "react";
import FormInput from "./FormInput";

class FormNumericInput extends FormInput {
    inputRegEx = /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/g;

    isValidValue(value) {
        return this.inputRegEx.test(value);
    }
}

export default FormNumericInput;
