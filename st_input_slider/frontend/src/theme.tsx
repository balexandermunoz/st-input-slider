import { createTheme } from "@mui/material/styles"

export const createCustomTheme = (props: any) =>
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
        secondary: props.theme.textColor,
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
            width:
              props.args.options && props.args.options.inputWidth
                ? props.args.options.inputWidth
                : "48px",
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: {
            height: 12,
            width: 12,
          },
        },
      },
    },
  })
