import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import MuiInput from "@mui/material/Input"
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import { ThemeProvider } from "@mui/material/styles"
import * as React from "react"
import { createCustomTheme } from "./theme"

import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

interface LabelProps {
  fontSize: number
  label: string
}
const Label: React.FC<LabelProps> = ({ fontSize, label }) => (
  <Typography id="input-slider" gutterBottom sx={{ fontSize }}>
    {label}
  </Typography>
)

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

interface State {
  value: number
}
class InputSlider extends StreamlitComponentBase<State> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: this.props.args.value,
    }
  }
  marks = [
    {
      value: this.props.args.min_value,
      label: this.props.args.min_value,
    },
    {
      value: this.props.args.max_value,
      label: this.props.args.max_value,
    },
  ]
  handleSliderChange = (event: Event, newValue: number | number[]) => {
    this.setState({ value: newValue as number })
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        value: event.target.value === "" ? 0 : Number(event.target.value),
      },
      () => {
        Streamlit.setComponentValue(this.state.value)
      }
    )
  }

  handleBlur = () => {
    const min_value = this.props.args.min_value
    const max_value = this.props.args.max_value
    if (this.state.value < min_value) {
      this.setState({ value: min_value }, () => {
        Streamlit.setComponentValue(this.state.value)
      })
    } else if (this.state.value > max_value) {
      this.setState({ value: max_value }, () => {
        Streamlit.setComponentValue(this.state.value)
      })
    }
  }

  public render = (): React.ReactNode => {
    const disableUnderline =
      this.props.args.options && this.props.args.options.disableUnderline
        ? this.props.args.options.disableUnderline
        : false
    const labelPosition =
      this.props.args.options && this.props.args.options.labelPosition
        ? this.props.args.options.labelPosition
        : "top"
    const labelFontSize =
      this.props.args.options && this.props.args.options.labelFontSize
        ? this.props.args.options.labelFontSize
        : "14px"
    const marks =
      this.props.args.options && this.props.args.options.marks
        ? this.marks
        : false
    const theme = createCustomTheme(this.props)
    const vMargin = 0
    const hMargin = 10
    return (
      <ThemeProvider theme={theme}>
        <Box margin={`${vMargin}px ${hMargin}px`}>
          {labelPosition === "top" && (
            <Label fontSize={labelFontSize} label={this.props.args.label} />
          )}
          <Grid container rowSpacing={0} columnSpacing={2} alignItems="center">
            {labelPosition === "left" && (
              <Grid item sx={{ width: "20%" }}>
                <Label fontSize={labelFontSize} label={this.props.args.label} />
              </Grid>
            )}
            <Grid item xs sx={{ width: "60%" }}>
              <CustomSlider
                value={this.state.value}
                handleSliderChange={this.handleSliderChange}
                min={this.props.args.min_value}
                max={this.props.args.max_value}
                step={this.props.args.step}
                marks={marks}
              />
            </Grid>
            <Grid item sx={{ width: "20%" }}>
              <CustomInput
                disableUnderline={disableUnderline}
                value={this.state.value}
                handleInputChange={this.handleInputChange}
                handleBlur={this.handleBlur}
                step={this.props.args.step}
                min={this.props.args.min_value}
                max={this.props.args.max_value}
              />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    )
  }
}

export default withStreamlitConnection(InputSlider)
