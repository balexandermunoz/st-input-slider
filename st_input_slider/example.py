import streamlit as st

from st_input_slider import st_input_slider

st.title("Slider + Input Example!")
options = {
    "color": "#9E9A35",  # Default is the primary theme color
    "disableUnderline": False,  # Default is False
    "marks": False,  # Default is False
    "labelPosition": "left",  # "top" or "left". Default is "top"
    "labelFontSize": 14,  # Default is 14
}
slider_value = st_input_slider(
    label="A custom slider", min_value=-100, max_value=200, value=50, step=0.1, options=options)
st.markdown("Value: %s" % (slider_value))

with st.sidebar:
    st.markdown("This is another slider with all default options:")
    value = st_input_slider()
    value
