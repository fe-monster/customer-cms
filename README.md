# Customer CMS

Internal CMS for managing company customers.

## Tech Stack

### Backend
- Python 3.12
- Django REST Framework
- PostgreSQL

### Frontend
- React 19 + TypeScript
- React Router v7
- TanStack Query
- Zustand + Immer
- shadcn/ui + Tailwind CSS

## Quick Start

### Requirements
- Docker
- Docker Compose

### Run

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api

### Seed test data

```bash
docker-compose exec backend python manage.py shell
```

```python
from faker import Faker
from customers.models import Customer

fake = Faker()
customers = [
    Customer(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.unique.email(),
        phone=fake.phone_number()[:20],
    )
    for _ in range(100)
]
Customer.objects.bulk_create(customers)
exit()
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers/` | List customers |
| GET | `/api/customers/?search=john` | Search customers |
| GET | `/api/customers/?ordering=last_name` | Sort customers |
| GET | `/api/customers/?ordering=-last_name` | Sort DESC |
| GET | `/api/customers/?page=2` | Pagination |
| GET | `/api/customers/:id/` | Customer details |
| PATCH | `/api/customers/:id/` | Update customer |
| DELETE | `/api/customers/:id/` | Delete customer |
| POST | `/api/customers/` | Create customer |

## Architecture

### Backend

Standard Django REST Framework layered architecture:
Request → urls.py → views.py → serializers.py → models.py → PostgreSQL
- `CustomerViewSet` — handles all CRUD operations
- `CustomerListSerializer` — lightweight serializer for list view
- `CustomerDetailSerializer` — full serializer for detail view
- `django-filter` — search and ordering out of the box
- `PageNumberPagination` — 20 items per page

### Frontend
## UI Layout

The app is split into two panels:

- **Left panel** — Customer list with infinite scroll and column sorting
- **Right panel** — Customer details with view, edit, and delete actions
- **Header** — Search bar and sort controls

**State management:**
- URL params — search, ordering, selected customer id
- TanStack Query — server state (list, details, mutations)
- Zustand — client state (scroll position, edit mode)
- React Hook Form + Zod — form validation

## Project Structure
## Project Structure

```text
customer-cms/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   └── customers/
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       └── urls.py
└── frontend/
    ├── Dockerfile
    └── app/
        ├── api/
        ├── components/
        ├── hooks/
        ├── store/
        ├── types/
        └── routes/
```