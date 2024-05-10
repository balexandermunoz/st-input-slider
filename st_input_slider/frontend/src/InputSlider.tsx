import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { ThemeProvider } from "@mui/material/styles"
import { format as d3Format } from "d3-format"
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
      label: d3Format(this.props.args.format)(this.props.args.min_value),
    },
    {
      value: this.props.args.max_value,
      label: d3Format(this.props.args.format)(this.props.args.max_value),
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
    const marks = this.props.args.options.marks ? this.marks : false
    const disableUnderline = this.props.args.options.disableUnderline
    const labelPosition = this.props.args.options.labelPosition
    const labelTextAlign = this.props.args.options.labelTextAlign
    const endAdornment = this.props.args.options.endAdornment
    const labelWidth = this.props.args.options.labelWidth
    const sliderWidth = this.props.args.options.sliderWidth
    const inputWidth = this.props.args.options.inputWidth
    const theme = createCustomTheme(this.props)
    const vMargin = 0
    const hMargin = 10
    return (
      <ThemeProvider theme={theme}>
        <Box margin={`${vMargin}px ${hMargin}px`}>
          {labelPosition === "top" && (
            <Label label={this.props.args.label} align={labelTextAlign} />
          )}
          <Grid container rowSpacing={0} columnSpacing={2} alignItems="center">
            {labelPosition === "left" && (
              <Grid item sx={{ width: labelWidth }}>
                <Label label={this.props.args.label} align={labelTextAlign} />
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
