FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install google-genai

COPY . .

CMD ["python", "start.py"]