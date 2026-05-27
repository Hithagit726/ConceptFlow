FROM python:3.11-slim

WORKDIR /app

# Force rebuild v3
COPY . .

RUN pip install -r requirements.txt
RUN pip install google-genai

CMD ["python", "start.py"]