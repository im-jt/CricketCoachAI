<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Cricket Coach

This contains everything you need to run your AI Cricket Coach app locally. The application consists of a React frontend and a Python backend.

View your app in AI Studio: https://ai.studio/apps/drive/1pMBOWcMjy_XhKdXMkHaHSDPXSj58mKfC

## Prerequisites

- Node.js (for the frontend)
- Python 3.x (for the backend)
- A Gemini API key (or another supported model's API key)

## Setup

### 1. Frontend Setup

In the root directory, install the required Node.js packages:

```bash
npm install
```

### 2. Backend Setup

Navigate to the `backend` directory and install the Python dependencies. It's recommended to use a virtual environment.

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure API Keys

The backend uses `litellm` to connect to various large language models. You need to set the appropriate API key as an environment variable. For example, to use Gemini, set the following environment variable:

```bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

Replace `"YOUR_API_KEY"` with your actual API key. The backend server will need this variable to be set in its environment when it runs.

## Run Locally

You need to run both the frontend and backend servers simultaneously in two separate terminals.

### Terminal 1: Run the Backend

Make sure you are in the `backend` directory and your virtual environment is activated.

```bash
# Make sure your API key is set in this terminal
export GEMINI_API_KEY="YOUR_API_KEY"

# Run the Flask server
python main.py
```

The backend server will start on `http://localhost:5001`.

### Terminal 2: Run the Frontend

In a new terminal, navigate to the root directory of the project.

```bash
# Run the React development server
npm run dev
```

The frontend application will be available at `http://localhost:5173` (or another port if 5173 is busy). Open this URL in your browser to use the app.