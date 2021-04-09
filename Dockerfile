# Pull base image
FROM python:3.7

# Set enviroment variable
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./

EXPOSE 8000