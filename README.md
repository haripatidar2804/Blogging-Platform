# Next Blog

![Next.js](https://img.shields.io/badge/Next.js-15.x-000000?style=flat&logo=next.js)![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=flat&logo=typescript)![Firebase](https://img.shields.io/badge/Firebase-v11.2-FFCA28?style=flat&logo=firebase)![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?style=flat&logo=tailwindcss)![Zod](https://img.shields.io/badge/Zod-3.x-2F4F94?style=flat&logo=zod)![Lucide](https://img.shields.io/badge/Lucide-React-2F4F94?style=flat&logo=lucide)![Recharts](https://img.shields.io/badge/Recharts-2.x-2F4F94?style=flat&logo=react)![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-2.x-2F4F94?style=flat&logo=react)

Next Blog is a modern blogging platform built with **Next.js 15**, **React 19**, **Firebase**, and **Tailwind CSS**. It features user authentication, role-based access control, a post management system, an admin panel with analytics, and comes in both dark and light modes.

🔗 **Live Demo**: [Next Blog](https://next-blog-virid-one.vercel.app/)

---

## Features

### **User Authentication & Roles**

- Users can create an account using **email, password, first name, and last name**.
- Login is available via **email/password** or **Google authentication**.
- Users have roles: **admin, editor, or standard user**.
- Banned users cannot create or edit posts.

### **Post Management**

- Posts include:
  - **CreatedAt** and **UpdatedAt** timestamps.
  - **Author ID** (used to fetch the author's name from the users collection).
  - **Pinned status** (only one post can be pinned at a time).
  - **Estimated read time** in minutes.
  - **Content stored as an HTML string**, rendered using **html-react-parser**.
- Users can **edit or delete their own posts**.
- Admins can **edit or delete any post**.

### **Rich Text Editor**

- Posts are created/edited using **Tiptap**, with custom styles in `globals.css`.
- Formatting options:
  - **Headings (H1 to H4)**
  - **Bold, Italic**
  - **Ordered & Unordered Lists**
  - **Code Blocks**
- A **"View" button** shows a real-time preview of the post.
- **Escape key (↓)** to exit the current block.

### **Dark & Light Mode**

- Users can toggle between **dark mode and light mode**.
- The preference is saved for future visits.

### **Password Recovery**

- Users can reset their password via **Firebase's forgot password functionality**.

### **Pagination & Sharable Links**

- Posts are **paginated**, with the current page stored in the URL.
- Users can share specific pages of posts easily.

---

## **Admin Panel**

### **Dashboard**

- Displays **total users and posts**, along with **new users this month**.
- **Charts** using **Recharts**:
  - **Users over time**
  - **Posts over time**

### **User Management**

- Admins can:
  - **Set who can post** (All users / Only Editors & Admins / Only Admins).
  - **See user details** (Name, Email, Role, Banned status).
  - **Change user roles**.
  - **Ban/unban users** (Banned users cannot create or edit posts).

### **Post Management**

- Admins can:
  - **View all posts** with titles and authors.
  - **Pin/unpin a post** (Only one post can be pinned).
  - **Delete any post**.
  - **View a post in its own page**.

### **Banned Users**

- Any banned user attempting to create or edit a post is **redirected to a banned page**.

---

## **Custom 404 Page**

- A **custom "Not Found" page** for invalid routes.

---

## **Session Management**

- **Firebase authentication tokens** are stored in **secure HTTP-only cookies**.
- On each request, the session is validated using Firebase api.
- Expired sessions force a **redirect to login** when accessing protected pages.

---

## **Tech Stack**

- **Next.js 15** for optimized rendering.
- **React 19** for dynamic UI.
- **Firebase** for authentication and Firestore database.
- **Tailwind CSS 4** for styling.
- **Tiptap** for the rich text editor.
- **Recharts** for analytics.
- **Zod** for form validation.
- **React Hot Toast** for notifications.

---

## Future Improvements

- Adding links & images in posts.
- User profile pages with their posts.
- Allow users to update their avatar, name, email, and password.
- Custom email verification & password reset pages (instead of Firebase's default).
- More analytics in the admin dashboard.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ziad-Elshrief/Next-Blog.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase authentication by creating a Firebase project and adding the Firebase configuration to your `.env` file:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_APP_MEASUREMENT_ID= your-merasurement-id
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000` to see the app in action!

## Scripts

- `dev`: Starts the development server with **Turbopack** for faster builds
- `build`: Builds the application for production
- `start`: Starts the production server
- `lint`: Lints the codebase with **ESLint**
