import Typography from "@mui/material/Typography"
import * as React from "react"

interface LabelProps {
  label: string
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined
}

const Label: React.FC<LabelProps> = ({ label, align }) => (
  <Typography id="input-slider" gutterBottom align={align}>
    {label}
  </Typography>
)

export default Label
