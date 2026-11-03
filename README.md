# TogetherWe --- Social Development & Community Events Platform

**TogetherWe** is a community-driven event management platform that
helps people discover local social-development activities, create
community-service events, join events, and manage their participation.

## Project Links

- **Live Website:** [TogetherWe](https://togetherwe-client-by-asif.vercel.app/)
- **Backend API:** [TogetherWe Server](https://togetherwe-server.onrender.com)
- **Client Repository:** [TogetherWe Client](https://github.com/asif213067/TogetherWe-Client)
- **Server Repository:** [TogetherWe Server](https://github.com/asif213067/TogetherWE-Server)

------------------------------------------------------------------------

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [Deployment](#deployment)
-   [API and Security](#api-and-security)
-   [Assignment Requirements
    Checklist](#assignment-requirements-checklist)
-   [Git Commit Requirements](#git-commit-requirements)
-   [Future Improvements](#future-improvements)
-   [Author](#author)

------------------------------------------------------------------------

## Overview

TogetherWe brings community members together through meaningful local
activities such as:

-   Winter clothes and blanket distribution
-   Community cleanup campaigns
-   Tree plantation initiatives
-   Donation and social welfare events

The platform provides public event discovery alongside authenticated
tools for creating events, joining activities, and managing personal
event records.

## Features

-   **Responsive community-focused UI:** Designed for mobile, tablet,
    and desktop screens.
-   **Authentication:** Email/password authentication with Better Auth
    and supported social sign-in.
-   **Protected member pages:** Create Event, Manage Events, and Joined
    Events require authentication.
-   **Public event discovery:** Browse upcoming events and open event
    details without signing in.
-   **Create events:** Authenticated users can publish events with a
    title, description, event type, image URL, location, and future
    event date.
-   **Join events:** Logged-in users can join events, with participation
    stored in MongoDB.
-   **Joined Events:** View events joined by the current user, ordered
    by event date.
-   **Manage Events:** View, edit, and delete events created by the
    current user.
-   **Ownership checks:** Users should only be able to update or delete
    their own events.
-   **Event date handling:** Upcoming-event listings exclude events
    whose dates have passed.
-   **Organizer information:** Event details display organizer
    information where available.
-   **Form validation:** Authentication, event creation, and event
    update forms validate user input.
-   **Toast notifications:** Show helpful success and error feedback
    without browser `alert()` dialogs.
-   **Light/dark theme:** Theme toggle supports light and dark
    appearance.
-   **Community gallery:** Static images showcase community-service
    activities.
-   **Newsletter UI:** A newsletter subscription section is included as
    a visual feature; subscription functionality is not required by the
    assignment.
-   **Loading and error states:** Provide feedback while data is loading
    or when a request fails.

## Technology Stack

### Frontend

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Lucide React
-   Sonner toast notifications

### Authentication and Authorization

-   Better Auth
-   MongoDB adapter
-   JWT-based API authentication and authorization

### Backend

-   Node.js
-   Express.js
-   MongoDB Atlas
-   `jose` for JWT/JWKS verification (where configured)

### Deployment

-   Vercel --- frontend
-   Render --- backend API
-   MongoDB Atlas --- database

------------------------------------------------------------------------

## Project Structure

The project is organized into separate client and server applications:

## Project Structure

```text
TogetherWe/
├── togetherwe-client/           # Next.js frontend
│   ├── app/                     # App Router pages and layouts
│   ├── components/              # Reusable UI and feature components
│   ├── lib/                     # API helpers and shared utilities
│   ├── types/                   # TypeScript types
│   └── public/                  # Static assets
│
├── togetherwe-server/            # Express.js backend
│   ├── index.js                 # Main Express server and API routes
│   ├── middleware/
│   │   └── verify-token.js      # JWT authentication and token verification
│   └── utils/
│       └── validate-event.js    # Event data validation utilities
```

> The structure above is a high-level overview. Update it if your actual
> folders or files differ.

## Getting Started

### Prerequisites

Install the following before running the project:

-   Node.js (LTS recommended)
-   npm
-   MongoDB Atlas account and database
-   Better Auth configuration
-   Vercel and Render accounts for deployment

### 1. Clone the repository

``` bash
git clone https://github.com/asif213067/TogetherWe-Client
cd TogetherWe
```

If the client and server are in separate repositories, clone each
repository separately and follow the setup steps in each folder.

### 2. Install frontend dependencies

``` bash
cd togetherwe-client
npm install
```

### 3. Install backend dependencies

Open another terminal:

``` bash
cd togetherwe-server
npm install
```

## Environment Variables

Do not commit `.env` files, API secrets, database credentials, or OAuth
secrets to GitHub. Add the required variables to your local environment
and to the environment settings of Vercel/Render.

### Frontend --- `togetherwe-client/.env.local`

Use the exact variable names required by your code and deployment
configuration. For example:

``` env
# Server-side frontend requests, if used in your code
SERVER_BASE_URL=http://localhost:5000

# Browser-side requests, if used in your code
NEXT_PUBLIC_SERVER_BASE_URL=http://localhost:5000

# Better Auth configuration (use the variable names configured in your app)
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# OAuth credentials, if Google or GitHub sign-in is enabled
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Backend --- `togetherwe-server/.env`

``` env
PORT=5000
MONGO_DB_URL=your_mongodb_atlas_connection_string

# Better Auth / JWT configuration — use the exact names required by your backend
BETTER_AUTH_URL=http://localhost:3000
```

**Important:** These are example names. Check your actual frontend and
backend code and use the exact environment variable names it reads. Do
not expose private credentials through `NEXT_PUBLIC_` variables. In
production, set the frontend API URL to your Render backend URL and
configure the correct production auth origins.

## Running the Application

Start the backend:

``` bash
cd togetherwe-server
npm run dev
```

If the backend does not define a `dev` script, use the script listed in
its `package.json` (for example, `npm start`).

Start the frontend in a separate terminal:

``` bash
cd togetherwe-client
npm run dev
```

Open:

-   Frontend: http://localhost:3000
-   Backend: http://localhost:5000 (if configured to use this port)

## Deployment

### Frontend --- Vercel

1.  Import the frontend repository into Vercel.
2.  Configure the frontend environment variables.
3.  Set the API base URL to the deployed Render backend.
4.  Configure Better Auth and OAuth callback URLs for the production
    domain.
5.  Deploy and test direct navigation/reloading on public and protected
    routes.

### Backend --- Render

1.  Create a new Render Web Service using the backend repository.
2.  Configure the build and start commands based on the backend
    `package.json`.
3.  Add MongoDB and authentication environment variables in Render.
4.  Configure CORS to allow the deployed Vercel frontend origin.
5.  Deploy and verify the API health/root endpoint and event routes.

### Database --- MongoDB Atlas

1.  Create or select the project and database.
2.  Configure database access credentials.
3.  Allow network access for the backend deployment.
4.  Store the MongoDB connection string securely in Render environment
    variables.

**Live links**

-   Frontend: https://togetherwe-client-by-asif.vercel.app/
-   Backend: https://togetherwe-server.onrender.com/

------------------------------------------------------------------------

## API and Security

The backend provides event-related API operations used by the frontend.
Update this section with the exact routes implemented in your server.

Typical operations include:

  -----------------------------------------------------------------------
  Operation               Purpose                 Access
  ----------------------- ----------------------- -----------------------
  Get upcoming events     Retrieve future events  Public
                          for public browsing     

  Get event details       Retrieve a single event Public

  Create event            Create an event         Authenticated
                          associated with the     
                          authenticated user      

  Join event              Add the authenticated   Authenticated
                          user to an event        

  Get joined events       Retrieve events joined  Authenticated
                          by the current user     

  Get/manage own events   Retrieve events created Authenticated
                          by the current user     

  Update event            Update an event owned   Authenticated +
                          by the current user     ownership check

  Delete event            Delete an event owned   Authenticated +
                          by the current user     ownership check
  -----------------------------------------------------------------------

### Security considerations

-   Validate JWTs on protected backend routes.
-   Never trust user identity or ownership information sent only by the
    client.
-   Derive the authenticated user from the verified token/session.
-   Check event ownership on update and delete operations.
-   Validate incoming request bodies and event dates on the server.
-   Keep credentials and secrets out of source control.
-   Configure CORS for approved frontend origins.
-   Return meaningful HTTP status codes and error responses.

------------------------------------------------------------------------

## Author

**Asif Hosen**\
Full-Stack Developer

-   Website: https://togetherwe-client-by-asif.vercel.app/
-   GitHub: https://github.com/asif213067

------------------------------------------------------------------------

Built with the goal of making local community service easier to
discover, organize, and join.
