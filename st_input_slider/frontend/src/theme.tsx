import { createTheme } from "@mui/material/styles"

export const createCustomTheme = (props: any) => {
  const mainColor =
    props.args.options && props.args.options.color
      ? props.args.options.color
      : props.theme.primaryColor
  return createTheme({
    palette: {
      primary: {
        main: mainColor,
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
          root: {
            width: "100%",
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          thumb: {
            height: 12,
            width: 12,
            "&:hover": {
              boxShadow: `0px 0px 0px 2px ${mainColor}33`,
            },
            "&.Mui-active, &:focus": {
              boxShadow: `0px 0px 0px 4px ${mainColor}33`,
            },
          },
          markLabel: {
            marginTop: -4,
            fontWeight: 500,
            fontSize: "12px",
            transform:'translateX(-100%)',
            '&[data-index="0"]' : {
              transform:'none'
            },
          },
        },
      },
    },
  })
}
