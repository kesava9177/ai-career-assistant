def suggest_role(skills):
    skills = set(skills)

    # Score mapping
    role_scores = {
        "Fullstack Developer": 0,
        "Backend Developer": 0,
        "DevOps Engineer": 0,
        "Machine Learning Engineer": 0,
        "Frontend Developer": 0,
        "Software Engineer": 0
    }

    # ---- Fullstack ----
    if "react" in skills:
        role_scores["Fullstack Developer"] += 1
        role_scores["Frontend Developer"] += 1
    if "node" in skills:
        role_scores["Fullstack Developer"] += 1
        role_scores["Backend Developer"] += 1

    # ---- Backend ----
    if "python" in skills:
        role_scores["Backend Developer"] += 1
    if "sql" in skills or "mongodb" in skills:
        role_scores["Backend Developer"] += 1

    # ---- DevOps ----
    if "docker" in skills:
        role_scores["DevOps Engineer"] += 1
    if "aws" in skills or "kubernetes" in skills:
        role_scores["DevOps Engineer"] += 1

    # ---- ML Engineer ----
    if "python" in skills:
        role_scores["Machine Learning Engineer"] += 1
    if "sql" in skills:
        role_scores["Machine Learning Engineer"] += 1
    # Only give extra score if ML-specific skills exist
    ML_SKILLS = {"numpy", "pandas", "sklearn", "tensorflow", "pytorch"}
    if ML_SKILLS.intersection(skills):
        role_scores["Machine Learning Engineer"] += 3

    # ---- Frontend ----
    if "react" in skills or "javascript" in skills or "html" in skills or "css" in skills:
        role_scores["Frontend Developer"] += 1

    # Pick the role with highest score
    best_role = max(role_scores, key=role_scores.get)

    # If all scores are 0 → default
    if role_scores[best_role] == 0:
        return "Software Engineer"

    return best_role
