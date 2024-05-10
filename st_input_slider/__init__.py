import os
from typing import Any, Dict, Callable

import streamlit.components.v1 as components
from utils import register

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "st_input_slider",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component(
        "st_input_slider", path=build_dir)


DEFAULT_OPTIONS = {
    "color": None, # A color string
    "marks": False,
    "disableUnderline": False,
    "labelPosition": "top",
    "labelTextAlign": "left",
    "fontSize": 12,
    "endAdornment": None,
    "labelWidth": "20%",
    "sliderWidth": "60%",
    "inputWidth": "20%"
}

def st_input_slider(
    label: str = None,
    min_value: float = 0,
    max_value: float = 100,
    value: float = 50,
    step: float = 1,
    format: str = "",
    options: Dict[str, Any] = None,
    key: str = None,
    on_change: Callable = None,
    args: tuple = None,
    kwargs: dict = None
) -> float:
    """
    A highly customizable Streamlit component that combines a slider with an input box for more precise value selection.

    Parameters
    ----------
    label: str, default None
        The label for the slider component.
    min_value: float, default 0
        The minimum value of the slider.
    max_value: float, default 100
        The maximum value of the slider.
    value: float, default 50
        The initial value of the slider.
    step: float, default 1
        The step size for each slider movement.
    format: str, default ""
        A printf-style format string controlling how the interface should display numbers. Check: https://d3js.org/d3-format#locale_format
    options: dict, default None
        Additional options for the slider component. Options include:
        - "color": str, default is the primary theme color. This sets the color of the slider.
        - "marks": bool, default false. Set initial and final marks.
        - "disableUnderline": bool, default is False. If True, the underline of the input box is disabled.
        - "labelPosition": str, "top" or "left". Default is "top". The position of the label.
        - "labelTextAlign": str, "left", "center", "right", "justify", "inherit". Default is "left". The text alignment of the label.
        - "fontSize": float, default is 12. The font size.
        - "endAdornment" str, Default None. The text at the end of the input box. 
        - "labelWidth": str, default is "20%". The width of the label.
        - "sliderWidth": str, default is "60%". The width of the slider.
        - "inputWidth": str, default is "20%". The width of the input box.
    key: str or None, default None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.
    on_change: Callable, default None
        A callback function that is called whenever the slider value changes.
    args: tuple, default None
        Additional arguments to pass to the callback function.
    kwargs: dict, default None
        Additional keyword arguments to pass to the callback function.

    Returns
    -------
    float
        The current value of the slider. This is the value passed to 
        `Streamlit.setComponentValue` on the frontend.
    """
    register(key, on_change, args, kwargs)
    options = set_options(options)
    component_value = _component_func(
        label=label, min_value=min_value, max_value=max_value,
        value=value, step=step, format=format,
        options=options, key=key, default=value
    )
    return component_value

def set_options(options: dict) -> dict:
    if not options:
        return DEFAULT_OPTIONS
    for key, value in DEFAULT_OPTIONS.items():
        options[key] = options.get(key, value)
    return options