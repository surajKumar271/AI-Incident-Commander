
from fastapi import FastAPI
from pydantic import BaseModel, Field

from app.graph import incident_graph

app = FastAPI(
    title="AI Incident Commander",
    description="AI-powered incident investigation service",
    version="1.0.0",
)


class IncidentRequest(BaseModel):
    incident_id: str
    service: str
    description: str
    logs: list[str] = Field(default_factory=list)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ai-incident-commander",
        "ai_workflow": "initialized",
    }


@app.post("/analyze")
def analyze_incident(request: IncidentRequest):
    result = incident_graph.invoke(request.model_dump())

    return {
        "incident_id": result["incident_id"],
        "service": result["service"],
        "evidence": result.get("evidence", []),
        "probable_root_cause": result.get(
            "probable_root_cause", ""
        ),
        "reasoning": result.get("reasoning", ""),
"evidence_used": result.get("evidence_used", []),
        "confidence": result.get("confidence", 0.0),
        "recovery_recommendation": result.get(
            "recovery_recommendation", ""
        ),
        "status": result.get("status", "unknown"),
    }
