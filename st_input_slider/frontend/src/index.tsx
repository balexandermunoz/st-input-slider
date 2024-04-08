import React from "react"
import InputSlider from "./InputSlider"
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <InputSlider />
  </React.StrictMode>
)
