/**
 * CampusConnect Central Data & Store Management (NextGen Flagship Edition)
 * Features:
 * - Persistent Store & State
 * - Interactive Campus Venues & Spatial Map
 * - AI Event Pitch Co-Pilot & Academic Clash Radar
 * - AI Team Synergy Engine & Automatic Squad Matchmaker
 * - Live Event Hub (Audience Q&A Upvotes, Project Showcase, Secret POAP Drops)
 * - Holographic 3D Digital Credentials & LinkedIn Integration
 * - CampusBot Natural Language AI Concierge
 */

const Store = (function() {
  const STORAGE_KEYS = {
    APPROVED_EVENTS: 'approvedEvents',
    PENDING_EVENTS: 'pendingEvents',
    USERS: 'cc_users',
    CURRENT_USER: 'cc_currentUser',
    BOOKINGS: 'cc_bookings',
    NOTIFICATIONS: 'cc_notifications',
    REVIEWS: 'cc_reviews',
    SQUAD_CHATS: 'cc_squad_chats',
    CHECKINS: 'cc_checkins',
    LIVE_QUESTIONS: 'cc_live_questions',
    PROJECT_SHOWCASE: 'cc_project_showcase',
    CLAIMED_DROPS: 'cc_claimed_drops'
  };

  const DEFAULT_USERS = [
    {
      id: 'usr-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@campus.edu',
      phone: '9876543210',
      roll: 'CS-2023-042',
      branch: 'Computer Science',
      course: 'B.Tech',
      stream: 'Engineering',
      college: 'School of Technology',
      role: 'student',
      bio: 'Junior CS student passionate about full-stack web development, LLMs, and open-source hackathons.',
      skills: ['Python', 'React', 'Node.js', 'PyTorch', 'UI/UX Design'],
      badges: ['Hackathon Pioneer', 'Active Attendee', 'Squad Commander', 'Early Bird', 'AI Champion 2026'],
      password: 'password123'
    },
    {
      id: 'usr-admin',
      name: 'Dean / Events Admin',
      email: 'admin@campus.edu',
      phone: '9123456780',
      roll: 'FAC-001',
      branch: 'Student Affairs',
      course: 'Faculty',
      stream: 'Administration',
      college: 'University Central',
      role: 'admin',
      bio: 'Head of Campus Student Activities & Cultural Affairs Board.',
      skills: ['Event Operations', 'Student Leadership'],
      badges: ['Campus Overseer'],
      password: 'admin123'
    }
  ];

  const CAMPUS_VENUES = [
    {
      id: 'venue-1',
      aliasId: 'cs_complex',
      name: 'Turing Innovation & AI Complex',
      code: 'TECH-B4',
      icon: '💻',
      floor: 2,
      zone: 'North Tech Quad',
      capacity: 140,
      currentOccupancy: 124,
      liveEvent: 'HackCampus 2026: 24h AI Hackathon',
      activeEvent: 'HackCampus 2026: 24h AI Hackathon',
      activeEventId: 'evt-1',
      amenities: ['1 Gbps Fiber WiFi', 'Dual 4K Monitors', 'Hardware Sandbox', 'Free Coffee Bar'],
      status: 'live',
      coords: { x: 28, y: 35 },
      description: 'Ultra-modern 24-hour computing and maker laboratory equipped for intensive hackathons, robotics, and cloud sprints.'
    },
    {
      id: 'venue-2',
      aliasId: 'auditorium',
      name: 'Grand University Amphitheatre',
      code: 'CULT-MAIN',
      icon: '🎭',
      floor: 1,
      zone: 'Central Arts Green',
      capacity: 350,
      currentOccupancy: 147,
      liveEvent: null,
      activeEvent: 'Aura 2026: Annual Cultural Night & Battle of Bands',
      activeEventId: 'evt-2',
      amenities: ['Dolby Atmos Audio', 'Robotic Stage Lights', 'Acoustic Shell', 'Green Rooms'],
      status: 'upcoming',
      coords: { x: 62, y: 40 },
      description: 'Open-air tiered amphitheatre designed for cultural fests, keynote lectures, and music concerts.'
    },
    {
      id: 'venue-3',
      aliasId: 'sports_arena',
      name: 'University Athletics Field & Arena',
      code: 'SPRT-FLD',
      icon: '⚽',
      floor: 1,
      zone: 'South Sports Complex',
      capacity: 500,
      currentOccupancy: 350,
      liveEvent: null,
      activeEvent: 'Inter-Department 7-a-Side Football Tournament',
      activeEventId: 'evt-4',
      amenities: ['FIFA Turf Grass', 'Floodlights', 'Medical Support Bay', 'Live Digital Scoreboard'],
      status: 'upcoming',
      coords: { x: 45, y: 78 },
      description: 'Official athletic grounds with multi-sport grass fields, locker rooms, and spectator bleachers.'
    },
    {
      id: 'venue-4',
      aliasId: 'design_lab',
      name: 'Design Studio & XR Media Lab',
      code: 'DSGN-2A',
      icon: '🎨',
      floor: 3,
      zone: 'Creative Block',
      capacity: 45,
      currentOccupancy: 14,
      liveEvent: null,
      activeEvent: 'Figma to Code: UI/UX Design Sprint',
      activeEventId: 'evt-5',
      amenities: ['Wacom Cintiq Displays', 'Apple Vision Pro / Quest 3', 'Color Calibrated Suites'],
      status: 'open',
      coords: { x: 75, y: 22 },
      description: 'Human-Computer Interaction creative studio dedicated to product design, prototyping, and frontend sprint sessions.'
    },
    {
      id: 'venue-5',
      aliasId: 'gaming_lounge',
      name: 'Esports Arena & Cyber Center',
      code: 'GAME-CTR',
      icon: '🎮',
      floor: 1,
      zone: 'Student Activity Center',
      capacity: 75,
      currentOccupancy: 64,
      liveEvent: null,
      activeEvent: 'Campus Esports Showdown: Valorant 5v5',
      activeEventId: 'evt-6',
      amenities: ['240Hz Gaming Rigs', 'Live Shoutcast Deck', 'Twitch Streaming Studio', 'Snack Bar'],
      status: 'open',
      coords: { x: 18, y: 70 },
      description: 'Competitive esports arena optimized for LAN tournaments, multiplayer showcases, and streaming events.'
    },
    {
      id: 'venue-6',
      aliasId: 'seminar_hall',
      name: 'Computing Complex Lab 4',
      code: 'CS-L4',
      icon: '🔬',
      floor: 2,
      zone: 'Academic Wing B',
      capacity: 60,
      currentOccupancy: 57,
      liveEvent: null,
      activeEvent: 'Machine Learning & LLM Fine-Tuning Bootcamp',
      activeEventId: 'evt-3',
      amenities: ['NVIDIA GPU Cluster', 'Smart Laser Projectors', 'Recording Studio'],
      status: 'live',
      coords: { x: 38, y: 20 },
      description: 'Specialized deep learning training laboratory with high-memory GPU workstations.'
    }
  ];

  const DEFAULT_EVENTS = [
    {
      id: 'evt-1',
      title: 'HackCampus 2026: 24h AI Hackathon',
      description: 'Join over 200 developers, designers, and innovators to build cutting-edge Generative AI and web applications in this 24-hour hackathon. Mentorship, food, and cash prizes included!',
      organizer: 'Tech & Coding Club',
      contact: 'hack@campus.edu',
      phone: '9876500001',
      eventType: 'Group',
      category: 'tech',
      minGroupSize: 2,
      maxGroupSize: 4,
      groupRange: '2-4',
      startDate: '2026-10-15',
      endDate: '2026-10-16',
      time: '10:00 AM',
      venue: 'Turing Innovation & AI Complex',
      venueId: 'cs_complex',
      capacity: 60,
      spots: 44,
      rating: 4.9,
      reviewCount: 28,
      status: 'approved',
      isLiveNow: true,
      liveStageEndTime: '2026-10-16T10:00:00Z',
      createdAt: '2026-09-20'
    },
    {
      id: 'evt-2',
      title: 'Aura 2026: Annual Cultural Night & Battle of Bands',
      description: 'The biggest night of the semester! Live indie bands, acoustic sets, dance crew battles, and art installations. Don\'t miss out on an electrifying celebration of student talent.',
      organizer: 'Campus Cultural Committee',
      contact: 'cultural@campus.edu',
      phone: '9876500002',
      eventType: 'Group',
      category: 'cultural',
      minGroupSize: 3,
      maxGroupSize: 8,
      groupRange: '3-8',
      startDate: '2026-10-22',
      endDate: '2026-10-22',
      time: '05:30 PM',
      venue: 'Grand University Amphitheatre',
      venueId: 'auditorium',
      capacity: 150,
      spots: 98,
      rating: 4.8,
      reviewCount: 42,
      status: 'approved',
      isLiveNow: false,
      createdAt: '2026-09-21'
    },
    {
      id: 'evt-3',
      title: 'Machine Learning & LLM Fine-Tuning Bootcamp',
      description: 'An intensive hands-on masterclass on transformer architectures, retrieval augmented generation (RAG), and deploying open-source models with PyTorch.',
      organizer: 'AI Research Group',
      contact: 'ai-lead@campus.edu',
      phone: '9876500003',
      eventType: 'Solo',
      category: 'workshop',
      minGroupSize: 1,
      maxGroupSize: 1,
      groupRange: '1-1',
      startDate: '2026-10-08',
      endDate: '2026-10-09',
      time: '02:00 PM',
      venue: 'Computing Complex Lab 4',
      venueId: 'seminar_hall',
      capacity: 45,
      spots: 14,
      rating: 5.0,
      reviewCount: 19,
      status: 'approved',
      isLiveNow: false,
      createdAt: '2026-09-22'
    },
    {
      id: 'evt-4',
      title: 'Inter-Department 7-a-Side Football Tournament',
      description: 'Lace up your cleats! 16 teams will compete for the coveted University Chancellor Trophy. High intensity, fast-paced matches with official referees and live commentary.',
      organizer: 'Sports Authority & Athletics Club',
      contact: 'sports@campus.edu',
      phone: '9876500004',
      eventType: 'Group',
      category: 'sports',
      minGroupSize: 7,
      maxGroupSize: 10,
      groupRange: '7-10',
      startDate: '2026-10-28',
      endDate: '2026-10-30',
      time: '09:00 AM',
      venue: 'University Athletics Field & Arena',
      venueId: 'sports_arena',
      capacity: 80,
      spots: 35,
      rating: 4.7,
      reviewCount: 31,
      status: 'approved',
      isLiveNow: false,
      createdAt: '2026-09-23'
    },
    {
      id: 'evt-5',
      title: 'Figma to Code: UI/UX Design Sprint',
      description: 'Learn modern design systems, interaction patterns, wireframing, and turning responsive prototypes into production CSS. Bring your laptops!',
      organizer: 'Design Guild',
      contact: 'design@campus.edu',
      phone: '9876500005',
      eventType: 'Solo',
      category: 'workshop',
      minGroupSize: 1,
      maxGroupSize: 1,
      groupRange: '1-1',
      startDate: '2026-10-12',
      endDate: '2026-10-12',
      time: '11:00 AM',
      venue: 'Design Studio & XR Media Lab',
      venueId: 'design_lab',
      capacity: 35,
      spots: 8,
      rating: 4.9,
      reviewCount: 15,
      status: 'approved',
      isLiveNow: false,
      createdAt: '2026-09-24'
    },
    {
      id: 'evt-6',
      title: 'Campus Esports Showdown: Valorant 5v5',
      description: 'Assemble your 5-stack and compete in a double-elimination tournament streamed live on campus Twitch. Custom prizes and hardware giveaways for finalists.',
      organizer: 'Esports & Gaming Society',
      contact: 'gaming@campus.edu',
      phone: '9876500006',
      eventType: 'Group',
      category: 'gaming',
      minGroupSize: 5,
      maxGroupSize: 6,
      groupRange: '5-6',
      startDate: '2026-11-04',
      endDate: '2026-11-05',
      time: '01:00 PM',
      venue: 'Esports Arena & Cyber Center',
      venueId: 'gaming_lounge',
      capacity: 60,
      spots: 25,
      rating: 4.8,
      reviewCount: 37,
      status: 'approved',
      isLiveNow: false,
      createdAt: '2026-09-25'
    }
  ];

  const DEFAULT_PENDING_EVENTS = [
    {
      id: 'evt-pending-1',
      title: 'Robotics Autonomous Rover Challenge',
      description: 'Build and navigate micro-rovers through simulated terrain with obstacle avoidance and line-following sensors. Seeking college approval for lab arena use.',
      organizer: 'Robotics & Automation Society',
      contact: 'robotics@campus.edu',
      phone: '9876500007',
      eventType: 'Group',
      category: 'tech',
      minGroupSize: 3,
      maxGroupSize: 5,
      groupRange: '3-5',
      startDate: '2026-11-12',
      endDate: '2026-11-13',
      time: '10:00 AM',
      venue: 'Robotics Mechanical Lab',
      capacity: 40,
      spots: 40,
      rating: 5.0,
      reviewCount: 0,
      status: 'pending',
      createdAt: '2026-09-28'
    }
  ];

  const DEFAULT_NOTIFICATIONS = [
    {
      id: 'notif-live',
      title: '🔴 LIVE NOW: HackCampus 2026',
      message: 'The 24h AI Hackathon is currently underway! Check out the Live Hub for Q&A, leaderboard, and badge drops.',
      time: 'Live Now',
      read: false,
      link: 'live_hub.html'
    },
    {
      id: 'notif-1',
      title: '🎟️ Pass Confirmed!',
      message: 'Your spot for "Machine Learning & LLM Fine-Tuning Bootcamp" is locked. Ticket ID: TKT-829104.',
      time: '10 mins ago',
      read: false,
      link: 'my_events.html'
    },
    {
      id: 'notif-2',
      title: '👥 Squad Invite / Update',
      message: 'Alex Rivera added a new update to squad "Neural Ninjas" for HackCampus 2026.',
      time: '2 hours ago',
      read: false,
      link: 'find_group.html'
    }
  ];

  const DEFAULT_REVIEWS = [
    {
      id: 'rev-1',
      eventTitle: 'HackCampus 2026: 24h AI Hackathon',
      reviewerName: 'Marcus Vance',
      reviewerBranch: 'Computer Science',
      rating: 5,
      comment: 'Incredible energy! The industry mentors were approachable and gave stellar feedback on our vector database architecture. Can\'t wait for the next edition.',
      date: '2026-09-25',
      photoUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rev-2',
      eventTitle: 'Aura 2026: Annual Cultural Night & Battle of Bands',
      reviewerName: 'Priya Sharma',
      reviewerBranch: 'Design & Media',
      rating: 5,
      comment: 'The lighting and acoustics at the amphitheatre blew everyone away! The battle of the bands lineup was straight fire. 10/10 campus night.',
      date: '2026-09-24',
      photoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'rev-3',
      eventTitle: 'Machine Learning & LLM Fine-Tuning Bootcamp',
      reviewerName: 'Devon Lee',
      reviewerBranch: 'Data Science',
      rating: 5,
      comment: 'Super practical. We went from PyTorch fundamentals to deploying a fine-tuned LoRA model in 3 hours flat. Handouts and notebooks were top tier.',
      date: '2026-09-22',
      photoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const DEFAULT_LIVE_QUESTIONS = [
    { id: 'q-1', author: 'Devon Lee', question: 'Will judges evaluate local model weights or API latency more heavily in the demo round?', upvotes: 24, answered: false },
    { id: 'q-2', author: 'Rohan Mehta', question: 'Where can we access the high-memory GPU cluster credentials for the workshop?', upvotes: 18, answered: true },
    { id: 'q-3', author: 'Sophia Chen', question: 'What is the exact deadline for GitHub commit freeze tonight?', upvotes: 31, answered: false }
  ];

  const DEFAULT_PROJECTS = [
    { id: 'proj-1', squadName: 'Neural Ninjas', title: 'CampusMind: On-Device Student Mental Health Assistant', tags: ['PyTorch', 'FastAPI', 'React'], votes: 47, repo: 'https://github.com/example/campusmind' },
    { id: 'proj-2', squadName: 'CloudCrafters', title: 'EcoTrack: Smart IoT Waste Sorter for Campus Dining', tags: ['Computer Vision', 'YOLOv8', 'Node.js'], votes: 38, repo: 'https://github.com/example/ecotrack' },
    { id: 'proj-3', squadName: 'Quantum Coders', title: 'DormMate: Matchmaking Algorithm for Campus Roommates', tags: ['Next.js', 'PostgreSQL', 'Tailwind'], votes: 29, repo: 'https://github.com/example/dormmate' }
  ];

  // Initialize Store
  function init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPROVED_EVENTS) || JSON.parse(localStorage.getItem(STORAGE_KEYS.APPROVED_EVENTS)).length === 0) {
      localStorage.setItem(STORAGE_KEYS.APPROVED_EVENTS, JSON.stringify(DEFAULT_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PENDING_EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.PENDING_EVENTS, JSON.stringify(DEFAULT_PENDING_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      const sampleBooking = {
        id: 'TKT-829104',
        eventId: 'evt-1',
        eventTitle: 'HackCampus 2026: 24h AI Hackathon',
        eventDate: '2026-10-15',
        eventTime: '10:00 AM',
        venue: 'Turing Innovation & AI Complex',
        eventType: 'Group',
        bookingType: 'Group',
        groupSize: 2,
        attendeeName: 'Alex Rivera',
        attendeeEmail: 'alex.rivera@campus.edu',
        attendeePhone: '9876543210',
        rollNumber: 'CS-2023-042',
        branch: 'Computer Science',
        course: 'B.Tech',
        collegeDetails: 'School of Technology',
        bookedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([sampleBooking]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LIVE_QUESTIONS)) {
      localStorage.setItem(STORAGE_KEYS.LIVE_QUESTIONS, JSON.stringify(DEFAULT_LIVE_QUESTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROJECT_SHOWCASE)) {
      localStorage.setItem(STORAGE_KEYS.PROJECT_SHOWCASE, JSON.stringify(DEFAULT_PROJECTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CLAIMED_DROPS)) {
      localStorage.setItem(STORAGE_KEYS.CLAIMED_DROPS, JSON.stringify(['CAMPUS-VIP']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHECKINS)) {
      localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify({}));
    }
  }

  // --- Auth APIs ---
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || null;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  function updateCurrentUserProfile(updatedFields) {
    const user = getCurrentUser();
    if (!user) return false;
    const merged = { ...user, ...updatedFields };
    setCurrentUser(merged);

    const users = getUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = merged;
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
    return merged;
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    } catch (e) {
      return [];
    }
  }

  function registerUser(userData) {
    const users = getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists!' };
    }
    const newUser = {
      id: 'usr-' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      roll: userData.roll || 'N/A',
      branch: userData.branch || 'General',
      course: userData.course || 'Degree',
      stream: userData.stream || 'Campus',
      college: userData.college || 'Campus University',
      role: userData.role || 'student',
      bio: 'Enthusiastic university student eager to participate in campus events.',
      skills: ['Teamwork', 'Communication', 'Python'],
      badges: ['Campus Newcomer', 'Early Bird'],
      password: userData.password
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, message: 'No account found with this email address.' };
    }
    if (user.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }
    setCurrentUser(user);
    return { success: true, user };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'login.html';
  }

  // --- Venue & Spatial Map APIs ---
  function getCampusVenues() {
    return CAMPUS_VENUES;
  }

  function getVenueById(id) {
    if (!id) return null;
    return CAMPUS_VENUES.find(v => v.id === id || v.aliasId === id || v.code === id) || null;
  }

  // --- Events APIs ---
  function getApprovedEvents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPROVED_EVENTS)) || [];
    } catch (e) {
      return [];
    }
  }

  function setApprovedEvents(events) {
    localStorage.setItem(STORAGE_KEYS.APPROVED_EVENTS, JSON.stringify(events));
  }

  function getPendingEvents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PENDING_EVENTS)) || [];
    } catch (e) {
      return [];
    }
  }

  function setPendingEvents(events) {
    localStorage.setItem(STORAGE_KEYS.PENDING_EVENTS, JSON.stringify(events));
  }

  function pitchEvent(eventData) {
    const pending = getPendingEvents();
    const newPitch = {
      id: 'evt-' + Date.now(),
      title: eventData.title,
      description: eventData.description,
      organizer: eventData.organizer,
      contact: eventData.contact,
      phone: eventData.phone,
      eventType: eventData.eventType || 'Solo',
      category: eventData.category || 'tech',
      minGroupSize: parseInt(eventData.minGroupSize) || (eventData.eventType === 'Group' ? 2 : 1),
      maxGroupSize: parseInt(eventData.maxGroupSize) || (eventData.eventType === 'Group' ? 5 : 1),
      groupRange: eventData.groupRange || (eventData.eventType === 'Group' ? `${eventData.minGroupSize || 2}-${eventData.maxGroupSize || 5}` : '1-1'),
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      time: eventData.time,
      venue: eventData.venue || 'Campus Venue TBD',
      venueId: eventData.venueId || 'cs_complex',
      capacity: parseInt(eventData.capacity) || 30,
      spots: parseInt(eventData.capacity) || 30,
      rating: 5.0,
      reviewCount: 0,
      status: 'pending',
      creatorEmail: getCurrentUser() ? getCurrentUser().email : eventData.contact,
      createdAt: new Date().toISOString()
    };
    pending.push(newPitch);
    setPendingEvents(pending);

    addNotification({
      title: '💡 Pitch Submitted!',
      message: `"${newPitch.title}" is now awaiting Dean / Admin review.`,
      link: 'my_events.html'
    });

    return newPitch;
  }

  function approveEvent(index) {
    const pending = getPendingEvents();
    if (index < 0 || index >= pending.length) return false;
    const approved = getApprovedEvents();
    const event = pending.splice(index, 1)[0];
    event.status = 'approved';
    event.spots = event.capacity;
    approved.push(event);
    setApprovedEvents(approved);
    setPendingEvents(pending);

    addNotification({
      title: '✅ Event Approved!',
      message: `"${event.title}" has been approved and published to the live campus calendar!`,
      link: 'index.html'
    });

    return true;
  }

  function rejectEvent(index, reason = 'Not aligned with schedule.') {
    const pending = getPendingEvents();
    if (index < 0 || index >= pending.length) return false;
    const rejected = pending.splice(index, 1)[0];
    rejected.status = 'rejected';
    rejected.rejectionReason = reason;

    let rejectedList = JSON.parse(localStorage.getItem('cc_rejectedEvents')) || [];
    rejectedList.push(rejected);
    localStorage.setItem('cc_rejectedEvents', JSON.stringify(rejectedList));
    setPendingEvents(pending);

    addNotification({
      title: '⚠️ Pitch Update',
      message: `"${rejected.title}" review feedback: ${reason}`,
      link: 'my_events.html'
    });

    return true;
  }

  function deleteApprovedEvent(index) {
    const approved = getApprovedEvents();
    if (index < 0 || index >= approved.length) return false;
    approved.splice(index, 1);
    setApprovedEvents(approved);
    return true;
  }

  // --- Bookings APIs ---
  function getBookings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    } catch (e) {
      return [];
    }
  }

  function bookEvent(eventIndex, details) {
    const events = getApprovedEvents();
    if (!events[eventIndex]) {
      return { success: false, message: 'Event not found!' };
    }
    const event = events[eventIndex];
    const groupCount = parseInt(details.groupSize) || 1;

    if (event.spots < groupCount) {
      return { success: false, message: `Only ${event.spots} spots remaining!` };
    }

    event.spots -= groupCount;
    events[eventIndex] = event;
    setApprovedEvents(events);

    const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: ticketId,
      eventId: event.id || ('evt-' + eventIndex),
      eventIndex: eventIndex,
      eventTitle: event.title,
      eventCategory: event.category || 'tech',
      eventDate: event.startDate,
      eventEndDate: event.endDate,
      eventTime: event.time,
      venue: event.venue || 'Campus Main Ground',
      eventType: event.eventType,
      bookingType: details.bookingType || event.eventType,
      groupSize: groupCount,
      attendeeName: details.name,
      attendeeEmail: details.email,
      attendeePhone: details.phone,
      rollNumber: details.rollNumber || details.roll || 'N/A',
      branch: details.branch || '',
      course: details.course || '',
      collegeDetails: details.collegeDetails || '',
      bookedAt: new Date().toISOString()
    };

    const bookings = getBookings();
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    addNotification({
      title: '🎟️ Spot Reserved!',
      message: `Your pass for "${event.title}" is confirmed. Pass ID: ${ticketId}.`,
      link: 'my_events.html'
    });

    return { success: true, booking: newBooking, ticketId };
  }

  function cancelBooking(bookingId) {
    const bookings = getBookings();
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx === -1) return { success: false, message: 'Booking not found.' };

    const booking = bookings[idx];
    const events = getApprovedEvents();
    const event = events.find(e => e.title === booking.eventTitle);
    if (event) {
      event.spots = Math.min(event.capacity, event.spots + (booking.groupSize || 1));
      setApprovedEvents(events);
    }

    bookings.splice(idx, 1);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    addNotification({
      title: 'Pass Canceled',
      message: `Your booking for "${booking.eventTitle}" was canceled and spot released.`,
      link: 'my_events.html'
    });

    return { success: true, message: 'Booking successfully canceled.' };
  }

  function getUserBookings(email) {
    const bookings = getBookings();
    if (!email) return bookings;
    return bookings.filter(b => b.attendeeEmail.toLowerCase() === email.toLowerCase());
  }

  // --- AI Synergy & Team Matchmaking Engine ---
  function calculateSynergyScore(userSkills = [], lookingForText = '', currentSquadRoles = []) {
    const userSkillsArr = Array.isArray(userSkills) ? userSkills : [];
    const normalizedUser = userSkillsArr.map(s => String(s).toLowerCase().trim());
    const lookingLower = (lookingForText || '').toLowerCase();

    let score = 55; // Base score
    const matchedSkills = [];

    const keyCategories = {
      frontend: ['react', 'vue', 'html', 'css', 'ui', 'ux', 'figma', 'frontend', 'tailwind'],
      backend: ['node', 'python', 'django', 'fastapi', 'sql', 'database', 'backend', 'api'],
      ai: ['pytorch', 'tensorflow', 'machine learning', 'llm', 'ml', 'nlp', 'data'],
      design: ['figma', 'ui', 'ux', 'design', 'adobe', 'wireframe', 'prototyping'],
      pitch: ['presentation', 'pitch', 'leadership', 'design', 'management']
    };

    normalizedUser.forEach(skill => {
      if (lookingLower.includes(skill)) {
        score += 15;
        matchedSkills.push(skill);
      }
    });

    // Bonus for complementary coverage
    let userPillars = 0;
    Object.values(keyCategories).forEach(cat => {
      if (cat.some(k => normalizedUser.includes(k))) userPillars++;
    });

    score += userPillars * 5;
    score = Math.min(98, Math.max(50, score));

    const breakdown = {
      frontend: normalizedUser.some(s => keyCategories.frontend.includes(s)) ? 90 : 35,
      backend: normalizedUser.some(s => keyCategories.backend.includes(s)) ? 85 : 30,
      ai: normalizedUser.some(s => keyCategories.ai.includes(s)) ? 95 : 25,
      design: normalizedUser.some(s => keyCategories.design.includes(s)) ? 88 : 40,
      pitch: 75
    };

    const badge = score >= 90 ? '🌟 Elite Complement' : (score >= 75 ? '⚡ High Synergy' : '🤝 Solid Teammate');

    return {
      score,
      badge,
      matchedSkills,
      breakdown,
      radarCoverage: breakdown
    };
  }

  // --- AI Pitch Co-Pilot & Academic Clash Radar ---
  function checkAcademicClashes(startDateStr, endDateStr) {
    const examWindows = [
      { name: 'Midterm Examination Week', start: '2026-10-14', end: '2026-10-22' },
      { name: 'Semester End Finals', start: '2026-11-20', end: '2026-12-05' }
    ];

    const clashes = [];
    for (const win of examWindows) {
      if (
        (startDateStr >= win.start && startDateStr <= win.end) ||
        (endDateStr >= win.start && endDateStr <= win.end) ||
        (startDateStr <= win.start && endDateStr >= win.end)
      ) {
        clashes.push({
          title: win.name,
          windowName: win.name,
          start: win.start,
          end: win.end,
          level: 'High Risk',
          warning: `⚠️ Warning: Dates overlap with ${win.name} (${win.start} to ${win.end}). Expected attendance may drop by ~60%. Recommended to reschedule.`
        });
      }
    }

    clashes.clash = clashes.length > 0;
    clashes.level = clashes.length > 0 ? 'High Risk' : 'Safe';
    clashes.warning = clashes.length > 0 ? clashes[0].warning : '✅ Academic Window Clear! No university exam or registration clashes detected.';
    return clashes;
  }

  function generateAIPitchIdea(keyword, category) {
    const templates = {
      tech: {
        title: `${keyword ? keyword + ' ' : ''}NextGen HackSprint 2026`,
        description: `A fast-paced university hackathon uniting students to architect innovative AI and cloud-native solutions. Includes hands-on mentoring sessions, midnight pizza drops, and prize tracks for beginner and advanced coders.`,
        suggestedCapacity: 80,
        time: '10:00 AM',
        venue: 'Turing Innovation & AI Complex',
        agenda: 'Hour 0-2: Team Formation & Keynote | Hour 2-18: Code Marathon | Hour 18-24: Pitching to Industry Judges'
      },
      cultural: {
        title: `${keyword ? keyword + ' ' : ''}Campus Rhythm & Arts Fest`,
        description: `An unforgettable campus evening celebrating indie musical acts, acoustic jams, digital art showcases, and student performance crews under the stars.`,
        suggestedCapacity: 200,
        time: '05:30 PM',
        venue: 'Grand University Amphitheatre',
        agenda: '05:30 PM: Stage Opener | 07:00 PM: Battle of Bands | 09:30 PM: DJ & Finale'
      },
      sports: {
        title: `${keyword ? keyword + ' ' : ''}Inter-Department Championship Cup`,
        description: `High-stakes knockout tournament featuring university departments competing for campus supremacy. Certified referees, hydration stations, and official streaming commentary.`,
        suggestedCapacity: 120,
        time: '09:00 AM',
        venue: 'University Athletics Field & Arena',
        agenda: '09:00 AM: Group Stage Knockouts | 02:00 PM: Semi-Finals | 04:30 PM: Trophy Match'
      },
      workshop: {
        title: `${keyword ? keyword + ' ' : ''}Production Engineering Masterclass`,
        description: `A hands-on, zero-to-one practical masterclass covering architecture best practices, real-world deployment pipelines, and live code reviews with senior engineering mentors.`,
        suggestedCapacity: 50,
        time: '02:00 PM',
        venue: 'Computing Complex Lab 4',
        agenda: 'Part 1: Core Fundamentals | Part 2: Hands-on Lab | Part 3: Architecture Q&A'
      },
      gaming: {
        title: `${keyword ? keyword + ' ' : ''}Campus Esports Championship`,
        description: `Double-elimination tournament streamed live on campus channels with custom graphics, caster deck, and hardware gear giveaways for finalists.`,
        suggestedCapacity: 64,
        time: '01:00 PM',
        venue: 'Esports Arena & Cyber Center',
        agenda: '01:00 PM: Bracket Check-in | 02:30 PM: Quarter-Finals | 06:00 PM: Grand Finals'
      }
    };

    return templates[category] || templates.tech;
  }

  // --- Live Hub Second Screen APIs ---
  function getLiveQuestions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIVE_QUESTIONS)) || [];
    } catch (e) {
      return [];
    }
  }

  function submitLiveQuestion(author, text) {
    const list = getLiveQuestions();
    const newQ = {
      id: 'q-' + Date.now(),
      author: author || 'Attendee',
      question: text,
      upvotes: 1,
      answered: false
    };
    list.unshift(newQ);
    localStorage.setItem(STORAGE_KEYS.LIVE_QUESTIONS, JSON.stringify(list));
    return list;
  }

  function upvoteLiveQuestion(id) {
    const list = getLiveQuestions();
    const q = list.find(item => item.id === id);
    if (q) {
      q.upvotes++;
      localStorage.setItem(STORAGE_KEYS.LIVE_QUESTIONS, JSON.stringify(list));
    }
    return list;
  }

  function getProjectShowcase() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECT_SHOWCASE)) || [];
    } catch (e) {
      return [];
    }
  }

  function submitProject(data) {
    const list = getProjectShowcase();
    const newProj = {
      id: 'proj-' + Date.now(),
      squadName: data.squadName,
      title: data.title,
      tags: data.tags || ['Web', 'AI'],
      votes: 1,
      repo: data.repo || 'https://github.com'
    };
    list.unshift(newProj);
    localStorage.setItem(STORAGE_KEYS.PROJECT_SHOWCASE, JSON.stringify(list));
    return list;
  }

  function voteProject(id) {
    const list = getProjectShowcase();
    const proj = list.find(p => p.id === id);
    if (proj) {
      proj.votes++;
      localStorage.setItem(STORAGE_KEYS.PROJECT_SHOWCASE, JSON.stringify(list));
    }
    return list;
  }

  function getClaimedDrops() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLAIMED_DROPS)) || [];
    } catch (e) {
      return [];
    }
  }

  function claimSecretDrop(code) {
    const validCodes = {
      'HACK-AI-2026': { title: '🤖 AI Synthesizer 2026', rarity: 'Legendary', event: 'HackCampus 2026' },
      'CULTURE-AURA': { title: '🎸 Indie Stage Rocker', rarity: 'Epic', event: 'Aura 2026' },
      'CAMPUS-VIP': { title: '🌟 Campus Founding VIP', rarity: 'Rare', event: 'All-Access' },
      'SPORTS-CHAMP': { title: '⚽ Golden Boot Striker', rarity: 'Epic', event: 'Football Cup' }
    };

    const clean = code.trim().toUpperCase();
    if (!validCodes[clean]) {
      return { success: false, message: 'Invalid or expired secret drop code.' };
    }

    const claimed = getClaimedDrops();
    if (claimed.includes(clean)) {
      return { success: false, message: 'You have already unlocked this mystery POAP badge!' };
    }

    claimed.push(clean);
    localStorage.setItem(STORAGE_KEYS.CLAIMED_DROPS, JSON.stringify(claimed));

    // Update current user badges
    const user = getCurrentUser();
    if (user) {
      if (!user.badges) user.badges = [];
      user.badges.push(validCodes[clean].title);
      updateCurrentUserProfile({ badges: user.badges });
    }

    addNotification({
      title: '🎁 Mystery Badge Unlocked!',
      message: `You claimed the "${validCodes[clean].title}" (${validCodes[clean].rarity}) badge!`,
      link: 'profile.html'
    });

    return { success: true, badge: validCodes[clean] };
  }

  // --- Notifications APIs ---
  function getNotifications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || [];
    } catch (e) {
      return [];
    }
  }

  function addNotification({ title, message, link }) {
    const list = getNotifications();
    list.unshift({
      id: 'notif-' + Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      link: link || '#'
    });
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
  }

  function markAllNotificationsRead() {
    const list = getNotifications();
    list.forEach(n => n.read = true);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
  }

  function getUnreadNotificationCount() {
    return getNotifications().filter(n => !n.read).length;
  }

  // --- Reviews & Gallery APIs ---
  function getReviews() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || [];
    } catch (e) {
      return [];
    }
  }

  function addReview(reviewData) {
    const list = getReviews();
    const newRev = {
      id: 'rev-' + Date.now(),
      eventTitle: reviewData.eventTitle,
      reviewerName: reviewData.reviewerName || 'Student',
      reviewerBranch: reviewData.reviewerBranch || 'General',
      rating: parseInt(reviewData.rating) || 5,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
      photoUrl: reviewData.photoUrl || ''
    };
    list.unshift(newRev);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(list));

    const events = getApprovedEvents();
    const evt = events.find(e => e.title === reviewData.eventTitle);
    if (evt) {
      const eventReviews = list.filter(r => r.eventTitle === evt.title);
      const avg = (eventReviews.reduce((sum, r) => sum + r.rating, 0) / eventReviews.length).toFixed(1);
      evt.rating = parseFloat(avg);
      evt.reviewCount = eventReviews.length;
      setApprovedEvents(events);
    }

    addNotification({
      title: '⭐ Review Published',
      message: `Thank you for rating "${newRev.eventTitle}"!`,
      link: 'reviews.html'
    });

    return newRev;
  }

  // --- Squad Chat APIs ---
  function getSquadChats() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SQUAD_CHATS)) || {};
    } catch (e) {
      return {};
    }
  }

  function getSquadMessages(squadName) {
    const chats = getSquadChats();
    return chats[squadName] || [];
  }

  function postSquadMessage(squadName, sender, role, message) {
    const chats = getSquadChats();
    if (!chats[squadName]) chats[squadName] = [];
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chats[squadName].push({
      sender,
      role: role || 'Member',
      message,
      time: timeStr
    });
    localStorage.setItem(STORAGE_KEYS.SQUAD_CHATS, JSON.stringify(chats));
    return chats[squadName];
  }

  // --- Check-ins & Gate Desk APIs ---
  function getCheckIns() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKINS)) || {};
    } catch (e) {
      return {};
    }
  }

  function checkInTicket(ticketId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id.toUpperCase() === ticketId.trim().toUpperCase());
    if (!booking) {
      return { success: false, message: 'Invalid Ticket ID! Pass not found in system.' };
    }

    const checkins = getCheckIns();
    if (checkins[booking.id]) {
      return {
        success: false,
        alreadyCheckedIn: true,
        checkedInAt: checkins[booking.id].time,
        booking,
        message: `Already checked in at ${checkins[booking.id].time}!`
      };
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    checkins[booking.id] = {
      time: timeStr,
      date: new Date().toISOString().split('T')[0],
      verifiedBy: getCurrentUser() ? getCurrentUser().name : 'Gate Staff'
    };
    localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify(checkins));

    return {
      success: true,
      booking,
      time: timeStr,
      message: 'Check-in verified successfully!'
    };
  }

  // --- CampusBot Natural Language Assistant ---
  function queryCampusBot(question) {
    const q = question.toLowerCase();
    const events = getApprovedEvents();
    const user = getCurrentUser();

    if (q.includes('live') || q.includes('now') || q.includes('ongoing')) {
      const liveEvts = events.filter(e => e.isLiveNow);
      if (liveEvts.length > 0) {
        return {
          answer: `🔥 **${liveEvts[0].title}** is currently LIVE at **${liveEvts[0].venue}**! Join the live Q&A, leaderboard, and badge drop in the Live Hub.`,
          actionLink: 'live_hub.html',
          actionText: 'Enter Live Hub →'
        };
      }
      return { answer: 'No events are running live at this exact moment. Next up is HackCampus 2026!', actionLink: 'index.html', actionText: 'View Upcoming' };
    }

    if (q.includes('hackathon') || q.includes('coding') || q.includes('tech')) {
      return {
        answer: '💻 We have **HackCampus 2026: 24h AI Hackathon** happening at Turing Innovation Complex! Cash prizes and food covered.',
        actionLink: 'book.html?event=0',
        actionText: 'Reserve Hackathon Spot'
      };
    }

    if (q.includes('map') || q.includes('venue') || q.includes('where')) {
      return {
        answer: '🗺️ You can explore the interactive 3D campus map with real-time room occupancy and directions.',
        actionLink: 'map.html',
        actionText: 'Open Campus Map'
      };
    }

    if (q.includes('squad') || q.includes('team') || q.includes('teammate') || q.includes('partner')) {
      return {
        answer: '👥 Check out our **AI Synergy Matchmaker**! Squads like "Neural Ninjas" are currently looking for UI/UX and React teammates.',
        actionLink: 'find_group.html',
        actionText: 'Find Squads with AI Match'
      };
    }

    if (q.includes('ticket') || q.includes('pass') || q.includes('my event')) {
      const count = getUserBookings(user ? user.email : '').length;
      return {
        answer: `🎟️ You currently have **${count} active event passes** with scannable QR codes ready for gate entry.`,
        actionLink: 'my_events.html',
        actionText: 'View My Passes & QR'
      };
    }

    if (q.includes('certificate') || q.includes('badge')) {
      return {
        answer: '🏆 You can view your verifiable digital credentials, holographic 3D badge, and export to LinkedIn on your profile page!',
        actionLink: 'profile.html',
        actionText: 'View Certificates'
      };
    }

    return {
      answer: `🎓 CampusConnect Assistant here! I can guide you to upcoming hackathons, campus venue maps, teammate matchmaking, or your digital passes. What would you like to explore?`,
      actionLink: 'index.html',
      actionText: 'Explore Catalog'
    };
  }

  function renderCampusBotFloating() {
    return `
      <div id="campusBotWidget" class="campus-bot-container">
        <button id="campusBotToggleBtn" class="campus-bot-orb" onclick="Store.toggleCampusBot()" title="Chat with CampusBot AI">
          <span style="font-size: 1.5rem;">🤖</span>
          <span class="pulse-ring"></span>
        </button>
        <div id="campusBotWindow" class="campus-bot-window">
          <div class="campus-bot-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.4rem;">🤖</span>
              <div>
                <div style="font-weight: 700; font-size: 0.92rem;">CampusBot AI</div>
                <div style="font-size: 0.72rem; color: #93c5fd;">Smart Campus Assistant</div>
              </div>
            </div>
            <button onclick="Store.toggleCampusBot()" style="color: #ffffff; font-size: 1.2rem; cursor: pointer;">&times;</button>
          </div>
          <div class="campus-bot-messages" id="campusBotMessages">
            <div class="bot-msg-bubble">
              👋 Hey ${getCurrentUser() ? getCurrentUser().name.split(' ')[0] : 'there'}! I'm CampusBot. Ask me about live hackathons, campus venue directions, or finding a squad!
            </div>
          </div>
          <div class="campus-bot-quick-prompts">
            <button onclick="Store.quickPromptBot('What events are happening live?')">🔴 What's Live?</button>
            <button onclick="Store.quickPromptBot('Find me a hackathon team')">👥 Find Squad</button>
            <button onclick="Store.quickPromptBot('Where is the AI lab?')">📍 Campus Map</button>
          </div>
          <form class="campus-bot-input-row" onsubmit="Store.submitCampusBot(event)">
            <input type="text" id="campusBotInput" placeholder="Ask CampusBot anything..." required autocomplete="off">
            <button type="submit">➤</button>
          </form>
        </div>
      </div>
    `;
  }

  function toggleCampusBot() {
    const win = document.getElementById('campusBotWindow');
    if (win) win.classList.toggle('active');
  }

  function quickPromptBot(promptText) {
    document.getElementById('campusBotInput').value = promptText;
    submitCampusBot(new Event('submit'));
  }

  function submitCampusBot(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('campusBotInput');
    const msgContainer = document.getElementById('campusBotMessages');
    const q = input.value.trim();
    if (!q) return;

    // Append user message
    const userDiv = document.createElement('div');
    userDiv.className = 'user-msg-bubble';
    userDiv.textContent = q;
    msgContainer.appendChild(userDiv);
    input.value = '';

    // Scroll
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Simulate AI thinking & reply
    setTimeout(() => {
      const res = queryCampusBot(q);
      const botDiv = document.createElement('div');
      botDiv.className = 'bot-msg-bubble';
      botDiv.innerHTML = `
        <div>${res.answer}</div>
        ${res.actionLink ? `<a href="${res.actionLink}" class="bot-action-link">${res.actionText}</a>` : ''}
      `;
      msgContainer.appendChild(botDiv);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 300);
  }

  // --- Reset to default ---
  function resetAllData() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    localStorage.setItem(STORAGE_KEYS.APPROVED_EVENTS, JSON.stringify(DEFAULT_EVENTS));
    localStorage.setItem(STORAGE_KEYS.PENDING_EVENTS, JSON.stringify(DEFAULT_PENDING_EVENTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    localStorage.setItem(STORAGE_KEYS.LIVE_QUESTIONS, JSON.stringify(DEFAULT_LIVE_QUESTIONS));
    localStorage.setItem(STORAGE_KEYS.PROJECT_SHOWCASE, JSON.stringify(DEFAULT_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.CLAIMED_DROPS, JSON.stringify(['CAMPUS-VIP']));
    localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify({}));
  }

  // --- UI Components Shared Helpers ---
  function renderSidebar(activeKey = 'home') {
    const user = getCurrentUser();
    const isAdmin = user && user.role === 'admin';
    const pendingCount = getPendingEvents().length;

    const navItems = [
      { key: 'home', label: 'Explore Events', icon: '🎯', href: 'index.html' },
      { key: 'live', label: 'Live Stage Hub', icon: '🔴', href: 'live_hub.html', badge: 'LIVE' },
      { key: 'map', label: 'Campus Spatial Map', icon: '🗺️', href: 'map.html' },
      { key: 'calendar', label: 'Campus Calendar', icon: '📅', href: 'calendar.html' },
      { key: 'group', label: 'AI Squad Matcher', icon: '👥', href: 'find_group.html' },
      { key: 'my-events', label: 'My Passes & Pitches', icon: '🎟️', href: 'my_events.html' },
      { key: 'pitch', label: 'Pitch with AI Co-Pilot', icon: '💡', href: 'new_event.html' },
      { key: 'reviews', label: 'Reviews & Gallery', icon: '⭐', href: 'reviews.html' },
      { key: 'profile', label: 'Profile & Credentials', icon: '🏆', href: 'profile.html' }
    ];

    navItems.push({
      key: 'checkin',
      label: 'Gate Ticket Scanner',
      icon: '📲',
      href: 'checkin.html'
    });

    if (isAdmin) {
      navItems.push({
        key: 'admin',
        label: 'Admin Approvals',
        icon: '🛡️',
        href: 'approveeventadminpage.html',
        badge: pendingCount > 0 ? pendingCount : null
      });
    }

    const navHtml = navItems.map(item => `
      <a href="${item.href}" class="nav-link ${activeKey === item.key ? 'active' : ''}">
        <span class="icon">${item.icon}</span>
        <span>${item.label}</span>
        ${item.badge ? `<span class="nav-badge ${item.badge === 'LIVE' ? 'live-pulsing' : 'danger'}">${item.badge}</span>` : ''}
      </a>
    `).join('');

    const userHtml = user ? `
      <div class="user-profile-brief">
        <a href="profile.html" class="user-avatar" title="View Profile">${user.name.charAt(0).toUpperCase()}</a>
        <div class="user-info">
          <a href="profile.html" class="user-name" title="${user.name}">${user.name}</a>
          <div class="user-role-badge">${user.role === 'admin' ? '🛡️ Administrator' : '🎓 Student'}</div>
        </div>
      </div>
      <button onclick="Store.logout()" class="btn-sidebar-action" title="Sign Out">
        🚪
      </button>
    ` : `
      <a href="login.html" class="btn btn-primary btn-sm btn-block">Sign In / Register</a>
    `;

    return `
      <div class="brand">
        <div class="brand-icon">🎓</div>
        <div>
          <div class="brand-title">CampusConnect</div>
          <div class="brand-subtitle">Student Events Hub</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-title">Main Portal</div>
        ${navHtml}
        ${!isAdmin ? `
          <div class="nav-section-title">Admin Management</div>
          <a href="approveeventadminpage.html" class="nav-link ${activeKey === 'admin' ? 'active' : ''}">
            <span class="icon">🛡️</span>
            <span>Admin Approvals</span>
            ${pendingCount > 0 ? `<span class="nav-badge danger">${pendingCount}</span>` : ''}
          </a>
        ` : ''}
      </nav>
      <div class="sidebar-user">
        ${userHtml}
      </div>
    `;
  }

  function renderTopBarNotificationWidget() {
    const unread = getUnreadNotificationCount();
    const notifs = getNotifications().slice(0, 5);

    const itemsHtml = notifs.length === 0 
      ? `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No new notifications</div>`
      : notifs.map(n => `
          <a href="${n.link}" class="notif-item ${!n.read ? 'unread' : ''}" onclick="Store.markAllNotificationsRead()">
            <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-main);">${n.title}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin: 2px 0;">${n.message}</div>
            <div style="font-size: 0.7rem; color: var(--text-light);">${n.time}</div>
          </a>
        `).join('');

    return `
      <div class="notif-dropdown-wrapper">
        <button class="notif-bell-btn" id="notifBellBtn" onclick="Store.toggleNotificationTray()" title="Notifications">
          🔔
          ${unread > 0 ? `<span class="notif-unread-count" id="notifBadge">${unread}</span>` : ''}
        </button>
        <div class="notif-dropdown-menu" id="notifDropdownMenu">
          <div class="notif-dropdown-header">
            <span>Campus Alerts</span>
            <button onclick="Store.markAllNotificationsRead(); Store.refreshNotificationWidget();" style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">
              Mark all read
            </button>
          </div>
          <div class="notif-list">
            ${itemsHtml}
          </div>
        </div>
      </div>
    `;
  }

  function toggleNotificationTray() {
    const menu = document.getElementById('notifDropdownMenu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  function refreshNotificationWidget() {
    const badge = document.getElementById('notifBadge');
    if (badge) badge.style.display = 'none';
    const unreadItems = document.querySelectorAll('.notif-item.unread');
    unreadItems.forEach(el => el.classList.remove('unread'));
  }

  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
      <div>${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  init();

  return {
    getCurrentUser,
    setCurrentUser,
    updateCurrentUserProfile,
    getUsers,
    registerUser,
    loginUser,
    logout,
    getCampusVenues,
    getVenueById,
    getApprovedEvents,
    setApprovedEvents,
    getPendingEvents,
    setPendingEvents,
    pitchEvent,
    approveEvent,
    rejectEvent,
    deleteApprovedEvent,
    getBookings,
    bookEvent,
    cancelBooking,
    getUserBookings,
    calculateSynergyScore,
    checkAcademicClashes,
    generateAIPitchIdea,
    getLiveQuestions,
    submitLiveQuestion,
    upvoteLiveQuestion,
    getProjectShowcase,
    submitProject,
    voteProject,
    getClaimedDrops,
    claimSecretDrop,
    getNotifications,
    addNotification,
    markAllNotificationsRead,
    getUnreadNotificationCount,
    getReviews,
    addReview,
    getSquadChats,
    getSquadMessages,
    postSquadMessage,
    getCheckIns,
    checkInTicket,
    queryCampusBot,
    renderCampusBotFloating,
    toggleCampusBot,
    quickPromptBot,
    submitCampusBot,
    resetAllData,
    renderSidebar,
    renderTopBarNotificationWidget,
    toggleNotificationTray,
    refreshNotificationWidget,
    showToast
  };
})();
