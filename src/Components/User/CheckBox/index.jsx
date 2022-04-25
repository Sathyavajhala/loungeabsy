import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TrendingUp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function CheckBoxField(props) {
    const classes = useStyles();

    const handleChange = (event) => {
        //console.log(value)
        props.onChange(event.target.value)
    }

    

    return <div>
        {console.log(props)}
        <FormControl required error={props.error} component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Pick One</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={props.Answer == props.Options[0].a} onChange={handleChange} name={props.Options[0].a} value={props.Options[0].a} />}
                    label={props.Options[0].a}
                />
                <FormControlLabel
                    control={<Checkbox checked={props.Answer == props.Options[0].b} onChange={handleChange} name={props.Options[0].b} value={props.Options[0].b} />}
                    label={props.Options[0].b}
                />
                <FormControlLabel
                    control={<Checkbox checked={props.Answer == props.Options[0].c} onChange={handleChange} name={props.Options[0].c} value={props.Options[0].c} />}
                    label={props.Options[0].c}
                />
                <FormControlLabel
                    control={<Checkbox checked={props.Answer == props.Options[0].d} onChange={handleChange} name={props.Options[0].d} value={props.Options[0].d} />}
                    label={props.Options[0].d}
                />
            </FormGroup>
            {props.error ? <FormHelperText>You can display an error</FormHelperText>: null}
        </FormControl>

    </div>

}


export default CheckBoxField