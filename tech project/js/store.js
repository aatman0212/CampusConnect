/**
 * CampusConnect Central Data & Store Management (Enhanced)
 * Handles state persistence, mock data seeding, auth sessions, bookings,
 * group matching, squad chatrooms, notifications, event reviews, check-ins, and certificates.
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
    CHECKINS: 'cc_checkins'
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
      badges: ['Hackathon Pioneer', 'Active Attendee', 'Squad Commander', 'Early Bird'],
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
      venue: 'Main Auditorium & CS Labs',
      capacity: 60,
      spots: 44,
      rating: 4.9,
      reviewCount: 28,
      status: 'approved',
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
      venue: 'Open Air Amphitheatre',
      capacity: 150,
      spots: 98,
      rating: 4.8,
      reviewCount: 42,
      status: 'approved',
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
      capacity: 45,
      spots: 14,
      rating: 5.0,
      reviewCount: 19,
      status: 'approved',
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
      venue: 'University Main Sports Ground',
      capacity: 80,
      spots: 35,
      rating: 4.7,
      reviewCount: 31,
      status: 'approved',
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
      venue: 'Design Studio Lab B',
      capacity: 35,
      spots: 8,
      rating: 4.9,
      reviewCount: 15,
      status: 'approved',
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
      venue: 'Student Gaming Lounge & Cyber Center',
      capacity: 60,
      spots: 25,
      rating: 4.8,
      reviewCount: 37,
      status: 'approved',
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
      status: 'pending',
      createdAt: '2026-09-28'
    }
  ];

  const DEFAULT_NOTIFICATIONS = [
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
    },
    {
      id: 'notif-3',
      title: '🏆 Achievement Unlocked!',
      message: 'You earned the "Hackathon Pioneer" campus profile badge.',
      time: 'Yesterday',
      read: true,
      link: 'profile.html'
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
    },
    {
      id: 'rev-4',
      eventTitle: 'Inter-Department 7-a-Side Football Tournament',
      reviewerName: 'Carlos Gomez',
      reviewerBranch: 'Mechanical Eng.',
      rating: 4,
      comment: 'Intense tournament! The crowd support was insane during penalties. Well organized refereeing and medical staff on standby.',
      date: '2026-09-20',
      photoUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const DEFAULT_SQUAD_CHATS = {
    'Neural Ninjas': [
      { sender: 'Alex Rivera', role: 'Team Lead', message: 'Hey squad! Let us meet tomorrow at 4 PM in Lab 3 to test our API endpoints.', time: '11:30 AM' },
      { sender: 'Priya Sharma', role: 'Data Eng.', message: 'Sounds great! I finished data preprocessing for our fine-tuning set.', time: '11:35 AM' }
    ],
    'CloudCrafters': [
      { sender: 'Marcus Vance', role: 'DevOps', message: 'AWS and Docker setup is ready. Still looking for 1 frontend teammate with React skills!', time: 'Yesterday' }
    ]
  };

  // Initialize store
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
        eventId: 'evt-3',
        eventTitle: 'Machine Learning & LLM Fine-Tuning Bootcamp',
        eventDate: '2026-10-08',
        eventTime: '02:00 PM',
        venue: 'Computing Complex Lab 4',
        eventType: 'Solo',
        bookingType: 'Solo',
        groupSize: 1,
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
    if (!localStorage.getItem(STORAGE_KEYS.SQUAD_CHATS)) {
      localStorage.setItem(STORAGE_KEYS.SQUAD_CHATS, JSON.stringify(DEFAULT_SQUAD_CHATS));
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

    // Also update in all users list
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
      skills: ['Teamwork', 'Communication'],
      badges: ['Campus Newcomer'],
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

    // Update event average rating
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

  // --- Reset to default ---
  function resetAllData() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    localStorage.setItem(STORAGE_KEYS.APPROVED_EVENTS, JSON.stringify(DEFAULT_EVENTS));
    localStorage.setItem(STORAGE_KEYS.PENDING_EVENTS, JSON.stringify(DEFAULT_PENDING_EVENTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(DEFAULT_REVIEWS));
    localStorage.setItem(STORAGE_KEYS.SQUAD_CHATS, JSON.stringify(DEFAULT_SQUAD_CHATS));
    localStorage.setItem(STORAGE_KEYS.CHECKINS, JSON.stringify({}));
  }

  // --- UI Components Shared Helpers ---
  function renderSidebar(activeKey = 'home') {
    const user = getCurrentUser();
    const isAdmin = user && user.role === 'admin';
    const pendingCount = getPendingEvents().length;
    const unreadCount = getUnreadNotificationCount();

    const navItems = [
      { key: 'home', label: 'Explore Events', icon: '🎯', href: 'index.html' },
      { key: 'calendar', label: 'Campus Calendar', icon: '📅', href: 'calendar.html' },
      { key: 'my-events', label: 'My Passes & Pitches', icon: '🎟️', href: 'my_events.html' },
      { key: 'pitch', label: 'Pitch New Event', icon: '💡', href: 'new_event.html' },
      { key: 'group', label: 'Find / Form Squad', icon: '👥', href: 'find_group.html' },
      { key: 'reviews', label: 'Reviews & Gallery', icon: '⭐', href: 'reviews.html' },
      { key: 'profile', label: 'My Student Profile', icon: '🎓', href: 'profile.html' }
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
        ${item.badge ? `<span class="nav-badge danger">${item.badge}</span>` : ''}
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

  // Initialize immediately
  init();

  return {
    getCurrentUser,
    setCurrentUser,
    updateCurrentUserProfile,
    getUsers,
    registerUser,
    loginUser,
    logout,
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
    resetAllData,
    renderSidebar,
    renderTopBarNotificationWidget,
    toggleNotificationTray,
    refreshNotificationWidget,
    showToast
  };
})();
