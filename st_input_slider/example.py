import streamlit as st

from st_input_slider import st_input_slider

st.title("Slider + Input Example!")
options = {
    "color": "#9E9A35",  # Default is the primary theme color
    "disableUnderline": False,  # Default is False
    "marks": False,  # Default is False
    "labelPosition": "left",  # "top" or "left". Default is "top"
    "fontSize": 14,  # Default is 12
    "endAdornment": "Hz",  # Default is False (no adornment)
}
slider_value = st_input_slider(
    label="A custom slider", min_value=-100, max_value=200, value=50, step=0.1, options=options)
st.markdown("Value: %s" % (slider_value))

with st.sidebar:
    st.markdown("This is another slider with all default options:")
    slider_value = st_input_slider(
        label="A custom slider1", min_value=-100, max_value=200, value=50, step=0.1)
    st_input_slider(
        label="A custom slider2", min_value=-1000, max_value=20000, value=50, step=0.1,
        options={"marks": True, "labelPosition": "left",
                 "labelWidth": "20%", "sliderWidth": "40%", "inputWidth": "40%"})
    st_input_slider(
        label="A custom slider3", min_value=-0.00001, max_value=0.00002, value=0.000015, step=0.000001, options={"marks": True, "labelPosition": "left"})
    st_input_slider(
        label="Slider :)", min_value=-100, max_value=200, value=50, step=0.1, options={"marks": True, "labelPosition": "left"})
    st_input_slider(
        label=":)", min_value=-100, max_value=200, value=50, step=0.1, options={"labelPosition": "left"})
