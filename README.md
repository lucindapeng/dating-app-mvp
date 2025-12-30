# Dating App MVP (Week 3 Complete)

## Overview
This project is a mobile dating app MVP built with:
- FastAPI (backend)
- SQLAlchemy + SQLite
- React Native (Expo)

The goal of this MVP is to validate a **safe, state-based dating flow** from match → proposal → acceptance → real-world confirmation.

---

## ✅ Implemented Features

### Authentication
- User registration
- User login

### Matching
- Users can view other users as matches
- Matches exclude the currently logged-in user

### Date Flow
- Propose a date
- Accept a date
- Decline a date
- Mark a date as **checked in** (demo endpoint)

Date statuses:
pending → accepted → checked_in


### Stability
- App navigation works
- No crashes during core flows
- Backend state updates correctly

---

## 🚧 Not Implemented (Planned / Post-MVP)

The following features are **intentionally NOT implemented** in this MVP:
- Restaurant QR codes
- Admin restaurant dashboards
- Identity verification
- Selfie verification
- Location tracking
- Machine learning matching

These are planned extensions beyond MVP validation.

---

## How to Run

### Backend
```bash
cd dating-app-backend
python3 -m uvicorn main:app --reload

### Frontend
cd dating-app-frontend
npx expo start
