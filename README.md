<div align="center">

<img src="assets/images/logo.svg" alt="Attendo logo" width="96" height="96" />

# Attendo

**Employee attendance that takes one look.**

Face-recognition and PIN check-in · geofenced punches · leave requests · manager dashboard · full dark mode

Built with Expo · React Native · TypeScript · expo-router

</div>

---

## Overview

Attendo is a mobile attendance app for employees. Staff punch in and out with **face
recognition** or a **manual employee ID + 4-digit PIN**, and every punch is validated
against an office **geofence**. The app also covers leave / regularization requests with
approval status, a team view for managers, and a complete dark theme.

The UI follows a fixed design spec — 24 light screens, 4 dark screens, and a shared
component inventory.

> **Status:** in active development, built phase by phase.

## Features

- **Two check-in methods** — face recognition (real camera preview) or manual ID + PIN
- **Attendance state machine** — checked out → checked in → on break, with live work and
  break timers and a running daily punch log
- **Geofencing** — punches are only recorded inside the office zone
- **History** — month calendar with per-day status and in/out/total hours
- **Requests** — leave and regularization requests with pending / approved / rejected states
- **Face enrollment** — guided front / left / right capture, template stored on device
- **Manager view** — team roster, present / absent / on-leave / late counts, pending approvals
- **Error & offline states** — outside-geofence block, offline punch queue with later sync
- **Light & dark** — system, light, or dark, remembered per device

> There is no backend. The app runs on a local mock-data layer with client state persisted
> to device storage. Face matching, geofence checks, and connectivity are simulated (with
> dev toggles) so every screen and flow is reachable offline.

## Tech stack

| Area        | Choice                                                                  |
| ----------- | ----------------------------------------------------------------------- |
| Framework   | [Expo](https://expo.dev) SDK 57, React Native 0.86, React 19            |
| Language    | TypeScript (strict)                                                     |
| Navigation  | [expo-router](https://docs.expo.dev/router/introduction) (file-based)   |
| State       | [zustand](https://github.com/pmndrs/zustand) + AsyncStorage persistence |
| Styling     | React Native `StyleSheet` + central theme with `useTheme()`             |
| Fonts       | Inter via `@expo-google-fonts/inter`                                    |
| Icons / SVG | `lucide-react-native`, `react-native-svg`                               |
| Native      | `expo-camera`, `expo-location`, `expo-haptics`                          |
| Animation   | `react-native-reanimated`                                               |
| Dates       | `date-fns`                                                              |

## Getting started

**Prerequisites:** Node 20+, and the [Expo Go](https://expo.dev/go) app or an
Android emulator / iOS simulator.

```bash
# install dependencies
npm install

# start the dev server
npm start
```

Then press `i` for iOS, `a` for Android, or `w` for web — or scan the QR code with Expo Go.

Platform shortcuts:

```bash
npm run ios       # start + open iOS simulator
npm run android   # start + open Android emulator
npm run web       # start + open in browser
```

## Scripts

| Script                            | What it does                            |
| --------------------------------- | --------------------------------------- |
| `npm start`                       | Start the Expo dev server               |
| `npm run ios` / `android` / `web` | Start and open the app on that platform |
| `npm run lint`                    | ESLint (`eslint-config-expo`)           |
| `npm run typecheck`               | `tsc --noEmit`                          |
| `npm run format`                  | Prettier write                          |

## Project structure

```
app/                  expo-router routes (thin — each imports a feature screen)
  (auth)/             splash, login, check-in method, permissions
  (app)/(tabs)/       Home · History · Requests · Profile
  (checkin)/          face scan → verifying → result, manual PIN, confirm
src/
  theme/              colors, tokens, typography, ThemeProvider
  components/ui/       Button, Card, Text, StatusChip, StatTile, Toast, Sheet, Logo …
  stores/             zustand stores (auth, attendance, requests, settings, team)
  data/               mock data seed
  features/           screen implementations by area
```

## License

MIT — see [LICENSE](LICENSE).
