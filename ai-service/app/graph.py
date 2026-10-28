
from langgraph.graph import StateGraph, START, END

from app.state import IncidentState
from app.nodes.investigation import investigate_incident
from app.nodes.root_cause import identify_root_cause
from app.nodes.recovery import recommend_recovery


builder = StateGraph(IncidentState)

builder.add_node("investigation", investigate_incident)
builder.add_node("root_cause", identify_root_cause)
builder.add_node("recovery", recommend_recovery)

builder.add_edge(START, "investigation")
builder.add_edge("investigation", "root_cause")
builder.add_edge("root_cause", "recovery")
builder.add_edge("recovery", END)

incident_graph = builder.compile()
