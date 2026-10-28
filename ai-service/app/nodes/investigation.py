
from app.state import IncidentState


ERROR_KEYWORDS = [
    "error",
    "exception",
    "failed",
    "failure",
    "timeout",
    "timed out",
    "etimedout",
    "deadline exceeded",
    "refused",
    "unreachable",
    "connection reset",
    "503",
    "502",
    "500",
]


def investigate_incident(state: IncidentState) -> dict:
    logs = state.get("logs", [])
    evidence = []

    for log in logs:
        # Support both plain-text logs and structured log dictionaries.
        if isinstance(log, dict):
            message = str(log.get("message", ""))
            level = str(log.get("level", ""))
            timestamp = str(log.get("timestamp", ""))

            searchable_text = f"{level} {message}".lower()

            if any(keyword in searchable_text for keyword in ERROR_KEYWORDS):
                formatted_evidence = (
                    f"{timestamp} [{level}] {message}"
                    if timestamp
                    else f"[{level}] {message}"
                )
                evidence.append(formatted_evidence)

        else:
            message = str(log)
            searchable_text = message.lower()

            if any(keyword in searchable_text for keyword in ERROR_KEYWORDS):
                evidence.append(message)

    return {
        "evidence": evidence,
        "status": "investigation_completed",
    }
