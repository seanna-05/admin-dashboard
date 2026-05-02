## Admin Dashboard – React Application
## Overview

This project is a **React-based Admin Dashboard** that displays and manages a list of users using a public API.
It includes features like **search, pagination, user detail view, and performance optimizations**, built with a scalable architecture.

## Project Setup Instructions
### 1. Clone the repository

```bash
git clone https://github.com/seanna-05/admin-dashboard.git
cd admin-dashboard
```
### 2. Install dependencies

```bash
npm install
```
### 3. Run the development server

```bash
npm run dev
```
### 4. Build for production

```bash
npm run build
```
## Architecture Decisions

The project follows a **modular and scalable structure**:


src/
├── api/            # API calls (separated from UI)
├── components/     # Reusable UI components
├── pages/          # Page-level components
├── hooks/          # Custom hooks (debounce)
├── App.jsx         # Main app logic
├── styles.css      # Styling

## Key Decisions:

* **Separation of concerns**: API logic is kept outside UI components
* **Reusable components**: UI elements are modular
* **Scalable structure**: Easy to extend for larger applications

## State Management Approach

This project uses **React Query (TanStack Query)** for state management.

### Why React Query?

* Handles **server state efficiently**
* Built-in **caching**
* Automatic **refetching**
* Simplifies **loading & error states**

### Local State:

* `useState` → UI state (page, search, modal)
* `useEffect` → debounced search

## Performance Considerations

The application includes several performance optimizations:

### Debounced Search

* Prevents excessive API calls
* Improves user experience

### API-Based Search

* Avoids filtering only current page
* Ensures accurate results across dataset

### Pagination

* Loads limited data (10 users per page)
* Avoids heavy data rendering

### React Query Optimization

* Caching of API responses
* `keepPreviousData` avoids UI flicker

### Conditional Rendering

* Pagination hidden during search
* Prevents unnecessary UI updates

## Assumptions & Trade-offs

### Assumptions:

* Public API (`dummyjson`) is always available
* Data structure remains consistent

### Trade-offs:

* Pagination is disabled during search for better UX
* Total pages depend on API response
* No authentication implemented (not required for task)

### Limitations:

* API search does not support pagination simultaneously
* No backend (pure frontend project)

---

## Features

*  User listing dashboard
*  Debounced search (API-based)
*  Pagination
*  User detail modal
*  Error handling
*  Loading states
*  Responsive UI

##  Future Improvements

* Add authentication (login system)
* Convert UI to table layout
* Add sorting & filtering
* Implement infinite scrolling
* Use Tailwind or Material UI

## Conclusion

This project demonstrates:

* Clean architecture
* Efficient API handling
* Performance optimization
* Real-world frontend practices

