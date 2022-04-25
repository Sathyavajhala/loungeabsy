import * as React from 'react';
import TextField from '@material-ui/core/TextField';


export default function TextFieldComponent(props) {
    return <TextField
        id={props.id ? props.id : null}
        label={props.label ? props.label : null}
        variant={props.variant ? props.variant : 'standard'}
        defaultValue={props.defaultValue ? props.defaultValue : null}
        InputProps={{
            readOnly: props.readOnly ? true : false,
        }}
        onChange={(value) => props.onChange(value, props.id)}
        error={props.error ? true : false}
        helperText={props.error ? props.helperText : null}
        type={props.type ? props.type : "text"}
        required={props.required ? true : false}
    />
}