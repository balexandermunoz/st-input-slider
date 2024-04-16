import Slider from "@mui/material/Slider"
import * as React from "react"
import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

interface CustomSliderProps {
  value: number
  handleSliderChange: (event: any, newValue: number | number[]) => void
  min: number
  max: number
  step: number
  marks: any
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  handleSliderChange,
  min,
  max,
  step,
  marks,
}) => (
  <Slider
    value={value}
    onChange={handleSliderChange}
    onChangeCommitted={() => Streamlit.setComponentValue(value)}
    aria-labelledby="input-slider"
    step={step}
    min={min}
    max={max}
    marks={marks}
  />
)

export default CustomSlider