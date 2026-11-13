# TastyBites

TastyBites is a full-stack restaurant customer and order management application. It provides a simple dashboard for tracking customers, creating orders, reviewing revenue, and managing upcoming reservations.

The project is built with a React and TypeScript frontend, a FastAPI backend, PostgreSQL persistence, and Nginx as the production web server and reverse proxy.

## Features

- Dashboard with customer, order, revenue, and reservation summaries
- Customer registration and profile management
- Customer search, details, editing, and deletion
- Order creation with customer, menu item, payment, amount, and reservation details
- Order search and deletion
- Recent activity feed based on customer registrations and orders
- REST API backed by PostgreSQL
- Single-page application routing through Nginx
- Docker Compose setup for the complete stack

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router, Tailwind CSS |
| Backend | FastAPI, Uvicorn, SQLAlchemy, Pydantic |
| Database | PostgreSQL 15 |
| Web server | Nginx |
| Containerization | Docker and Docker Compose |

## Project structure

```text
.
├── backend/
│   ├── app/
│   │   ├── crud.py       # Customer and order API routes
│   │   ├── db.py         # SQLAlchemy engine and sessions
│   │   ├── main.py       # FastAPI application
│   │   ├── models.py     # Customer and order database models
│   │   └── schemas.py    # Request and response schemas
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/          # Backend client functions
│   │   ├── components/   # Shared layout components
│   │   └── pages/        # Dashboard, customer, and order screens
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   ├── default.conf      # SPA fallback and API reverse proxy
│   └── Dockerfile
└── docker-compose.yml
```

## Quick start with Docker

### Prerequisites

- Docker Desktop with Docker Compose
- Ports `80` and `5432` available

### Start the application

From the repository root:

```bash
docker compose up --build
```

Open the application at [http://localhost](http://localhost).

The Compose stack contains:

- `db`: PostgreSQL database
- `backend`: FastAPI service on port `8000` inside the Docker network
- `frontend`: frontend build container
- `nginx`: public web server on port `80`

To stop the services:

```bash
docker compose down
```

To stop the services and remove the database volume:

```bash
docker compose down -v
```

> **Development warning:** The Compose Nginx service mounts `./frontend/dist` from the host. If the frontend build is not present locally, run `npm install` and `npm run build` in `frontend/` before starting the Compose stack, or adjust the Compose configuration to serve the frontend image output directly.

## Local frontend development

```bash
cd frontend
npm install
npm run dev
```

The Vite development server runs at [http://localhost:5173](http://localhost:5173). The frontend expects API requests at `/api`, so use the Docker/Nginx setup or configure a development proxy when running the frontend independently.

Useful frontend commands:

```bash
npm run build
npm run lint
npm run preview
```

## Local backend development

The backend requires a PostgreSQL connection string in `DATABASE_URL`.

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
$env:DATABASE_URL = "postgresql://postgres:password@localhost:5432/tastybites"
uvicorn app.main:app --reload
```

The API is then available at [http://localhost:8000](http://localhost:8000). FastAPI's interactive documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs).

When running only the backend locally, start PostgreSQL separately and create the `tastybites` database with the configured user and password.

## API reference

The backend is mounted under `/api` when accessed through Nginx.

### Customers

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/customers/` | List all customers |
| `GET` | `/api/customers/{customer_id}` | Get one customer and their orders |
| `POST` | `/api/customers/` | Create a customer |
| `PUT` | `/api/customers/{customer_id}` | Update a customer |
| `DELETE` | `/api/customers/{customer_id}` | Delete a customer |

### Orders

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/orders/` | List all orders |
| `GET` | `/api/orders/{order_id}` | Get one order |
| `POST` | `/api/orders/` | Create an order |
| `PUT` | `/api/orders/{order_id}` | Update an order |
| `DELETE` | `/api/orders/{order_id}` | Delete an order |

Customer deletion cascades to its related orders at the database model level.

## Data model

### Customer

- `id`
- `first_name`
- `surname`
- `middle_name`
- `dob`
- `address`
- `registration_date`
- `matric_no`
- `orders`

### Order

- `id`
- `order_date`
- `menu_item`
- `special_instructions`
- `payment_method`
- `next_reservation`
- `total_amount`
- `customer_id`

The backend creates the tables on application startup using SQLAlchemy metadata. There are currently no migration files, so production database schema changes should be introduced with a migration strategy before deployment.

## Configuration and deployment notes

- Docker Compose uses PostgreSQL database `tastybites`, user `postgres`, and password `password` by default.
- The default database credentials are suitable for local development only. Replace them before deploying to a shared or production environment.
- Nginx serves the frontend and proxies `/api/` requests to the backend service.
- Client-side routes fall back to `index.html`, allowing direct navigation to routes such as `/customers` and `/orders`.
- The backend allows CORS requests from `http://localhost:5173` and `http://tastybites.com`.
- For separate hosting, set `VITE_API_URL` to the backend URL and `CORS_ORIGINS` to the exact frontend origin, without a trailing slash. The frontend adds `/api` automatically if it is missing.

## License

See [LICENSE](LICENSE) for license information.
