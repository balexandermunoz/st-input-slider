# streamlit-input-slider
A custom Streamlit component that combines a slider with an input box for more precise value selection

## Installation instructions

```sh
pip install st-input-slider
```

## Usage instructions

```python
import streamlit as st

from st_input_slider import st_input_slider

st.title("Slider + Input Example!")
options = {
    "color": "#9E9A35",
    "disableUnderline": True,
    "marks": False,
}
slider_value = st_input_slider(
    label="A custom slider", min_value=-100, max_value=200, value=50, step=0.1, options=options)
st.markdown("Value: %s" % (slider_value))

with st.sidebar:
    st.markdown("This is another slider with all default options:")
    value = st_input_slider()
    value

```