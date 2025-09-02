# WellSpring

WellSpring is a wellness and stress-management application built for hackathons and beyond. It enables users to track stress levels, log moods, monitor heart rate variability (HRV), counting steps and practice breathing exercises within an integrated dashboard. The platform includes a global leaderboard powered by Supabase, allowing participants to share progress in real time.

Features

Stress Tracking – Log daily stress levels and visualize trends.

HRV Monitoring – Simulated HRV readings to reflect physiological metrics.

Breathing Exercises – Guided sessions with completion tracking.

Mood Entries – Journal moods for improved mental awareness.

Global Leaderboard – Shared Supabase database for participant rankings.

Modern UI/UX – Built with React and Tailwind for responsive design.

Tech Stack

React – Frontend framework

Tailwind CSS – Styling and responsive design

Framer Motion – UI animations

Supabase – Database and leaderboard backend

Getting Started

1. Clone the Repository

git clone <https://github.com/EltonWahinya/HEALTH.git.git>
cd WellSpring

2. Install Dependencies

npm install

3. Configure Supabase

Create a .env.local file in the root directory and add your Supabase credentials:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

4. Run the Application

npm run dev

Access the application at <http://localhost:5173>.

Leaderboard Logic

Each completed activity (mood entry, HRV check, breathing exercise) earns Wellness Points.

Points are synced to a global Supabase leaderboard.

All hosted app users contribute to the same leaderboard.

Project Structure

WellSpring/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Main app views
│   ├── lib/           # Supabase client and helpers
│   ├── types/         # TypeScript models
│   └── data/          # Mock stress and HRV data
└── README.md

Contributors

Elton Wahinya- <https://github.com/EltonWahinya>

Joseph Njoroge- <https://joseph-njoroge.vercel.app/>

Contributing

Contributions are welcome. For significant changes, please open an issue to discuss the proposed modifications.

License

MIT License © 2025 WellSpring Project Team

Hackathon Note

This project was developed in under 48 hours for a hackathon. The code prioritizes functionality and rapid delivery.
