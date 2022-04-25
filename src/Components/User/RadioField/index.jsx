import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function RadioField(props) {
    const classes = useStyles();
   return <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
            native
            value={props.value}
            onChange={props.handleChange}
            // inputProps={{
            //     name: 'age',
            //     id: 'age-native-simple',
            // }}
        >
            <option aria-label="None" value="" />
        </Select>
    </FormControl>
}



export default RadioField