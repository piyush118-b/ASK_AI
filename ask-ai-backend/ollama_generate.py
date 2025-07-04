import requests
import json
import sys

prompt = sys.argv[1]

url = 'http://localhost:11434/api/generate'
data = {
    'model': 'llama3.2',
    'prompt': prompt,
}

response = requests.post(url, json=data, stream=True)

if response.status_code == 200:
    for line in response.iter_lines():
        if line:
            decoded_line = line.decode('utf-8')
            result = json.loads(decoded_line)
            generated_text = result.get('response', '')
            print(generated_text, end='', flush=True)
else:
    print(f"ERROR: {response.status_code} {response.text}")
