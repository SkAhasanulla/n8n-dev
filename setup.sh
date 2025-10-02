#!/bin/bash

echo "📁 Creating data folders..."
mkdir -p data/db_storage \
         data/n8n_storage \
         data/redis_storage \
         data/pgadmin_data \
         data/prometheus_data \
         data/grafana_data

echo "📄 Adding .gitkeep placeholders..."
for d in data/*; do
  touch "$d/.gitkeep"
done

echo "🔐 Setting permissions..."
chmod -R 777 data

echo "✅ Folder structure is ready!"
echo "---------------------------------------------------"
echo "If you are running this locally or on a VPS,"
echo "you can now deploy with: docker-compose up -d"
