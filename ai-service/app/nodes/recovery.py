
from app.state import IncidentState


def recommend_recovery(state: IncidentState) -> dict:
    cause = str(state.get("probable_root_cause", "")).lower()
    evidence = state.get("evidence", [])
    combined_evidence = " ".join(
        str(item) for item in evidence
    ).lower()
    description = str(state.get("description", "")).lower()

    # Prioritize actual evidence and use the incident description
    # as supporting context.
    context = f"{combined_evidence} {cause} {description}"

    if not evidence or "insufficient evidence" in cause:
        recommendation = (
            "Collect relevant application logs, request traces, "
            "dependency health checks, and latency/resource metrics. "
            "Do not select a recovery action until sufficient evidence "
            "is available."
        )

    elif any(term in context for term in [
        "password authentication failed",
        "authentication failed",
        "invalid credentials",
        "unauthorized",
        "permission denied",
    ]):
        recommendation = (
            "Verify the affected service's credentials, permissions, "
            "and authentication configuration. Review authentication "
            "logs and secret configuration without exposing credentials. "
            "Do not rotate or change production secrets without "
            "authorization."
        )

    elif any(term in context for term in [
        "econnrefused",
        "connection refused",
    ]):
        recommendation = (
            "Verify that the target service is running and listening "
            "on the expected port. Check hostname resolution, network "
            "connectivity from the application environment, container "
            "health, and connection settings. Do not restart production "
            "services until the cause is verified."
        )

    elif any(term in context for term in [
        "etimedout",
        "timed out",
        "timeout",
        "deadline exceeded",
    ]):
        # Recommend checks for the component mentioned by the evidence.
        payment_context = any(term in context for term in [
            "payment-service",
            "payment service",
            "/api/payments",
        ])

        if payment_context:
            recommendation = (
                "Investigate payment-service response latency using "
                "request traces, service health checks, and latency "
                "metrics. Check downstream dependencies, network "
                "latency, request queueing, and resource saturation. "
                "Review timeout settings only after identifying where "
                "the delay occurs. For payment retries, verify "
                "idempotency safeguards to prevent duplicate transactions."
            )
        else:
            recommendation = (
                "Identify which operation or dependency exceeded its "
                "deadline. Inspect request traces, latency metrics, "
                "network connectivity, queueing, and resource usage. "
                "Check database response time or connection pool "
                "utilization only if the evidence implicates the database. "
                "Review timeout settings before changing them."
            )

    elif (
        "application-side exception" in cause
        or "exception" in context
        or "stack trace" in context
    ):
        recommendation = (
            "Inspect the application stack trace and affected code path. "
            "Correlate the error with recent deployments and configuration "
            "changes. Consider a controlled rollback only when evidence "
            "links the failure to a specific release and the rollback "
            "is authorized."
        )

    elif (
        "dependency" in cause
        and any(term in cause for term in [
            "unavailable",
            "failure",
            "unreachable",
        ])
    ):
        recommendation = (
            "Check the implicated dependency's health endpoint, "
            "connectivity, response times, and recent errors. Verify "
            "whether dependent requests are failing before considering "
            "retries or failover."
        )

    else:
        recommendation = (
            "Review the supplied evidence and verify the suspected "
            "cause using relevant service health checks, logs, and "
            "metrics before taking recovery action."
        )

    return {
        "recovery_recommendation": recommendation,
        "status": "analysis_completed",
    }
