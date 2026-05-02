# Admin Dashboard (React)

## Project Overview

This project is a scalable React-based admin dashboard that displays and manages a list of users using a public API.

## Features

* User listing with clean UI
* Search functionality with debounce
* Pagination using API (limit & skip)
* User detail view (modal popup)
* Loading & error handling
* Responsive layout

## Tech Stack

* React (Vite)
* TanStack React Query
* JavaScript (ES6)
* CSS (inline styling)

## Installation & Setup

```bash
git clone https://github.com/your-username/admin-dashboard.git
cd admin-dashboard
npm install
npm run dev
```

## API Used

https://dummyjson.com/users

## Architecture Decisions

* Used React Query for efficient data fetching and caching
* Separated API logic into `/api` folder
* Component-based structure for scalability

## Performance Optimization

* Debounced search to reduce unnecessary operations
* Pagination to avoid loading large datasets
* Lazy loading (code splitting)

## Assumptions & Trade-offs

* Used inline CSS for simplicity instead of full design system
* Client-side search instead of API-based filtering

## Deployment

Deployed using Vercel (link will be added)

## Future Improvements

* Add sorting functionality
* Improve UI with Tailwind CSS
* Add authentication
