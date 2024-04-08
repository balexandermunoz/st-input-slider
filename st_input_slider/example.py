import streamlit as st

from st_input_slider import st_input_slider

st.title("Slider + Input Example!")
options = {
    "color": "#9E9A35",
    "inputWidth": "58px",
    "disableUnderline": True
}
num_clicks = st_input_slider(
    label="A custom slider", min_value=-100, max_value=200, value=50, step=0.1, options=options)
st.markdown("Value: %s" % (num_clicks))

with st.sidebar:
    st.markdown("This is another slider with all default options:")
    st_input_slider()
