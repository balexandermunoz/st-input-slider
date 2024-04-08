import streamlit as st
from my_component import my_component

st.title("Slider + Input Example!")
options = {"color": "#9E9A35",
           "inputWidth": "58px",
           "disableUnderline": True}
num_clicks = my_component(
    label="A custom slider", min_value=-100, max_value=200, value=50, step=0.1, options=options)
st.markdown("Value: %s" % (num_clicks))

with st.sidebar:
    st.markdown("This is another slider with all default options:")
    my_component()