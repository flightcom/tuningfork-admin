import React from 'react';
import { FormField } from 'admin-on-rest';

const FormInput = ({ input, ...rest }) =>
    input ? (
        <div
            className={`aor-input aor-input-${input.props.source}`}
            style={input.props.style}
        >
            <FormField input={input} {...rest} />
        </div>
    ) : null;

export default FormInput;
