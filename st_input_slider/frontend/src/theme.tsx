import { createTheme } from "@mui/material/styles"

export const createCustomTheme = (props: any) => {
  const mainColor = getMainColor(props)

  return createTheme({
    palette: createPalette(props, mainColor),
    typography: createTypography(props),
    components: createComponentOverrides(props, mainColor),
  })
}

const getMainColor = (props: any) => {
  return props.args.options && props.args.options.color
    ? props.args.options.color
    : props.theme.primaryColor
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

const createTypography = (props: any) => {
  return {
    fontFamily: props.theme.font,
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
      fontSize: "12px",
      transform: "translateX(-100%)",
      '&[data-index="0"]': {
        transform: "none",
      },
    },
  }
}
