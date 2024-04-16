# streamlit-input-slider
A custom Streamlit component that combines a slider with an input box for more precise value selection

## Installation instructions

```sh
pip install st-input-slider
```

## Usage instructions

### Parameters

- `label` (str): The label for the slider component.
- `min_value` (float): The minimum value of the slider.
- `max_value` (float): The maximum value of the slider.
- `value` (float): The initial value of the slider.
- `step` (float): The step size for each slider movement.
- `options` (dict): Additional options for the slider component. Options include:
  - `color` (str): This sets the color of the slider. The default is the primary theme color.
  - `marks` (bool): Set initial and final marks. The default is `false`.
  - `disableUnderline` (bool): If `True`, the underline of the input box is disabled. The default is `False`.
  - `labelPosition` (str): The position of the label. Can be `"top"` or `"left"`. The default is `"top"`.
  - `labelFontSize` (float): The font size of the label. The default is `14`.
  - `endAdornment` (str): Default None. The text at the end of the input box. 
- `key` (str or None): An optional key that uniquely identifies this component. If this is `None`, and the component's arguments are changed, the component will be re-mounted in the Streamlit frontend and lose its current state.

### Function Returns

- `float`: The current value of the slider. This is the value passed to `Streamlit.setComponentValue` on the frontend.

## Example

```python
import streamlit as st

from st_input_slider import st_input_slider

st.title("Slider + Input Example!")
options = {
    "color": "#9E9A35",  # Default is the primary theme color
    "disableUnderline": False,  # Default is False
    "marks": False,  # Default is False
    "labelPosition": "left",  # "top" or "left". Default is "top"
    "labelFontSize": 14,  # Default is 14
    "endAdornment": "Hz",  # Default is None (no adornment)
}
slider_value = st_input_slider(
    label="A custom slider", min_value=-100, max_value=200, value=50, step=0.1, options=options)
st.markdown("Value: %s" % (slider_value))

with st.sidebar:
    st.markdown("This is another slider with all default options:")
    slider_value = st_input_slider(
        label="A custom slider1", min_value=-100, max_value=200, value=50, step=0.1)
    st_input_slider(
        label="A custom slider2", min_value=-1000, max_value=20000, value=50, step=0.1, options={"marks": True, "labelPosition": "left"})
    st_input_slider(
        label="A custom slider3", min_value=-0.00001, max_value=0.00002, value=0.000015, step=0.000001, options={"marks": True, "labelPosition": "left"})
    st_input_slider(
        label="Slider :)", min_value=-100, max_value=200, value=50, step=0.1, options={"marks": True, "labelPosition": "left"})
    st_input_slider(
        label=":)", min_value=-100, max_value=200, value=50, step=0.1, options={"labelPosition": "left"})

```