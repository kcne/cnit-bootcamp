# CNIT Full-Stack Web Development Bootcamp

A comprehensive, hands-on bootcamp covering modern full-stack web development with JavaScript, TypeScript, Node.js, React, databases, and deployment practices. This repository contains 13 progressive modules designed to take students from complete beginners to competent full-stack developers.

## 🎯 Course Overview

This bootcamp provides a structured learning path through the modern web development ecosystem, emphasizing practical, hands-on experience with industry-standard tools and best practices.

### Technologies Covered
- **Backend**: Node.js, Express.js, Prisma ORM, RESTful APIs
- **Frontend**: React, TypeScript, Next.js, Tailwind CSS
- **Databases**: SQLite, PostgreSQL, SQL fundamentals
- **Tools**: Git, Docker, JWT Authentication, Middleware patterns
- **Testing & Validation**: Zod, React Hook Form, Error handling

## 📚 Module Breakdown

### 1. Introduction to Node.js 🟢
**Directory**: `1_Introduction_to_node/`

**Learning Objectives**:
- Understanding server-side JavaScript with Node.js
- Building basic HTTP servers
- Introduction to Express.js framework
- Creating your first web applications

**Key Files**:
- `express-1.js` - Basic Express server setup
- `express-2.js` - Extended Express functionality
- `node-1.js` & `node-2.js` - Core Node.js concepts
- `rest-api.js` - Introduction to RESTful API design

### 2. Introduction to Databases 🗄️
**Directory**: `2_Introduction_to_databases/`

**Learning Objectives**:
- SQL fundamentals and database design
- Entity Relationship Diagrams (ERD)
- Database joins and relationships
- Data modeling concepts

**Key Files**:
- `SQL_FOUNDATIONS_1.ipynb` & `SQL_FOUNDATIONS_2.ipynb` - Interactive SQL exercises
- `ERD_SQL_Homework_1.pdf` - Database design assignments
- SQL JOIN diagram references for visual learning

### 3. Using Databases with Node.js 🔗
**Directory**: `3_Using_databases_with_node/`

**Learning Objectives**:
- Connecting Node.js applications to databases
- Database query patterns and best practices
- Environment configuration with Docker
- Building database-driven APIs

**Features**:
- PostgreSQL integration with Docker Compose
- User and item management systems
- Structured query organization
- Environment-based configuration

### 4. Node.js with React Integration ⚛️
**Directory**: `4_Using_node_with_react/`

**Learning Objectives**:
- Building React frontends
- Connecting React to Node.js backends
- State management and component architecture
- Modern UI development with Tailwind CSS

**Features**:
- Item management interface
- Modal components
- API integration patterns
- Responsive design principles

### 5. React with TypeScript 📘
**Directory**: `5_React_with_typescript/`

**Learning Objectives**:
- TypeScript fundamentals in React
- Type safety and interface design
- API typing and data structures
- Building scalable frontend applications

**Features**:
- Strongly typed React components
- API integration with TypeScript
- Table components with type safety
- Modular component architecture

### 6. TypeScript Exercises 🎯
**Directory**: `6_Typescript_Exercises/`

**Learning Objectives**:
- Core TypeScript concepts and syntax
- Type annotations and inference
- Interfaces, enums, and advanced types
- Practical programming exercises

**Topics Covered**:
- Basic types, arrays, and tuples
- Enums and their practical applications
- Function types and optional parameters
- Interfaces and type aliases
- Union and intersection types

### 7. Express with Prisma ORM 🛠️
**Directory**: `7_Express_With_Prisma/`

**Learning Objectives**:
- Modern database management with Prisma
- Database migrations and seeding
- Advanced Express.js patterns
- Building production-ready APIs

**Features**:
- User, post, and profile management
- Database relationships and constraints
- Migration system understanding
- RESTful API implementation

### 8. Middlewares, Authentication & Validation 🔐
**Directory**: `8_Middlewares_Auth_Validation/`

**Learning Objectives**:
- JWT-based authentication systems
- Middleware patterns and implementation
- Request validation and error handling
- Security best practices

