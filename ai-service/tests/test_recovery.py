
import pytest

from app.nodes.recovery import recommend_recovery


def test_connection_refused_recommends_database_checks():
    state = {
        "probable_root_cause": "PostgreSQL connection refused",
        "evidence": ["Connection refused while connecting to PostgreSQL"],
        "service": "backend",
    }

    result = recommend_recovery(state)

    assert result["recovery_recommendation"]
    assert result["status"] == "analysis_completed"


def test_authentication_failure_recommends_credentials_check():
    state = {
        "probable_root_cause": "Database authentication failure",
        "evidence": ["Password authentication failed for user payment_app"],
        "service": "payment-service",
    }

    result = recommend_recovery(state)
    

    assert result["recovery_recommendation"]
    assert result["status"] == "analysis_completed"


def test_timeout_recommends_latency_investigation():
    state = {
        "probable_root_cause": "Payment service request timed out",
        "evidence": [
            "API request timed out after 30000ms while waiting for the payment service response"
        ],
        "service": "payment-service",
    }

    result = recommend_recovery(state)

    assert result["recovery_recommendation"]
    assert result["status"] == "analysis_completed"


def test_insufficient_evidence_recommends_more_diagnostics():
    state = {
        "probable_root_cause": "Insufficient evidence to determine root cause",
        "evidence": [],
        "service": "backend",
    }

    result = recommend_recovery(state)

    assert result["recovery_recommendation"]
    assert result["status"] == "analysis_completed"
