import { createTheme } from "@mui/material/styles"

export const createCustomTheme = (props: any) => {
  const mainColor = props.args.options.color ?? props.theme.primaryColor
  const fontSize = props.args.options.fontSize
  return createTheme({
    palette: createPalette(props, mainColor),
    typography: createTypography(props, fontSize),
    components: createComponentOverrides(props, mainColor),
  })
}

const createPalette = (props: any, mainColor: string) => {
  return {
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
  }
}

const createTypography = (props: any, fontSize: number) => {
  return {
    fontFamily: props.theme.font,
    fontSize: fontSize,
  }
}

const createComponentOverrides = (props: any, mainColor: string) => {
  return {
    MuiLink: {
      styleOverrides: createMuiLinkOverride(props),
    },
    MuiInput: {
      styleOverrides: createMuiInputOverride(props),
    },
    MuiSlider: {
      styleOverrides: createMuiSliderOverride(mainColor),
    },
  }
}

const createMuiLinkOverride = (props: any) => {
  return {
    root: {
      color: props.theme.linkText,
    },
  }
}

const createMuiInputOverride = (props: any) => {
  return {
    root: {
      width: "100%",
    },
    underline: {
      ":before": {
        borderBottomColor: props.theme.textColor,
      },
    },
  }
}

const createMuiSliderOverride = (mainColor: string) => {
  return {
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
      transform: "translateX(-100%)",
      '&[data-index="0"]': {
        transform: "none",
      },
    },
  }
}