**Features**:
- Token-based authentication
- Custom middleware development
- Request logging and validation
- Role-based access control concepts

### 9. Structured API Development 🏗️
**Directory**: `9_Structured_API/`

**Learning Objectives**:
- Professional API architecture
- Separation of concerns in large applications
- Service layer patterns
- Error handling and async operations

**Architecture**:
- Controllers for request handling
- Services for business logic
- Middleware for cross-cutting concerns
- Type-safe request/response handling

### 10. React with API Integration 🌐
**Directory**: `10_React_With_API/`

**Learning Objectives**:
- Advanced React patterns
- API integration and state management
- Form handling and validation
- User authentication in React

**Features**:
- User registration and login systems
- Data tables with shadcn/ui components
- Context-based state management
- API mutation and query patterns

### 11. Portfolio Application 💼
**Directory**: `11_Portfolio_App/`

**Learning Objectives**:
- Next.js fundamentals
- Static site generation and routing
- Blog system implementation
- Professional portfolio development

**Features**:
- Next.js 14 with App Router
- Dynamic routing for blog posts
- Markdown content management
- Professional portfolio layout

### 12. Next.js with Prisma 🚀
**Directory**: `12_Next_with_prisma/`

**Learning Objectives**:
- Full-stack Next.js development
- Server-side rendering and API routes
- Database integration in Next.js
- Form handling with React Hook Form

**Features**:
- Course and book management systems
- CRUD operations with Next.js API routes
- Form validation with Zod
- Database seeding and migrations

### 13. Pagination and Filtration 📊
**Directory**: `13_Pagination_And_Filtration/`

**Learning Objectives**:
- Advanced API patterns
- Pagination and filtering implementation
- Performance optimization techniques
- Production-ready backend development

**Features**:
- Advanced query building
- Pagination and sorting mechanisms
- Filtering and search functionality
- Inventory management system

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git for version control
- Docker (for certain modules)

### Installation

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd cnit-bootcamp
   ```

2. **Navigate to any module**:
   ```bash
   cd 1_Introduction_to_node
   npm install
   ```

3. **Run the examples**:
   ```bash
   npm run dev
   # or
   node express-1.js
   ```

### For Database Modules

1. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

2. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📋 Learning Path Recommendations

### For Complete Beginners:
1. Start with **Module 1** (Node.js Introduction)
2. Complete **Module 2** (Database Fundamentals)
3. Progress through **Module 3** (Database Integration)
4. Continue sequentially through all modules

### For Developers with Some Experience:
1. Review **Module 6** (TypeScript Exercises) first
2. Jump to **Module 7** (Express with Prisma) if familiar with basics
3. Focus on **Modules 8-13** for advanced concepts

### For Frontend Developers:
1. Start with **Module 4** (React Integration)
2. Complete **Module 5** (React with TypeScript)
3. Progress to **Module 10-12** for full-stack concepts

## 🎓 Assessment and Projects

Each module contains:
- **Hands-on exercises** with starter code
- **Challenges** to extend functionality
- **Real-world examples** demonstrating best practices
- **Progressive complexity** building on previous concepts

## 🔧 Additional Resources

### Companion Applications
- `users-app/` - Additional React practice application
- `next-js-demo/` - Extended Next.js examples

### Documentation
- Each module contains detailed README files
- Code comments explaining key concepts
- Progressive examples showing evolution of patterns

## 🤝 Contributing

This is an educational repository. Students and instructors can:
- Submit bug fixes for existing code
- Propose additional exercises or examples
- Improve documentation and explanations
- Share alternative implementation approaches

## 📄 License

This educational content is provided for learning purposes. Please respect the educational nature of this repository.

## 📞 Support

For technical questions or clarification on concepts:
1. Review the module-specific README files
2. Check the code comments and examples
3. Refer to the official documentation for technologies used
4. Create issues for bugs or unclear instructions

---

**Happy Coding! 🚀**

*This bootcamp represents a comprehensive journey through modern web development. Take your time with each module, practice the concepts, and build upon the provided examples to create your own projects.*

