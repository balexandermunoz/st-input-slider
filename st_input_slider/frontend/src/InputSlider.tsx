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
    const theme = createCustomTheme(this.props)
    const vMargin = 0
    const hMargin = 10
    return (
      <ThemeProvider theme={theme}>
        <Box margin={`${vMargin}px ${hMargin}px`}>
          <Typography id="input-slider" gutterBottom>
            {this.props.args.label}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs sx={{ width: '70%' }}>
              <Slider
                value={
                  typeof this.state.value === "number" ? this.state.value : 0
                }
                onChange={this.handleSliderChange}
                onChangeCommitted={() =>
                  Streamlit.setComponentValue(this.state.value)
                }
                aria-labelledby="input-slider"
                step={this.props.args.step}
                min={this.props.args.min_value}
                max={this.props.args.max_value}
                marks={
                  this.props.args.options && this.props.args.options.marks
                    ? this.marks
                    : false
                }
              />
            </Grid>
            <Grid item sx={{ width: '30%' }}>
              <MuiInput
                disableUnderline={disableUnderline}
                sx={{
                  ":before": { borderBottomColor: theme.palette.text.primary },
                }}
                value={this.state.value}
                size="small"
                onChange={this.handleInputChange}
                onBlur={this.handleBlur}
                inputProps={{
                  step: this.props.args.step,
                  min: this.props.args.min_value,
                  max: this.props.args.max_value,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    )
  }
}

export default withStreamlitConnection(InputSlider)
