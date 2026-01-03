from flask import Flask,request,jsonify
from extract_skills import extract_skills
from role_predictor import suggest_role

app=Flask(__name__)

@app.route('/analyze',methods=['POST'])
def analyze():
    data=request.get_json()
    text=data.get('text','')
    skills=extract_skills(text)
    role=suggest_role(skills)
    return jsonify({
        'skills':skills,
        'role':role
    })

# if __name__ == "__main__":
#     app.run(port=5001)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
