import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {IconButton, InputAdornment, InputLabelProps, TextField} from '@mui/material';
import {FC, Ref, useState} from 'react';
import {InputBaseProps} from '@mui/material/InputBase';

interface InputPasswordProps {
  inputRef?: Ref<HTMLInputElement>; // eslint-disable-line
  required?: boolean;
  label?: string;
  name?: string;
  error?: boolean;
  helperText?: string;
  id?: string;
  inputProps?: InputBaseProps['inputProps'];
  InputLabelProps?: InputLabelProps;
}

const InputPassword: FC<InputPasswordProps> = (props: InputPasswordProps) => {
  const { inputRef, required, label, name, inputProps, InputLabelProps, error, helperText, id } =
    props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant="outlined"
      id={id}
      inputRef={inputRef}
      required={required}
      fullWidth
      margin="normal"
      name={name}
      label={label}
      helperText={helperText}
      type={showPassword ? 'text' : 'password'}
      error={error}
      InputLabelProps={InputLabelProps}
      inputProps={inputProps}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default InputPassword;
