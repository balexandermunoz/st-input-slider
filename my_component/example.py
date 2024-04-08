import streamlit as st
from my_component import my_component

st.title("My Component Example")
num_clicks = my_component(
    label="My slider", min_value=-100, max_value=200, value=50, step=0.1)
st.markdown("Value: %s" % int(num_clicks))
