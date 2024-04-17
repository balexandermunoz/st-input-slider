import os
from typing import Any, Dict

import streamlit.components.v1 as components

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


def st_input_slider(
    label: str = None,
    min_value: float = 0,
    max_value: float = 100,
    value: float = 50,
    step: float = 1,
    options: Dict[str, Any] = None,
    key: str=None
) -> float:
    """Create a new instance of "st_input_slider".

    Parameters
    ----------
    label: str
        The label for the slider component.
    min_value: float
        The minimum value of the slider.
    max_value: float
        The maximum value of the slider.
    value: float
        The initial value of the slider.
    step: float
        The step size for each slider movement.
    options: dict
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
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    float
        The current value of the slider. This is the value passed to 
        `Streamlit.setComponentValue` on the frontend.

    """
    component_value = _component_func(
        label=label, min_value=min_value, max_value=max_value,
        value=value, step=step, options=options, key=key, default=value)
    return component_value
