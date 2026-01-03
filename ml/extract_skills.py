import spacy
nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    "python", "java", "javascript", "react", "node", "express",
    "mongodb", "sql", "docker", "aws", "kubernetes", "html", "css"
]

def extract_skills(text):
    doc = nlp(text.lower())
    found = []

    for token in doc:
        #print(f"Found skill: {token}")
        if token.text in SKILLS_DB:
            found.append(token.text)

    return list(set(found))


