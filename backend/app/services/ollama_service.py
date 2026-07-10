import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_llama(prompt):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "llama3",
            "prompt": prompt,
            "stream": False
        }
    )

    response.raise_for_status()
    return response.json()["response"]