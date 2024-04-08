import * as React from "react"
import { styled } from "@mui/material/styles"
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

const Input = styled(MuiInput)({
  width: "52px",
})

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-thumb": {
    height: 14,
    width: 14,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    "&.Mui-active": {
      boxShadow: `0 0 0 5px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
}))

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
    this.setState({ value: newValue as number })
    Streamlit.setComponentValue(newValue)
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value === "" ? 0 : Number(event.target.value),
    })
    Streamlit.setComponentValue(Number(event.target.value))
  }

  handleBlur = () => {
    if (this.state.value < 0) {
      this.setState({ value: 0 })
    } else if (this.state.value > 100) {
      this.setState({ value: 100 })
    }
  }

  public render = (): React.ReactNode => {
    const vMargin = 0
    const hMargin = 24
    return (
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
            <Input
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
    )
  }
}

export default withStreamlitConnection(InputSlider)
