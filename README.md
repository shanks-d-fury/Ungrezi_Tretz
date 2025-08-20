# Ungrezi Tretz - Beauty Treatment Search & Enquiry Platform

> **Live Demo:** https://ungrezi-tretz.vercel.app/

A modern, full-stack web application for searching beauty treatments and managing customer enquiries. Built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS.

![Beauty Treatment Platform](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🔍 **Customer Features**

- **Smart Search**: Search beauty treatments by concerns with intelligent filtering
- **Package Discovery**: Browse treatment packages with detailed information
- **Enquiry System**: Submit enquiries for specific packages with contact details
- **Responsive Design**: Fully responsive interface across all devices
- **Loading States**: Smooth loading animations for better UX

### 🛠️ **Admin Features**

- **Secure Admin Panel**: Password-protected admin access
- **Enquiry Management**: View and manage all customer enquiries
- **Package Details**: Complete package information with treatment details
- **Status Tracking**: Track enquiry status (Pending, Responded, Closed)
- **Contact Information**: Easy access to customer contact details

## 🚀 Tech Stack

### **Frontend**

- **Next.js 15.5.0** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects
- **LDRS** - Loading animations library

### **Backend**

- **Next.js API Routes** - RESTful API endpoints
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling

### **Development**

- **Turbopack** - Ultra-fast bundler
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🗂️ Project Structure

```
ungrezi_tretz/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/route.ts           # Admin authentication
│   │   │   └── enquiries/route.ts      # Get all enquiries
│   │   ├── enquiries/route.ts          # Submit enquiries
│   │   ├── packages/[id]/route.ts      # Get package details
│   │   └── search/route.ts             # Search packages
│   ├── admin/
│   │   └── enquiry/page.tsx            # Admin dashboard
│   ├── enquiry/
│   │   └── [package_id]/page.tsx       # Enquiry form
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page
├── components/
│   ├── Card.tsx                        # Package card component
│   └── enquiryCard.tsx                 # Enquiry card component
├── models/
│   ├── Concern.ts                      # Concern schema
│   ├── Treatment.ts                    # Treatment schema
│   ├── Package.ts                      # Package schema
│   ├── Enquiry.ts                      # Enquiry schema
│   └── index.ts                        # Model exports
├── init/
│   ├── concerns.json                   # Seed data
│   ├── treatments.json                 # Seed data
│   ├── packages.json                   # Seed data
│   └── seed.ts                         # Database seeding script
├── lib/
│   └── mongodb.ts                      # Database connection
└── public/
    └── cosma-logo.svg                  # Application logo
```

## 📊 Database Schema

### **Collections**

#### 🏷️ **Concerns**

```typescript
{
	_id: ObjectId;
	name: string; // e.g., "Acne", "Hair Loss"
	description: string;
	createdAt: Date;
	updatedAt: Date;
}
```

#### 💊 **Treatments**

```typescript
{
	_id: ObjectId;
	name: string; // e.g., "Botox", "Laser Hair Removal"
	description: string;
	createdAt: Date;
	updatedAt: Date;
}
```

#### 📦 **Packages**

```typescript
{
  _id: ObjectId
  clinic_name: string
  package_name: string
  price: number
  treatment_id: ObjectId  // Reference to Treatment
  concern_ids: ObjectId[] // References to Concerns
  createdAt: Date
  updatedAt: Date
}
```

#### 📝 **Enquiries**

```typescript
{
	_id: ObjectId;
	package_id: ObjectId; // Reference to Package
	user_name: string;
	user_email: string;
	message: string;
	status: string; // "pending" | "responded" | "closed"
	createdAt: Date;
	updatedAt: Date;
}
```

## 🔗 API Endpoints

### **Public Endpoints**

| Method | Endpoint                        | Description                  |
| ------ | ------------------------------- | ---------------------------- |
| `GET`  | `/api/search?concern={concern}` | Search packages by concern   |
| `GET`  | `/api/packages/[id]`            | Get specific package details |
| `POST` | `/api/enquiries`                | Submit customer enquiry      |

### **Admin Endpoints**

| Method | Endpoint               | Description                            |
| ------ | ---------------------- | -------------------------------------- |
| `POST` | `/api/admin/auth`      | Admin authentication                   |
| `GET`  | `/api/admin/enquiries` | Get all enquiries with package details |

### **Request/Response Examples**

#### Search Packages

```javascript
// GET /api/search?concern=acne
{
  "success": true,
  "searchTerm": "acne",
  "count": 5,
  "packages": [
    {
      "id": "...",
      "clinic_name": "Skin Care Clinic",
      "package_name": "Acne Treatment Package",
      "price": 15000,
      "treatment": {
        "id": "...",
        "name": "Chemical Peel"
      }
    }
  ]
}
```

#### Submit Enquiry

```javascript
// POST /api/enquiries
{
  "package_id": "60d5ecb74b24f3f1d8e4e7a1",
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "message": "I'm interested in this treatment..."
}
```

## 🛠️ Installation & Setup

### **Prerequisites**

- Node.js 20+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### **1. Clone the Repository**

```bash
git clone https://github.com/shanks-d-fury/Ungrezi_Tretz.git
cd ungrezi_tretz
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Configuration**

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.d8hibql.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Admin Password
ADMIN_PASSWORD=your_secure_admin_password
```

### **4. Seed the Database**

```bash
npm run seed
```

### **5. Run the Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### **6. Build for Production**

```bash
npm run build
npm start
```

## 📱 Usage Guide

### **For Customers**

1. **Search Treatments**

   - Visit the homepage
   - Select a concern from the dropdown
   - Enter additional search terms
   - Click "Search" to find packages

2. **Submit Enquiry**
   - Click "Enquiry" on any package card
   - Fill in your name, email, and message
   - Submit the form to send your enquiry

### **For Administrators**

1. **Access Admin Panel**

   - Visit `/admin/enquiry`
   - Enter the admin password
   - View all customer enquiries

2. **Manage Enquiries**
   - View enquiry details and package information
   - Track enquiry status
   - Contact customers directly

## 🎨 Key Components

### **Card Component**

- Displays package information
- Handles enquiry button interactions
- Loading states for better UX

### **Admin Dashboard**

- Enquiry cards with full details
- Responsive grid layout

### **Search Interface**

- Dropdown for concern selection
- Text input for additional filters
- Real-time search results

## 🔐 Security Features

- **Environment Variables**: Sensitive data stored in `.env`
- **Admin Authentication**: Password-protected admin routes
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**

- Works with Netlify, Railway, or any Node.js hosting
- Ensure MongoDB connection and environment variables are configured

## 👨‍💻 Author

**Shashank**

- GitHub: [@shanks-d-fury](https://github.com/shanks-d-fury)

## 📞 Support

## For support, email shashanks9190@gmail.com or create an issue on GitHub.
