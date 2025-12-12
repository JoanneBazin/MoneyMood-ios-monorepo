#!/bin/bash
set -e

cleanup() {
  echo "🧹 Cleaning up..."
  docker stop ci-test-postgres
  docker rm ci-test-postgres
}

trap cleanup EXIT

echo "🐳 Starting PostgreSQL..."
docker rm -f ci-test-postgres 2>/dev/null || true
docker run --name ci-test-postgres \
  -e POSTGRES_USER=test \
  -e POSTGRES_PASSWORD=test \
  -e POSTGRES_DB=test_db \
  -p 5433:5432 \
  -d postgres:15

echo "⏳ Waiting for PostgreSQL..."
sleep 3
docker exec ci-test-postgres pg_isready -U test -d test_db

echo "📝 Writing test DATABASE_URL..."
cat > .env.ci-local <<EOF
DATABASE_URL=postgres://test:test@localhost:5433/test_db
EOF


echo "📦 Loading env variables..."
export $(cat .env.ci-local | xargs)

echo "🔄 Syncing database..."
cd ../backend/ && npx prisma db push --force-reset


echo "🎭 Running Playwright tests..."
cd ../ && cd ./e2e/ && npx playwright test --headed --reporter=list --retries=0




# chmod +x test-ci-e2e.sh
# ./test-ci-e2e.sh