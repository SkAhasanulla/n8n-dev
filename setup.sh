#!/bin/bash
echo "📁 Creating data folders..."
mkdir -p data/db_storage data/n8n_storage data/redis_storage data/pgadmin_data data/prometheus_data data/grafana_data

echo "📄 Adding .gitkeep placeholders..."
for d in data/*; do
  touch "$d/.gitkeep"
done

echo "🔐 Setting permissions..."
chmod -R 777 data

echo "✅ All folders are ready!"
