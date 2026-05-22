# Nomzy

A premium dark-themed food delivery app built with React Native and Expo SDK 55.

<p align="center">
  <a href="https://x.com/jaaaani404/status/2057963077577146451?s=20">
    <img
      src="https://github.com/user-attachments/assets/b9ec2640-9634-4c8b-8164-0d79f0c38991"
      alt="Nomzy app screens — click to watch demo"
      width="100%"
    />
  </a>
</p>

<p align="center">
  <a href="https://x.com/jaaaani404/status/2057963077577146451?s=20">▶ Watch the demo video</a>
</p>

---

## Tech Stack

- **Expo** ~55.0.26 · **React Native** 0.83.6
- **React Navigation** v7 — Native Stack, Bottom Tabs, Drawer
- **Reanimated** 4.2.1 + **Gesture Handler** 2.30
- **AsyncStorage** — auth persistence
- **Expo Linear Gradient** · **react-native-svg**

## Run Locally

```bash
npm install
npm start        # scan QR with Expo Go
npm run ios      # iOS simulator
npm run android  # Android emulator
```

## Navigation Structure

```
Auth Stack
└── AuthScreen (Login / Sign Up)
        │ signIn() → GuardedNavigation swaps to MainTabs
        ▼
Bottom Tab Navigator
├── HomeTab (Stack)
│   ├── HomeScreen
│   ├── RestaurantDetail   ← deep link: foodapp://restaurant/:id
│   ├── MenuScreen
│   ├── CartScreen
│   ├── OrderConfirmedScreen
│   └── HelpScreen
├── Search → DiscoveryScreen (swipe deck)
├── Orders → OrdersScreen
├── Saved  → SavedScreen
└── Profile → Drawer Navigator
              ├── ProfileScreen
              └── Custom drawer (My Orders · Settings · Help · Logout)

Sidebar overlay (hamburger on any screen)
└── Home · Discover · Orders · Saved · Profile · Help · Logout
```

## Deep Linking

| URL | Opens |
|---|---|
| `foodapp://restaurant/1` | RestaurantDetail for restaurant id 1 |
| `nomzy://restaurant/1` | same |

## Auth Flow

- Login state persisted in `AsyncStorage` (`@nomzy_auth`)
- On launch: reads storage → shows Auth or Main app
- Logout clears storage → `GuardedNavigation` re-renders to Auth

## Key Features

- Swipe-based restaurant discovery deck (Reanimated 4 + Gesture Handler)
- Cart with bill breakdown, place order → Order Confirmed
- Orders history via `OrdersContext`
- Profile drawer with real order count from context
- Animated in-app splash screen
