# Customer CMS — Backend

Django REST Framework API for managing company customers.

## Tech Stack

- Python 3.12
- Django REST Framework
- PostgreSQL
- Docker

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers/` | List all customers |
| GET | `/api/customers/?search=john` | Search customers |
| GET | `/api/customers/?ordering=last_name` | Sort customers |
| GET | `/api/customers/?page=2` | Pagination |
| GET | `/api/customers/:id/` | Customer details |
| PATCH | `/api/customers/:id/` | Update customer |
| DELETE | `/api/customers/:id/` | Delete customer |
| POST | `/api/customers/` | Create customer |

## Run with Docker

```bash
docker-compose up --build
```

Apply migrations:

```bash
docker-compose exec backend python manage.py migrate
```

Seed test data:

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
    for _ in range(50)
]
Customer.objects.bulk_create(customers)
exit()
```

## Project Structure

```
backend/
├── config/          # Django settings and main urls
├── customers/       # Customers app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── Dockerfile
└── requirements.txt
```