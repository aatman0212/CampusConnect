# 🎓 CampusConnect - Campus Events & Group Matching Portal

A modern, responsive, full-featured web portal for university campuses that empowers students to discover campus events, reserve verified digital ticket passes, form squads for hackathons and sports leagues, and enables societies to pitch events with an administrative approval pipeline.

---

## 🌟 Comprehensive Feature Suite

### 1. 🎯 Discover & Explore Campus Events (`index.html`)
- **Instant Search & Filters**: Live search across event titles, organizers, descriptions, and venues.
- **Category Filter Pills**: Technology & AI, Cultural & Music, Sports & Athletics, Hands-on Workshops, and Gaming.
- **Live Spot Meter**: Dynamic visual progress bars showing spots remaining vs. total capacity.
- **Star Rating Badges**: Displays average student ratings on each event card.

### 2. 📅 Interactive Campus Calendar & Schedule (`calendar.html`)
- **Monthly & Weekly Visual Grid**: Visual calendar with colored event chips on scheduled dates.
- **Category Filters**: Filter calendar by Tech, Cultural, Sports, and Workshops.
- **1-Click Google Calendar Sync**: Automatically opens pre-filled Google Calendar event templates.
- **.ics iCal Export**: Download `.ics` files for native Apple Calendar, Outlook, and mobile calendar synchronization.

### 3. 📲 Gate Desk & Live QR Ticket Scanner (`checkin.html`)
- **Gate Check-in Desk**: Real-time ticket verification for campus security and event organizers.
- **Instant Attendee Verification**: Displays student name, roll number, photo avatar, event title, and venue upon scanning.
- **Duplicate Entry Alert**: Detects and flags passes that have already been checked in.
- **Live Attendance Meter**: Real-time progress bar showing the percentage of attendees checked in.

### 4. 🔔 Real-Time Notification Bell & Alert Center
- **Top Bar Notification Bell**: Live unread badge count accessible across every page.
- **Alert Dropdown Tray**: Displays booking confirmations, squad updates, pitch review outcomes, and campus announcements.
- **Mark Read**: One-click action to clear notifications.

### 5. 👥 Teammate Matchmaker & In-Squad Chatroom (`find_group.html`)
- **Smart Skill Matching**: Filter open squads by required skills (Python, React, UI/UX Figma, AI/ML, Cloud DevOps).
- **In-Squad Live Coordination Chat**: Dedicated chat room on each squad card for members to exchange meeting times, Discord handles, and project links.
- **Auto Squad Booking**: Automatically creates an official group reservation once squads reach maximum team capacity.

### 6. ⭐ Event Reviews, Star Ratings & Photo Gallery (`reviews.html`)
- **Verified Student Testimonials**: 1 to 5 star ratings and detailed feedback for past events.
- **Photo Recap Gallery**: Highlight reel of past hackathons, tournaments, and concerts.
- **Review Submission**: Modal allowing students to rate and review attended events.

### 7. 🏆 Gamified Student Profile & Official Certificates (`profile.html`)
- **Profile Portfolio**: Student avatar, bio, department, and technical skills tags.
- **Campus Achievement Badges**: Unlockable badges (*Hackathon Pioneer*, *Active Attendee*, *Squad Commander*, *Early Bird*).
- **Official Participation Certificates**: Printable university certificates featuring the University Emblem, Gold Verification Seal, student name, event title, Dean's digital signature, and verification hash.

### 8. 🎟️ Digital Passes & "My Events" Dashboard (`my_events.html`)
- **Verified Digital Passes**: Boarding-pass style ticket with unique ID (`TKT-XXXXXX`) and scannable visual QR Code.
- **Print Pass**: Clean print styling (`Ctrl + P`) optimized for physical check-in.
- **Pass Cancellation**: Students can cancel passes anytime to return spots to the public quota.
- **Pitch Status Tracker**: View real-time review states (*Pending Review*, *Approved*, *Rejected* with admin notes).

### 9. 💡 Pitch New Events (`new_event.html`)
- Submit event proposals with category, format (Solo vs Group with min/max squad sizes), dates, time, venue, and capacity.
- Real-time date and numeric validation.

### 10. 🛡️ Campus Admin Control Center (`approveeventadminpage.html` / `admin.html`)
- Overview metrics: Active Events, Pending Review Queue, Total Confirmed Bookings, Registered Students.
- Inspect proposals, approve to the live catalog with one click, or reject with a feedback note.
- View attendee rosters (Name, Student ID, Email, Pass Type) for every active event.
- Reset Sample Data safety button.

---

## 🚀 How to Run

### Method 1: Local Server (Already Running)
The local server is running on:
👉 **[http://localhost:8000](http://localhost:8000)**

To run manually at any time:
```bash
python -m http.server 8000
```

### Method 2: Direct in Browser
Open `index.html` in the root folder or `tech project/index.html` in any browser.

---

## 🎓 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Student** | `alex.rivera@campus.edu` | `password123` |
| **Admin** | `admin@campus.edu` | `admin123` |
