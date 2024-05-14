import os

import streamlit as st
import streamlit.components.v1 as components

from st_input_slider import _RELEASE

if not _RELEASE:
    _component_func = components.declare_component(
        "st-input-slider",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component(
        "st-input-slider", path=build_dir)
