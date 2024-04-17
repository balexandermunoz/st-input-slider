import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { ThemeProvider } from "@mui/material/styles"
import * as React from "react"
import CustomInput from "./CustomInput"
import Label from "./CustomLabel"
import CustomSlider from "./CustomSlider"
import { createCustomTheme } from "./theme"

import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

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
    const endAdornment =
      this.props.args.options && this.props.args.options.endAdornment
        ? this.props.args.options.endAdornment
        : false
    const labelWidth =
      this.props.args.options && this.props.args.options.labelWidth
        ? this.props.args.options.labelWidth
        : "20%"
    const sliderWidth =
      this.props.args.options && this.props.args.options.sliderWidth
        ? this.props.args.options.sliderWidth
        : "60%"
    const inputWidth =
      this.props.args.options && this.props.args.options.inputWidth
        ? this.props.args.options.inputWidth
        : "20%"
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
              <Grid item sx={{ width: labelWidth }}>
                <Label fontSize={labelFontSize} label={this.props.args.label} />
              </Grid>
            )}
            <Grid item xs sx={{ width: sliderWidth }}>
              <CustomSlider
                value={this.state.value}
                handleSliderChange={this.handleSliderChange}
                min={this.props.args.min_value}
                max={this.props.args.max_value}
                step={this.props.args.step}
                marks={marks}
              />
            </Grid>
            <Grid item sx={{ width: inputWidth }}>
              <CustomInput
                disableUnderline={disableUnderline}
                endAdornment={endAdornment}
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
