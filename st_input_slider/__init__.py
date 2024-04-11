import os
from typing import Any, Dict

import streamlit.components.v1 as components

# Create a _RELEASE constant. We'll set this to False while we're developing
# the component, and True when we're ready to package and distribute it.
# (This is, of course, optional - there are innumerable ways to manage your
# release process.)
_RELEASE = True

# Declare a Streamlit component. `declare_component` returns a function
# that is used to create instances of the component. We're naming this
# function "_component_func", with an underscore prefix, because we don't want
# to expose it directly to users. Instead, we will create a custom wrapper
# function, below, that will serve as our component's public API.

# It's worth noting that this call to `declare_component` is the
# *only thing* you need to do to create the binding between Streamlit and
# your component frontend. Everything else we do in this file is simply a
# best practice.

if not _RELEASE:
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("st_input_slider"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "st_input_slider",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://localhost:3001",
    )
else:
    # When we're distributing a production version of the component, we'll
    # replace the `url` param with `path`, and point it to the component's
    # build directory:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component(
        "st_input_slider", path=build_dir)


# Create a wrapper function for the component. This is an optional
# best practice - we could simply expose the component function returned by
# `declare_component` and call it done. The wrapper allows us to customize
# our component's API: we can pre-process its input args, post-process its
# output value, and add a docstring for users.
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
        - "inputWidth": str, default is "48px". This sets the width of the input box.
        - "disableUnderline": bool, default is False. If True, the underline of the input box is disabled.
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
