# 🚀 Crewmate Creator - CRUD Web Application

A React-based web application for creating and managing crewmates using Supabase as the backend database. This project demonstrates full CRUD (Create, Read, Update, Delete) operations with a modern, responsive UI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Goals](#goals)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Database Schema](#database-schema)
- [API Operations](#api-operations)
- [Project Structure](#project-structure)
- [Implementation Details](#implementation-details)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

Crewmate Creator is a web application that allows users to create and manage custom crewmates with different categories and attributes. Users can create crewmates from various categories (Pirate, Developer, Gamer) and customize their attributes like speed, color, strength, and personality.

**View an exemplar of the project here!** (Your deployed application)

## ✨ Features

### Required Features ✅
- **Create Crewmates**: Add new crewmates with customizable attributes
- **Category System**: Choose from Pirate 🏴‍☠️, Developer 💻, or Gamer 🎮 categories with specialized attributes
- **View Gallery**: Browse all created crewmates sorted by creation date
- **Detailed View**: View individual crewmate details with unique URLs
- **Edit Crewmates**: Update crewmate attributes and information with real-time preview
- **Delete Crewmates**: Remove crewmates from the database
- **Statistics**: View crew statistics and success predictions
- **Success Metrics**: Visual success prediction based on crewmate attributes

### Stretch Features ✅
- **Category-based Attribute Restrictions**: Different categories have specialized attribute options
- **Enhanced Statistics**: Success prediction metrics and visual indicators
- **Improved UI**: Better styling and user experience with icons and animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🎯 Goals

By the end of this project you will be able to...

- ✅ Setup and use supabase-js to manage a database
- ✅ Perform various API requests that will change your web app according to CRUD
- ✅ Create a full-stack web application with React frontend and Supabase backend
- ✅ Implement responsive design principles
- ✅ Handle real-time data updates and state management

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM, CSS3
- **Backend**: Supabase (PostgreSQL database)
- **Build Tool**: Vite
- **Styling**: Custom CSS with responsive design
- **Icons**: Emoji icons for enhanced UX

## 🚀 Setup Instructions

### Step 0: Explore the Starter Code

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd crewmate
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

📍 **Checkpoint 0**: At this point, your app should show the basic UI with navigation and placeholder content.

### Step 1: Sign Up for Supabase

1. Go to [Supabase](https://supabase.com)
2. Click the green "Start your project" button
3. Create an account using your GitHub credentials
4. Create a new project:
   - Set project name to `crewmate`
   - Create a database password
   - Click "Create new project"

📍 **Checkpoint 1**: You should see your Supabase project dashboard.

### Step 2: Set Up the Database

1. Click the "Database" icon in the left sidebar
2. Click the green "New table" button
3. Create a `crewmates` table:
   - **Name**: `crewmates`
   - **Uncheck**: "Enable Row Level Security"
   - **Check**: "Enable Realtime"
4. Add the following columns:
   - `id` (BIGSERIAL PRIMARY KEY) - Auto-generated
   - `name` (TEXT) - Crewmate name
   - `speed` (TEXT) - Speed attribute
   - `color` (TEXT) - Color attribute
   - `strength` (TEXT) - Strength attribute
   - `personality` (TEXT) - Personality attribute
   - `category` (TEXT) - Crewmate category
   - `created_at` (TIMESTAMPTZ) - Auto-generated timestamp
5. Click "Save"

📍 **Checkpoint 2**: Your database table should be created and visible in the Table Editor.

### Step 3: Connect to the Database

1. **Install Supabase client**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Get your Supabase credentials**:
   - Go to Project Settings → API
   - Copy your Project URL and anon public key

3. **Create environment file**:
   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Update supabaseClient.js**:
   The file should automatically use your environment variables.

📍 **Checkpoint 3**: Your app should connect to Supabase without errors.

### Step 4: Create Database Entry

The create functionality is already implemented in `CreateCrewmate.jsx`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  
  const { data, error } = await supabase
    .from('crewmates')
    .insert([{
      name: formData.name,
      speed: formData.speed,
      color: formData.color,
      strength: formData.strength,
      personality: formData.personality,
      category: selectedCategory,
      created_at: new Date().toISOString()
    }])

  if (error) throw error
  navigate('/gallery')
}
```

📍 **Checkpoint 4**: You should be able to create crewmates and see them in your Supabase table.

### Step 5: Read Database Entries

The read functionality is implemented in `CrewmateGallery.jsx`:

```javascript
const fetchCrewmates = async () => {
  const { data, error } = await supabase
    .from('crewmates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  setCrewmates(data || [])
}
```

📍 **Checkpoint 5**: Your gallery should display all created crewmates from the database.

### Step 6: Update Database Entries

The update functionality is implemented in `UpdateCrewmate.jsx`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  
  const { error } = await supabase
    .from('crewmates')
    .update({
      name: formData.name,
      speed: formData.speed,
      color: formData.color,
      strength: formData.strength,
      personality: formData.personality
    })
    .eq('id', id)

  if (error) throw error
  navigate(`/crewmate/${id}`)
}
```

📍 **Checkpoint 6**: You should be able to edit crewmates and see updates in the database.

### Step 7: Delete Database Entries

The delete functionality is implemented in both `UpdateCrewmate.jsx` and `CrewmateDetail.jsx`:

```javascript
const handleDelete = async () => {
  const { error } = await supabase
    .from('crewmates')
    .delete()
    .eq('id', id)

  if (error) throw error
  navigate('/gallery')
}
```

📍 **Checkpoint 7**: You should be able to delete crewmates and see them removed from the database.

## 📊 Database Schema

The `crewmates` table has the following structure:

| Column      | Type        | Description                  |
| ----------- | ----------- | ---------------------------- |
| id          | BIGSERIAL   | Primary key (auto-generated) |
| name        | TEXT        | Crewmate name (required)     |
| speed       | TEXT        | Speed attribute              |
| color       | TEXT        | Color attribute              |
| strength    | TEXT        | Strength attribute           |
| personality | TEXT        | Personality attribute        |
| category    | TEXT        | Crewmate category            |
| created_at  | TIMESTAMPTZ | Creation timestamp           |

## 🎨 Available Categories & Attributes

### Pirate Category 🏴‍☠️
- **Speed**: Slow, Normal, Fast, Super Fast
- **Color**: Red, Green, Blue, Purple, Yellow, Orange, Pink, Brown
- **Strength**: Weak, Average, Strong, Super Strong
- **Personality**: Friendly, Serious, Funny, Mysterious, Brave, Shy

### Developer Category 💻
- **Speed**: Slow, Normal, Fast, Super Fast
- **Color**: Red, Green, Blue, Purple, Yellow, Orange, Pink, Brown
- **Strength**: Junior, Mid-level, Senior, Lead
- **Personality**: Analytical, Creative, Team Player, Independent, Detail-oriented, Big Picture

### Gamer Category 🎮
- **Speed**: Slow, Normal, Fast, Super Fast
- **Color**: Red, Green, Blue, Purple, Yellow, Orange, Pink, Brown
- **Strength**: Casual, Regular, Hardcore, Pro
- **Personality**: Competitive, Cooperative, Strategic, Aggressive, Patient, Impulsive

## 🔧 API Operations

The app performs the following CRUD operations:

### CREATE
```javascript
await supabase
  .from('crewmates')
  .insert([{ name, speed, color, strength, personality, category }])
```

### READ
```javascript
await supabase
  .from('crewmates')
  .select('*')
  .order('created_at', { ascending: false })
```

### UPDATE
```javascript
await supabase
  .from('crewmates')
  .update({ name, speed, color, strength, personality })
  .eq('id', id)
```

### DELETE
```javascript
await supabase
  .from('crewmates')
  .delete()
  .eq('id', id)
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.jsx                 # Landing page
│   ├── Home.css
│   ├── CrewmateGallery.jsx      # Gallery view
│   ├── CrewmateGallery.css
│   ├── CreateCrewmate.jsx       # Create form
│   ├── CreateCrewmate.css
│   ├── CrewmateDetail.jsx       # Detail view
│   ├── CrewmateDetail.css
│   ├── UpdateCrewmate.jsx       # Update form
│   ├── UpdateCrewmate.css
│   ├── SetupCheck.jsx           # Supabase connection check
│   └── SetupCheck.css
├── App.jsx                      # Main app with routing
├── App.css                      # Global styles
├── supabaseClient.js           # Supabase configuration
└── main.jsx                    # App entry point
```

## 🎯 Implementation Details

### Key Features Implemented

1. **Category-based Attribute System**: Different categories have specialized attribute options
2. **Real-time Preview**: See changes as you edit crewmate attributes
3. **Success Metrics**: Visual success prediction based on crewmate attributes
4. **Responsive Design**: Works perfectly on all device sizes
5. **Error Handling**: Graceful error handling and user feedback
6. **Demo Mode**: Works even without Supabase configuration

### Styling Highlights

- **Modern UI**: Clean, professional design with gradients and shadows
- **Icon Integration**: Emoji icons for enhanced user experience
- **Hover Effects**: Smooth animations and transitions
- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: High contrast text and proper focus states

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify** and set environment variables

### Option 3: GitHub Pages

1. **Add deployment script** to package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🛠️ Troubleshooting

### Common Issues

1. **"Supabase credentials not found"**
   - Ensure you have a `.env` file with correct credentials
   - Restart your development server after adding the `.env` file

2. **"relation 'crewmates' does not exist"**
   - Run the SQL script in your Supabase SQL Editor
   - Make sure the table was created successfully

3. **"Connection failed"**
   - Check your internet connection
   - Verify your Supabase project URL and anon key
   - Ensure your Supabase project is active

### Development Issues

1. **Port already in use**:
   ```bash
   npx kill-port 5173
   ```

2. **Module not found errors**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**:
   ```bash
   npm run build --force
   ```

## 📞 Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify your Supabase configuration
3. Ensure all environment variables are set
4. Check the Supabase dashboard for any service issues

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)

## 🎉 Congratulations

You've successfully created a full-stack web application with:
- ✅ Complete CRUD operations
- ✅ Modern, responsive UI
- ✅ Database integration
- ✅ Category-based features
- ✅ Success metrics and statistics

**💡 Tip**: Remember to reference this project when you need to implement similar features in future projects!

---

**Made with ❤️ for CodePath WEB102**
