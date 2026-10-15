
import os

from dotenv import load_dotenv
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq

from app.state import IncidentState


load_dotenv()


class RootCauseAnalysis(BaseModel):
    probable_root_cause: str = Field(
        description="Observed failure or most likely cause, clearly distinguishing symptoms from hypotheses"
    )
    confidence: float = Field(
        ge=0.0,
        le=1.0,
        description="Evidence-based confidence score between 0 and 1"
    )
    reasoning: str = Field(
        description="Evidence-grounded explanation separating facts from hypotheses"
    )
    evidence_used: list[str] = Field(
        description="Exact evidence strings selected from the supplied evidence"
    )


api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv(
    "GROQ_MODEL",
    "openai/gpt-oss-120b"
)

if not api_key:
    raise RuntimeError(
        "GROQ_API_KEY is missing. Add it to ai-service/.env."
    )

llm = ChatGroq(
    model=model_name,
    temperature=0,
    api_key=api_key,
)

structured_llm = llm.with_structured_output(
    RootCauseAnalysis
)


def identify_root_cause(state: IncidentState) -> dict:
    evidence = state.get("evidence", [])

    if not evidence:
        return {
            "probable_root_cause": (
                "Insufficient evidence to determine the root cause."
            ),
            "confidence": 0.0,
            "reasoning": (
                "No matching error evidence was extracted from the logs. "
                "Collect relevant application logs, metrics, and dependency "
                "health information before identifying a cause."
            ),
            "evidence_used": [],
            "status": "insufficient_evidence",
        }

    prompt = f"""
You are the root-cause analysis agent in AI Incident Commander.

Your task is to distinguish observed symptoms from possible underlying causes.

INCIDENT CONTEXT
Incident ID: {state.get("incident_id", "unknown")}
Service: {state.get("service", "unknown")}
Description: {state.get("description", "Not provided")}

OBSERVED EVIDENCE
{evidence}

STRICT ANALYSIS RULES

1. Treat the description as incident context, not proof that its stated
   diagnosis is correct.

2. Treat the supplied evidence as the primary source of factual claims.

3. Explicitly distinguish:
   - Observed symptom: what the evidence directly establishes.
   - Probable cause: a plausible explanation supported by the evidence.
   - Unknowns: what cannot yet be determined.

4. For a log containing "timed out", "timeout", or "ETIMEDOUT":
   - Identify the observed symptom as a request or operation timeout.
   - Consider possible causes such as slow dependencies, network latency,
     resource saturation, or blocked requests only as hypotheses.
   - Do not conclude that a database is down unless the evidence supports it.

5. For a log containing "ECONNREFUSED" or "connection refused":
   - State that the connection attempt was refused.
   - Consider an unavailable endpoint, stopped service, or connectivity
     configuration problem as possibilities.
   - Do not claim to know which possibility is responsible without evidence.

6. If the evidence supports only a symptom, use that symptom in
   probable_root_cause and explicitly state that the underlying cause
   remains undetermined.

7. Select evidence_used only from the supplied evidence. Preserve the
   selected evidence strings exactly.

8. Do not invent logs, metrics, deployments, infrastructure states, or
   successful recovery actions.

9. Use lower confidence when multiple causes remain plausible.
   Confidence is a qualitative model estimate, not a calibrated probability.

10. Keep the analysis specific to the supplied service and evidence.
    Do not repeat an unsupported diagnosis from the incident description.

Return a structured result containing the probable root cause, confidence,
reasoning, and evidence used.
"""

    result = structured_llm.invoke(prompt)

    valid_evidence = set(evidence)
    selected_evidence = [
        item
        for item in result.evidence_used
        if item in valid_evidence
    ]

    return {
        "probable_root_cause": result.probable_root_cause,
        "confidence": result.confidence,
        "reasoning": result.reasoning,
        "evidence_used": selected_evidence,
        "status": "root_cause_analysis_completed",
    }
