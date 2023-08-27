#!/bin/bash

# Define the common base URL
base_url="https://greg-e-myers.vercel.app"

# Specify the paths for the URLs
paths=(
  ""
  "/bio"
  "/contact"
  "/gallery/1"
  "/gallery/2"
  "/gallery/4"
  "/gallery/5"
  "/gallery/6"
  "/gallery/7"
  "/gallery/8"
)

# Hit the home page first
home_url="$base_url"
echo "Requesting URL: $home_url at $(date +"%Y-%m-%d %H:%M:%S")"
response=$(curl -w "\nTime: %{time_total}\nStatus Code: %{http_code}" "$home_url")
echo -e "$response\n---------------------------------------"

# Wait for 10 seconds
sleep 10s

# Hit the other pages with a 1-second delay
for path in "${paths[@]:1}"; do
  url="$base_url$path"
  echo "Requesting URL: $url at $(date +"%Y-%m-%d %H:%M:%S")"
  response=$(curl -s -w "\nTime: %{time_total}\nStatus Code: %{http_code}" "$url")
  echo -e "$response\n---------------------------------------"
  sleep 1s
done
