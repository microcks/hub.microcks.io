# Installation Guide for hub.microcks.io

This guide will walk you through the installation and setup of the **Microcks Hub** project. You'll learn how to set up the **frontend** and **backend** locally, as well as how to contribute to the project.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18.x or above) (Preferably, use [Volta](https://volta.sh/))
- **npm** (comes with Node.js)
- **Docker** (if you want to use Docker for setup)
- **Git** (for cloning the repository)

## Clone the Repository

1. Fork the repository from [Microcks Hub GitHub](https://github.com/microcks/hub.microcks.io).
2. Clone the repository to your local machine:
   
   ```bash
   git clone https://github.com/YOUR_USERNAME/hub.microcks.io.git
   cd hub.microcks.io
   ```

## Backend Setup

1. Navigate to the Backend Directory:
   
   ```bash
   cd server
   ```

2. Install Backend Dependencies:
   
   ```bash
   npm install
   ```

3. Start the Backend Server:
   
   ```bash
   npm run start
   ```

   The backend server will start on [http://localhost:4000](http://localhost:4000).

4. Verify the Backend:
   
   If everything is set up correctly, you should see the message:
   
   ```
   Express server listening on port 4000
   Connected to the in-memory SQLite database.
   ```

## React Setup

1. Navigate to the root Directory:

   ```bash
   cd ..
   ```

2. Install Frontend Dependencies:
   
   ```bash
   npm install
   ```

3. Navigate to the react Directory:

   ```bash
   cd react
   ```

4. Start the Frontend Development Server:
   
   ```bash
   npm run dev
   ```

   The frontend will be available at [http://localhost:4200](http://localhost:4200).

## Contributing
Check out our [CONTRIBUTING](https://github.com/microcks/hub.microcks.io/blob/master/CONTRIBUTING.md) guide for details. All the best! 🚀
