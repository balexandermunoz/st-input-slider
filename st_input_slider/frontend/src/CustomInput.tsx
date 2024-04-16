import MuiInput from "@mui/material/Input"
import InputAdornment from '@mui/material/InputAdornment';
import * as React from "react"

interface CustomInputProps {
  disableUnderline: boolean
  value: number
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: () => void
  endAdornment: any
  step: number
  min: number
  max: number
}

const CustomInput: React.FC<CustomInputProps> = ({
  disableUnderline,
  value,
  handleInputChange,
  handleBlur,
  endAdornment,
  step,
  min,
  max,
}) => (
  <MuiInput
    disableUnderline={disableUnderline}
    value={value}
    size="small"
    onChange={handleInputChange}
    onBlur={handleBlur}
    endAdornment={ endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>}
    inputProps={{
      step,
      min,
      max,
      type: "number",
      "aria-labelledby": "input-slider",
    }}
  />
)

export default CustomInput
