# Architecture & Operation Flow: Dynamic Skills & Projects Section

This document outlines the workflow and technical implementation for a dynamic portfolio component using a full-stack Next.js environment backed by MongoDB. 

## 1. Tech Stack Overview
* **Framework:** Next.js (provides both React frontend and Node.js API backend).
* **Language:** TypeScript (ensures type safety across both frontend props and database schemas).
* **Styling:** Tailwind CSS (utility-first CSS framework), native HTML/CSS for semantic structure.
* **Database:** MongoDB (NoSQL database acting as the single source of truth for all project details).

---

## 2. Frontend UI Flow (Next.js, React, TypeScript, Tailwind CSS)

The frontend leverages React's state management and Tailwind's utility classes to handle the seamless transition between the grid and slider layouts without triggering a full page reload.

### A. Initial State (Default Grid Layout)
* **Type Definition:** A TypeScript interface is defined for the project data (e.g., `Project { _id: string, title: string, imageUrl: string, links: { live: string, github: string }, description: string, techStack: string[] }`).
* **View:** The React component mounts, displaying the initial grid layout. 
* **Data Fetching (MongoDB):** On load, the frontend calls the `/api/projects` endpoint. **The project details—specifically the title, image URLs, live/repo links, description, and tech stack—are fetched directly from the MongoDB database** and mapped into the UI cards.
* **UI Elements:** A "More Projects" button is rendered at the bottom of the section.

### B. The Transition Trigger
* **Action:** The user clicks the "More Projects" button.
* **State Update:** A React state hook updates the view mode (e.g., `isSliderView` becomes `true`).

### C. Secondary State (Slider Layout)
* **View:** Conditional rendering swaps the grid wrapper for a slider component. 
* **Styling:** The layout shifts to a horizontal scrolling container using Tailwind (e.g., `flex overflow-x-auto snap-x`). Elements like glassmorphism (`bg-white/10 backdrop-blur-md`) can be applied to the cards.
* **Mechanics:** The rest of the page DOM remains untouched. The data fetched from MongoDB remains in state, but its visual presentation changes.

---

## 3. Backend Workflow 1: Adding a New Project

This workflow utilizes Next.js API routes to process incoming form data and save the precise details into MongoDB.

### A. Routing & UI (Admin Panel)
* **Frontend Route:** The admin navigates to `/admin/add-project`.
* **View:** A React form captures the new project details: Preview Image, Title, Project Links, Description, and Tech Stack.

### B. Data Submission & Storage (MongoDB)
* **API Call:** An asynchronous `POST` request sends the data to `/api/projects/create`.
* **Processing & Storage:**
  1. Node.js parses the incoming form data.
  2. The image file is uploaded to a cloud provider, which returns a secure image URL.
  3. **Database Insertion:** The complete set of project details (the newly generated image URL, title, description, links, and tech stack) is explicitly **stored as a new document within the MongoDB database**. 
  4. The server returns a `201 Created` JSON response.

---

## 4. Backend Workflow 2: Complete CRUD Operations

MongoDB manages the lifecycle of all project data. The specific project details are constantly fetched, stored, and altered within this database via Next.js RESTful API routes.

### A. Create (Add)
* **Endpoint:** `POST /api/projects`
* **Function:** Validates the payload and uses `Model.create()` to **store all project details** (title, links, image, etc.) into MongoDB.

### B. Read (Fetch)
* **Endpoint:** `GET /api/projects`
* **Function:** Queries MongoDB using `Model.find()`. **All project attributes required for display (images, titles, links) are fetched from the database here** to be served to the frontend UI.

### C. Update (Edit / Alter)
* **Endpoint:** `PUT /api/projects/[id]`
* **Function:** * Receives the updated fields and the document `_id`.
  * **Database Alteration:** Uses `Model.findByIdAndUpdate()`. Any modifications made by the admin—whether fixing a typo in the **title**, updating the **links**, or replacing the **image**—are **directly altered and permanently updated within the MongoDB database**.

### D. Delete (Remove)
* **Endpoint:** `DELETE /api/projects/[id]`
* **Function:** * Receives the `_id` of the project to remove.
  * Node.js fetches the document from MongoDB to retrieve and delete the hosted image file from the storage provider.
  * The entire project document (including its title, links, and details) is permanently deleted from MongoDB.