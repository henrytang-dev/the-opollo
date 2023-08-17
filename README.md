# The Opollo Publishing Platform

View at [The Opollo](http://theopollo.com)

Welcome to The Opollo README! This document will guide you through some of the architecture and features of my RESTful application. The Opollo is a publishing platform that enables users to write and share their ideas, teachings, and experiences, complete with a rich set of features for both backend and frontend. This project is still early in development. As such, I am working on incorporating many more robust features such as a more advanced user interface and associated functionalities.

## Table of Contents

1. [Primary Technologies Used](#technologies-used)
2. [Server](#server)
    - [Authentication and Authorization](#authentication-and-authorization)
    - [Profile Images](#profile-images)
    - [JSON Storage for Blog Data](#json-storage-for-blog-data)
3. [Client-Side](#client-side)
    - [Custom Text Editor](#custom-text-editor)
    - [Advanced ReactJS Concepts](#advanced-reactjs-concepts)
    - [Form Validation](#form-validation)
    - [TailwindCSS Styling and Animations](#tailwindcss-styling-and-animations)
4. [Database Management](#database-management)
    - [PostgreSQL](#postgresql)
    - [Spring Boot Data JDBC](#spring-boot-data-jdbc)
    - [Native and Derived Queries](#native-and-derived-queries)
5. [Deployment](#deployment)
    - [AWS Services](#aws-services)
    - [Docker](#docker)

## Primary Technologies Used

- **AWS**: Used for deploying various components of the application, including RDS, ECS, EC2, and Route53.
- **Spring Boot**: Backend framework used for database mappings, CRUD operations, and handling business logic such as image compression and authorization.
- **ReactJS**: Frontend library for building a dynamic and robust user interface (i.e. loading cards with blog metadata for viewing and summaries)
- **Spring Security**: Provides authentication and authorization features for the backend.
- **PostgreSQL**: Relational database for storing application data such as blog and image data.
- **Docker**: Containerization tool for packaging the application and its dependencies.
- **JSON Web Tokens (JWT)**: Used for secure user authentication and authorization.
- **Notion-like Text Editor**: Custom text editor for users to create and edit blog posts.
- **CSS**: Styling and animations for an engaging user experience.

## Server

### Authentication and Authorization

The Opollo uses Spring Security and JWT for secure authentication and authorization. Users can sign up, log in, and access specific features such as writing and profile management based on their roles.

### Profile Images

Users can upload profile images, which are stored in a file system integrated with the backend. This enhances the user experience by personalizing their profiles.

### JSON Storage for Blog Data

Blog posts are stored in the backend as JSON data. This approach provides flexibility and scalability for storing various types of content. It also allows freedom in the typing I designed for blogs. Down to the letter font size, spacing, and margins, the structure is supported by science down to the minute details.

## Client-Side

### Custom Text Editor

The Opollo features a custom text editor similar to Notion, allowing users to create content using a freeform notation that is translated into JSON for storage. I included features such as a code sandbox and more freedom in font sizing. I also incorporated pasting functionalities and am still in the process of adding more features such as inline tools.

### Advanced ReactJS Concepts

The frontend of The Opollo is built using advanced ReactJS concepts such as Higher Order Components (HOCs) and lifecycle management to ensure efficient rendering and state management.


### Form Validation

Client-side form validation ensures that user inputs are accurate before submitting, providing a seamless experience and reducing errors.

### TailwindCSS Styling and Animations

The user interface is enhanced with CSS styling and animations, providing an attractive and modern design. I used TailwindCSS to speed up my workflow.

## Database Management

### PostgreSQL

The Opollo uses PostgreSQL. I designed the schema in DBeaver using SQL commands and concepts such as forein keys and relational mappings between my Spring entities (i.e. between users and blog posts)

### Spring Boot Data JDBC

I integrated Spring Boot Data JDBC to interact with the PostgreSQL database. Using the JPA framework I simplified database querying and manipulation, reduced boilerplate code, and was able to build more robust business logic such as handling blog content and metadata.

### Native and Derived Queries

For more complex data retrieval, I employed both native and derived queries with Spring Boot Data JDBC. Native queries allow us to write SQL queries directly, providing flexibility for advanced data manipulation across database tables and foreign key constraints. By combining these querying approaches, I was able to ensure efficient data retrieval tailored to my application's needs.

## Deployment

### AWS Services

The application is deployed on AWS using RDS for the PostgreSQL database, ECS for container orchestration, EC2 instances for hosting, and Route53 for domain routing.

### Docker

Docker is used to containerize the application components, making it easy to manage dependencies and ensure consistent deployment across environments. I worked with DockerFiles and Docker Compose for quicker deployment and efficient development.