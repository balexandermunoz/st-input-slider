import * as React from "react"
import { createTheme, ThemeProvider, styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Slider from "@mui/material/Slider"
import MuiInput from "@mui/material/Input"
import Typography from "@mui/material/Typography"
import { alpha } from "@mui/system"

import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"

const createCustomTheme = (props: any) =>
  createTheme({
    palette: {
      primary: {
        main:
          props.args.options && props.args.options.color
            ? props.args.options.color
            : props.theme.primaryColor,
        light: "#42a5f5",
        dark: "#1565c0",
        contrastText: "#fff",
      },
      background: {
        default: props.theme.backgroundColor,
        paper: props.theme.secondaryBackgroundColor,
      },
      text: {
        primary: props.theme.textColor,
      },
    },
    typography: {
      fontFamily: props.theme.font,
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: props.theme.linkText,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          input: {
            width: props.args.options && props.args.options.inputWidth
            ? props.args.options.inputWidth
            : "48px",
          }
        }
      }
    },
  })

const StyledSlider = styled(Slider)(({ theme }) => {
  return {
    "& .MuiSlider-thumb": {
      height: 12,
      width: 12,
    },
  }
})

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

  handleSliderChange = (event: Event, newValue: number | number[]) => {
    this.setState({ value: newValue as number }, () => {
      Streamlit.setComponentValue(this.state.value)
    })
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
    console.log(this.props.theme)
    const disableUnderline =
      this.props.args.options && this.props.args.options.disableUnderline
        ? this.props.args.options.disableUnderline
        : false
    const theme = createCustomTheme(this.props)
    const vMargin = 0
    const hMargin = 20
    return (
      <ThemeProvider theme={theme}>
        <Box margin={`${vMargin}px ${hMargin}px`}>
          <Typography id="input-slider" gutterBottom>
            {this.props.args.label}
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <StyledSlider
                value={
                  typeof this.state.value === "number" ? this.state.value : 0
                }
                onChange={this.handleSliderChange}
                aria-labelledby="input-slider"
                step={this.props.args.step}
                min={this.props.args.min_value}
                max={this.props.args.max_value}
              />
            </Grid>
            <Grid item>
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
