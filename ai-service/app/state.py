
from typing import TypedDict


class IncidentState(TypedDict, total=False):
    incident_id: str
    service: str
    description: str
    logs: list[str]

    evidence: list[str]
    probable_root_cause: str
    confidence: float
    reasoning: str
    evidence_used: list[str]
    recovery_recommendation: str
    status: str
