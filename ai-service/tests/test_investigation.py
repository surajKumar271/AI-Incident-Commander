
from app.nodes.investigation import investigate_incident


def test_detects_timeout_in_structured_log():
    state = {
        "logs": [
            {
                "level": "ERROR",
                "message": (
                    "API request timed out after 30000ms "
                    "while waiting for payment-service"
                ),
                "timestamp": "2026-10-20T10:00:00Z",
            }
        ]
    }

    result = investigate_incident(state)

    assert result["status"] == "investigation_completed"
    assert len(result["evidence"]) == 1
    assert "timed out" in result["evidence"][0].lower()


def test_detects_connection_refused():
    state = {
        "logs": [
            "Connection refused while connecting to PostgreSQL"
        ]
    }

    result = investigate_incident(state)

    assert len(result["evidence"]) == 1
    assert "connection refused" in result["evidence"][0].lower()


def test_detects_authentication_failure():
    state = {
        "logs": [
            {
                "level": "ERROR",
                "message": "Password authentication failed",
            }
        ]
    }

    result = investigate_incident(state)

    assert len(result["evidence"]) == 1
    assert "authentication failed" in result["evidence"][0].lower()


def test_returns_empty_evidence_when_no_logs_exist():
    result = investigate_incident({"logs": []})

    assert result["evidence"] == []
    assert result["status"] == "investigation_completed"


def test_ignores_unrelated_info_log():
    state = {
        "logs": [
            {
                "level": "INFO",
                "message": "Application started successfully",
            }
        ]
    }

    result = investigate_incident(state)

    assert result["evidence"] == []
