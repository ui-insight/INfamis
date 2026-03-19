# INfamis

**INfamis** (Integrated Facilities and Asset Management Information System) is a modern replacement for the University of Idaho's legacy FAMIS system. It provides facilities management, asset tracking, and maintenance operations through a modern web interface.

> Built from the [UI-Insight TEMPLATE-app](https://github.com/ui-insight/TEMPLATE-app) using patterns from [OpenERA](https://github.com/ui-insight/OpenERA).

---

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 22+ and npm
- Docker and Docker Compose (optional, for containerized development)

### Development Setup

**Backend** (Terminal 1):
```bash
cd backend
python -m venv .venv
source .venv/bin/activate    # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env   # Then edit .env with your settings
uvicorn app.main:app --reload --port 8000
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm install
npm run dev
```

The frontend dev server runs at `http://localhost:5173` and proxies API requests to `http://localhost:8000`.

### Docker

```bash
docker compose up --build
```

Access the application at `http://localhost:9200`. The frontend nginx container proxies `/api/` requests to the backend.

---

## Project Structure

```
├── backend/              # FastAPI application
│   ├── app/
│   │   ├── api/v1/       # Route handlers
│   │   ├── auth/         # Authentication logic
│   │   ├── db/           # Database engine and seeds
│   │   ├── models/       # SQLAlchemy ORM models
│   │   ├── schemas/      # Pydantic schemas
│   │   ├── services/     # Business logic
│   │   ├── config.py     # Settings
│   │   └── main.py       # App entry point
│   └── tests/
├── frontend/             # React application
│   └── src/
│       ├── api/          # API client modules
│       ├── components/   # UI components
│       ├── pages/        # Route pages
│       └── types/        # TypeScript interfaces
├── docs/                 # MkDocs documentation
├── CLAUDE.md             # Canonical tracked AI agent context
├── .claude/README.md     # Local tool-helper guidance
└── docker-compose.yml
```

See `CLAUDE.md` for the complete project structure and conventions.

---

## Development

### Running Tests

```bash
# Backend
cd backend && pytest -v --tb=short

# Frontend
cd frontend && npm run build && npm test
```

### Linting and Formatting

```bash
# Backend
cd backend && ruff check . && ruff format .

# Frontend
cd frontend && npx eslint .
```

### End-to-End Smoke Test

```bash
cd e2e
npm install
npm test
```

The Playwright config starts the frontend dev server automatically on
`http://127.0.0.1:4173` for the homepage smoke test.

If Playwright reports that Chromium is missing on first run, install it with:

```bash
cd e2e
npm run install:browsers
```

### Documentation

```bash
pip install mkdocs-material
python scripts/check_template_docs.py
mkdocs serve
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

All contributors must follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Security

See [SECURITY.md](SECURITY.md) for vulnerability reporting instructions.
CI also generates dependency audit artifacts and SBOMs from the GitHub Actions workflows.

---

## Acknowledgments

- Built on patterns from [OpenERA](https://github.com/ui-insight/OpenERA) by the University of Idaho
- Part of the [UI-Insight](https://github.com/ui-insight) initiative
