import React from "react"
import MyComponent from "./MyComponent"
import { createRoot } from 'react-dom/client';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>
)
