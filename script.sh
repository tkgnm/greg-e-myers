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

for path in "${paths[@]}"; do
  url="$base_url$path"
  echo "Requesting URL: $url at $(date +"%Y-%m-%d %H:%M:%S")"
  response=$(curl -w "\nTime: %{time_total}\nStatus Code: %{http_code}" "$url")
  echo -e "$response\n---------------------------------------"
done

