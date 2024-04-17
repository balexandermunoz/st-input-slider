import Typography from "@mui/material/Typography"
import * as React from "react"

interface LabelProps {
  label: string
}

const Label: React.FC<LabelProps> = ({ label }) => (
  <Typography id="input-slider" gutterBottom>
    {label}
  </Typography>
)

export default Label