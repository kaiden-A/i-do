# i-Do : Your Study Manager

A monorepo containing a frontend and backend for the "i-do" project.

> Short description
> i-do is a study management web app designed to help students organize tasks, collaborate in groups, and stay accountable. It allows users to manage assignments, track progress, and receive real-time notifications—making studying more structured, efficient, and stress-free.

Table of contents
- [Repository structure](#repository-structure)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local setup (frontend)](#local-setup-frontend)
  - [Local setup (backend)](#local-setup-backend)
  - [Running both services](#running-both-services)
- [Environment variables](#environment-variables)
- [Development workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Maintainers / Contact](#maintainers--contact)
- [Notes / TODOs](#notes--todos)

Repository structure
```
/
├── frontend/        # Frontend application (web client)
├── backend/         # Backend API / server
└── .gitignore
```
- I observed the repository contains `frontend` and `backend` top-level directories. Fill each with the actual framework/language details if you'd like them listed here.

Tech stack
- Frontend: React  
- Backend: Node js Express js  
- Database: MySql
- Package managers: npm

Getting started

Prerequisites
- Install Node.js .
- Install a package manager npm.
- Install MySql.
- (Optional) Install Docker and Docker Compose if you prefer containerized development.

Local setup (frontend)
1. Open a terminal and go to the frontend folder:
   - cd frontend
2. Install dependencies:
   - npm install
   - OR
   - yarn install
3. Configure environment variables:
   - Create a `.env` file
4. Start the dev server:
   - npm run dev
   - OR
   - npm start
5. The frontend should be available at http://localhost:5172 at Vite port.

Local setup (backend)
1. Open a terminal and go to the backend folder:
   - cd backend
2. Install dependencies:
   - npm install
3. Configure environment variables:
   - Create a `.env` file.
   - Ensure DB credentials and any API keys are set.
4. Start the backend:
   - npm run dev
5. The backend should be available at http://localhost:5000 

Running both services
- Option A: Start backend then frontend in separate terminals.
- Option B: Use a top-level `scripts/` or Docker Compose if provided:
  - docker-compose up --build

Environment variables
Create a `.env` in both `frontend/` and `backend/` as needed. Example placeholders (replace with actual keys and values):

frontend/.env
```
VITE_BACKEND_API=http://localhost:4000
```

backend/.env
```
MYSQL_HOST = 'value_for_host'
MYSQL_PORT = 'mysql_port'
MYSQL_PASSWORD = 'database_password'
MYSQL_USER = 'database_user'
MYSQL_DB = 'database_name'

DB_SSL_CERT= 'optional_for_cloud'
JWT_SECRET = 'value_for_jwt'
NODE_ENV = 'development and production for deploy'

FRONTEND_URL = 'http://localhost:5173'

BREVO_API_KEY = 'brevo_api_key'
```

Development workflow
- Implement features on feature branches:
  - git checkout -b feat/short-description
- Commit with meaningful messages and open a pull request when ready.
- Ensure code is linted and tests pass before merging.
- Use conventional commits if the team prefers (optional).



Deployment
- Common deployment strategies:
  - Deploy backend to a cloud provider (Heroku, Render, AWS Elastic Beanstalk, DigitalOcean App Platform).
  - Build and host the frontend on Vercel, Netlify, or serve via a static site host.
  - Use Docker images + Kubernetes for container orchestration.
- Add CI/CD pipeline (GitHub Actions) to run tests and deploy on merge to main.

Contributing
- Fork the repo and create a feature branch.
- Run tests and linting locally.
- Open a pull request describing the change and referencing any related issues.
- Add unit/integration tests for new features/bug fixes.

License
- Add repository license here (MIT, Apache-2.0, GPL-3.0). If no license is present, add one and include its text in a LICENSE file.

Maintainers / Contact
- Owner: kaiden-A
- For questions and issues, open a GitHub Issue in this repository.

Notes / TODOs
- Add framework-specific README sections for frontend and backend with exact install/run commands.
- Add `.env.example` files to both frontend and backend with required variables.
- Add contributing, code of conduct, and issue templates if desired.
- Add CI configuration (e.g., GitHub Actions) to run tests and linting.

— End of README draft —  
Replace placeholders (framework names, ports, scripts, DB connection strings) with the project's actual details and I will update this README accordingly.
