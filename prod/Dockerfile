# Pull base image
FROM python:3.7

# Set enviroment variable
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

COPY requirements.txt ./
RUN pip install -r requirements.txt

# EXPOSE 8000
COPY . ./


COPY ./prod/entrypoint.sh /entrypoint.sh



RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
