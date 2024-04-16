import Typography from "@mui/material/Typography"
import * as React from "react"

interface LabelProps {
  fontSize: number
  label: string
}

const Label: React.FC<LabelProps> = ({ fontSize, label }) => (
  <Typography id="input-slider" gutterBottom sx={{ fontSize }}>
    {label}
  </Typography>
)

export default Label