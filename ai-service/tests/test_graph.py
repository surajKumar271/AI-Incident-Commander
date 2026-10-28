
from unittest.mock import patch

from app.graph import incident_graph
from app.nodes.root_cause import identify_root_cause


@patch("app.graph.identify_root_cause")
def test_complete_incident_graph(mock_root_cause):
    mock_root_cause.return_value = {
        "probable_root_cause": (
            "PostgreSQL connection was refused; "
            "the underlying cause is not yet confirmed."
        ),
        "confidence": 0.7,
        "reasoning": (
            "The log confirms a refused connection, "
            "but does not establish why it was refused."
        ),
        "evidence_used": [
            "Connection refused while connecting to PostgreSQL"
        ],
        "status": "root_cause_analysis_completed",
    }

    initial_state = {
        "incident_id": "TEST-001",
        "service": "backend",
        "description": "Database connectivity incident",
        "logs": [
            "Connection refused while connecting to PostgreSQL"
        ],
    }

    # Compile a test graph using the real investigation and recovery nodes,
    # with only the root-cause node mocked.
    from langgraph.graph import StateGraph, START, END
    from app.state import IncidentState
    from app.nodes.investigation import investigate_incident
    from app.nodes.recovery import recommend_recovery

    builder = StateGraph(IncidentState)
    builder.add_node("investigation", investigate_incident)
    builder.add_node("root_cause", mock_root_cause)
    builder.add_node("recovery", recommend_recovery)
    builder.add_edge(START, "investigation")
    builder.add_edge("investigation", "root_cause")
    builder.add_edge("root_cause", "recovery")
    builder.add_edge("recovery", END)

    test_graph = builder.compile()
    result = test_graph.invoke(initial_state)

    assert result["incident_id"] == "TEST-001"
    assert result["service"] == "backend"
    assert result["evidence"]
    assert "connection was refused" in result["probable_root_cause"].lower()
    assert result["recovery_recommendation"]
    assert result["status"] == "analysis_completed"
    mock_root_cause.assert_called_once()
