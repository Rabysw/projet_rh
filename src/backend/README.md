# ICES HR Platform - FastAPI Backend

This is the FastAPI backend for the ICES HR Platform, converted from the original Motoko implementation.

## Setup

### Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Edit `.env` with your configuration.

### Running the Server

Development:
```bash
python main.py
```

Production:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication
All endpoints require Bearer token authentication. For testing, use these tokens:
- Admin: `admin-token`
- User: `user-token` 
- Manager: `manager-token`

### Employees
- `POST /api/v1/employees/` - Create employee
- `GET /api/v1/employees/` - List employees (with filtering and pagination)
- `GET /api/v1/employees/{id}` - Get employee by ID
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee (admin only)
- `POST /api/v1/employees/{id}/profile-picture` - Upload profile picture

### Departments
- `POST /api/v1/departments/` - Create department
- `GET /api/v1/departments/` - List departments
- `GET /api/v1/departments/{id}` - Get department by ID
- `PUT /api/v1/departments/{id}` - Update department
- `DELETE /api/v1/departments/{id}` - Delete department (admin only)
- `GET /api/v1/departments/{id}/with-count` - Get department with employee count

### Dashboard
- `GET /api/v1/dashboard/stats` - Get dashboard statistics

## Project Structure

```
src/backend/
├── main.py                 # FastAPI application entry point
├── requirements.txt       # Python dependencies
├── models/               # Pydantic models
│   ├── employee.py       # Employee models
│   ├── department.py    # Department models
│   └── dashboard.py      # Dashboard models
├── api/                  # API routers
│   ├── employees.py      # Employee endpoints
│   ├── departments.py    # Department endpoints
│   └── dashboard.py      # Dashboard endpoints
├── services/             # Business logic
│   ├── employee_service.py
│   ├── department_service.py
│   └── dashboard_service.py
├── auth/                 # Authentication
│   └── auth.py          # User authentication
└── .env.example         # Environment variables template
```

## Notes

- This implementation uses in-memory storage for simplicity. In production, replace with a proper database.
- Authentication is simplified for development. Use proper JWT tokens in production.
- File uploads are simulated. Implement proper cloud storage integration in production.
