# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

**Live Website URL:** [https://studiospsace-a8.netlify.app](https://studiospsace-a8.netlify.app)

StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners can list their creative spaces, and fellow creators can discover, filter, and reserve studio slots with transparent pricing and real-time booking management.

## 🚀 Key Features
1. **Secure Authentication:** User registration and login using JWT stored in HTTPOnly Cookies, plus real Google OAuth integration.
2. **Dynamic Studio Listings:** Hosts can add, edit, and delete their own studios with device image upload (via ImgBB) and URL support.
3. **Advanced Booking System:** Real-time booking with dynamic status (Pending, Confirmed, Cancelled) and a robust double-booking prevention mechanism.
4. **Interactive Filtering:** Browse studios by categories (Photo Studio, Sound Stage, Podcast Lounge, Music Suite, Art Workshop) with dynamic routing and filtering.
5. **Theme Customization & Modern UI:** Full Light/Dark mode toggle, responsive design, custom 404 page, animated glowing borders, and standard Toast notifications using Sonner.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Swiper.js, Sonner, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas.
- **Authentication:** JWT, HTTPOnly Cookies, Google OAuth (@react-oauth/google).
- **Hosting:** Client (Netlify), Server (Render).

## 💻 Local Setup Steps
1. **Clone the repositories:**
   ```bash
   git clone https://github.com/Alok-242-115-328/studiospsace-client.git
   git clone https://github.com/Alok-242-115-328/studiospsace-server.git