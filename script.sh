#!/bin/bash

urls=(
  "greg-e-myers.vercel.app"
  "greg-e-myers.vercel.app/bio"
  "greg-e-myers.vercel.app/contact"
  "greg-e-myers.vercel.app/gallery/1"
  "greg-e-myers.vercel.app/gallery/2"
  "greg-e-myers.vercel.app/gallery/4"
  "greg-e-myers.vercel.app/gallery/5"
  "greg-e-myers.vercel.app/gallery/6"
  "greg-e-myers.vercel.app/gallery/7"
  "greg-e-myers.vercel.app/gallery/8"
)

for url in "${urls[@]}"; do
  echo "Hitting URL: $url"
  curl "$url"  # -s flag is used to silence curl's progress output
  echo "---------------------------------------"
done

