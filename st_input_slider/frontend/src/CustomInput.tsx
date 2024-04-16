import MuiInput from "@mui/material/Input"
import * as React from "react"

interface CustomInputProps {
  disableUnderline: boolean
  value: number
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: () => void
  step: number
  min: number
  max: number
}

const CustomInput: React.FC<CustomInputProps> = ({
  disableUnderline,
  value,
  handleInputChange,
  handleBlur,
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
