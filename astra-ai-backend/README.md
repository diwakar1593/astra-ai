# 🚀 Astra AI

> Enterprise AI Copilot built with Spring Boot, Java, PostgreSQL, JWT Authentication, Role-Based Authorization, and Modern AI Technologies.

---

## 📖 Overview

Astra AI is an enterprise-grade AI Copilot platform being built from scratch following production-level architecture and best practices.

The platform is designed to provide secure, scalable, and intelligent AI-powered services.

### 🚀 Planned Features

- 🤖 AI Chat
- 💬 Conversation Memory
- 📄 PDF Upload & Analysis
- 🧠 RAG (Retrieval Augmented Generation)
- 🔍 Semantic Search
- 🎤 Voice Assistant
- 🤖 AI Agents
- 📁 Document Management
- 📊 Admin Dashboard
- 🔐 Enterprise Security
- ☁️ Cloud Deployment
- 🐳 Docker & Kubernetes

---

# 🛠 Technology Stack

## Backend

- Java 21
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- Hibernate
- Maven

## Database

- PostgreSQL

## API Documentation

- Swagger / OpenAPI 3

## Security

- BCrypt Password Encoder
- JWT Authentication
- Role-Based Authorization
- Method Level Security
- Custom Security Exception Handling

---

# 📂 Project Structure

```text
src
└── main
    ├── java
    │   └── com.astra.ai
    │       ├── auth
    │       ├── common
    │       ├── config
    │       ├── controller
    │       ├── dto
    │       │     ├── request
    │       │     └── response
    │       ├── entity
    │       ├── enums
    │       ├── exception
    │       ├── mapper
    │       ├── repository
    │       ├── security
    │       ├── service
    │       │      └── impl
    │       └── AstraAiApplication
    │
    └── resources
           ├── application.properties
           └── static
```

---

# 🏗 Development Roadmap

| Phase | Status |
|--------|--------|
| Phase 1 - Project Setup | ✅ Completed |
| Phase 2 - User Management | ✅ Completed |
| Phase 3 - Authentication & JWT | ✅ Completed |
| Phase 4 - Enterprise Authorization | ✅ Completed |
| Phase 5 - AI Chat Module | ⏳ Planned |
| Phase 6 - Conversation Memory | ⏳ Planned |
| Phase 7 - PDF Upload | ⏳ Planned |
| Phase 8 - RAG Implementation | ⏳ Planned |
| Phase 9 - Voice Assistant | ⏳ Planned |
| Phase 10 - AI Agents | ⏳ Planned |
| Phase 11 - Admin Dashboard | ⏳ Planned |
| Phase 12 - Docker | ⏳ Planned |
| Phase 13 - Cloud Deployment | ⏳ Planned |

---

# ✅ Phase 1 — Project Setup

### Completed

- Spring Boot Project Initialization
- Java 21 Configuration
- Maven Configuration
- PostgreSQL Configuration
- Swagger Integration
- Spring Boot Actuator
- Global API Response Wrapper
- Global Exception Handling
- REST API Versioning
- Health Check API

---

# ✅ Phase 2 — User Management

## Features

- User Entity
- Repository Layer
- DTO Pattern
- Mapper Layer
- Service Layer
- CRUD Operations
- Bean Validation
- Duplicate Email Validation
- Global Exception Handling

---

# ✅ Phase 3 — Authentication & JWT

## Spring Security

- Spring Security Configuration
- BCrypt Password Encoder
- Authentication Manager
- Authentication Provider
- Custom UserDetailsService

## Authentication

- User Registration
- User Login
- Password Encryption

## JWT

- JWT Token Generation
- JWT Validation
- JWT Authentication Filter
- Stateless Authentication

## Swagger

- JWT Authorization Support
- Bearer Authentication

---

# ✅ Phase 4 — Enterprise Authorization

## Authorization

- Role-Based Access Control (RBAC)
- ROLE_USER
- ROLE_ADMIN
- Method Level Security
- @PreAuthorize
- Admin-only APIs
- Owner Authorization
- Role Hierarchy

## Security

- Stateless Session Management
- Custom AuthenticationEntryPoint (401)
- Custom AccessDeniedHandler (403)
- Enterprise API Error Responses

---

# 🔐 Authentication Flow

```text
User Login
      │
      ▼
Authentication Manager
      │
      ▼
BCrypt Password Verification
      │
      ▼
JWT Generation
      │
      ▼
JWT Returned
      │
      ▼
Authorization Header
      │
      ▼
JWT Authentication Filter
      │
      ▼
Spring Security
      │
      ▼
Protected API
```

---

# 🔒 Authorization Flow

```text
Request
    │
    ▼
JWT Filter
    │
    ▼
Validate Token
    │
    ▼
Load UserDetails
    │
    ▼
Security Context
    │
    ▼
@PreAuthorize
    │
    ▼
Authorized API
```

---

# 📦 Available APIs

## Authentication

| Method | Endpoint |
|---------|-----------|
| POST | /api/v1/auth/register |
| POST | /api/v1/auth/login |

---

## User APIs

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/v1/users/me | USER / ADMIN |
| PUT | /api/v1/users/{id} | OWNER / ADMIN |

---

## Admin APIs

| Method | Endpoint | Access |
|---------|----------|--------|
| GET | /api/v1/users | ADMIN |
| GET | /api/v1/users/{id} | ADMIN |
| POST | /api/v1/users | ADMIN |
| DELETE | /api/v1/users/{id} | ADMIN |
| PATCH | /api/v1/users/{id}/role | ADMIN |

---

# 🔒 Security Features

- BCrypt Password Hashing
- JWT Authentication
- Stateless Session Management
- Role-Based Authorization
- Method Level Security
- Role Hierarchy
- Owner Authorization
- Custom 401 Responses
- Custom 403 Responses
- Global API Response Wrapper
- Swagger JWT Authorization

---

# 🚀 Upcoming Features

## Phase 5

- AI Chat
- Streaming Responses
- Multi AI Provider Support
- Conversation Persistence
- Chat Sessions

## Future

- PDF Upload
- OCR
- Vector Database
- RAG
- Semantic Search
- AI Agents
- Voice Assistant
- Docker
- Kubernetes
- CI/CD
- Cloud Deployment

---

# ▶ Running the Project

### Clone Repository

```bash
git clone https://github.com/<your-username>/astra-ai.git
```

### Navigate

```bash
cd astra-ai
```

### Configure PostgreSQL

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/astra_ai
spring.datasource.username=<username>
spring.datasource.password=<password>
```

### Run the Application

```bash
mvn spring-boot:run
```

---

# 📘 Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

---

# 📈 Current Project Status

| Module | Status |
|---------|--------|
| Project Setup | ✅ |
| User Management | ✅ |
| JWT Authentication | ✅ |
| Enterprise Authorization | ✅ |
| Swagger | ✅ |
| PostgreSQL | ✅ |
| AI Chat | 🚧 |
| Conversation Memory | 🚧 |
| PDF Upload | 🚧 |
| RAG | 🚧 |
| Voice Assistant | 🚧 |
| AI Agents | 🚧 |
| Docker | 🚧 |
| Cloud Deployment | 🚧 |

---

# ❤️ Author

**Diwakar Kumar**

---

# 📜 License

Licensed under the Apache License 2.0.