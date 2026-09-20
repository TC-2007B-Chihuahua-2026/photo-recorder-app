# Photo Recorder App

This application was created with Expo using the following command:

```bash
npx create-expo-app@latest photo-recorder-app --template blank
```

## Purpose

The purpose of this app is to let the user take a photo from the application and record the following information:

- the captured photo
- the latitude
- the longitude
- the timestamp of the capture
- the data stored locally in a SQLite database

This is useful for scenarios where the user needs to document a location and attach a photo to that record, with the information stored locally on the device.

## Features

- Capture a photo using the device camera
- Retrieve current geolocation coordinates
- Save photo metadata and coordinates in a local SQLite database
- View saved photo entries locally on the device
- Work as a lightweight offline local recorder app

## Tech Stack

- Expo
- React Native
- SQLite local database
- Expo Camera
- Expo Location
- Expo SQLite

## Prerequisites

Before running the app, make sure you have installed:

- Node.js 20+ recommended
- npm or Yarn
- Expo CLI
- Android Studio with an Android emulator, or
- Xcode with an iOS simulator (for macOS only), or
- Expo Go app on a physical device

## Install dependencies

From the project root:

```bash
npm install
```

## Run the application

### 1) Run with Expo development server

```bash
npx expo start
```

This will start the Metro bundler and show a QR code.

### 2) Run on Android emulator

Open Android Studio and start an emulator, then run:

```bash
npx expo start --android
```

This will launch the app in the Android emulator.

### 3) Run on iPhone simulator

On macOS with Xcode installed, start the iOS simulator and run:

```bash
npx expo start --ios
```

This will launch the app in the iOS simulator.

### 4) Run with Expo Go on a physical device

1. Install Expo Go from the App Store or Google Play.
2. Start the development server:

```bash
npx expo start
```

3. Scan the QR code shown in the terminal with the Expo Go app.

The app will connect to your local Expo server and run on the device.

## Local SQLite database

The app stores its captured records locally using SQLite, so data remains on the device even when the app is used offline.

## Project structure

```bash
photo-recorder-app/
├── App.js
├── app.json
├── index.js
├── package.json
├── assets/
├── README.md
└── ...
```

## Notes

This project is intended as a local photo + GPS recorder and is designed for testing and development in Expo-based environments. If you plan to add more features later, you can extend it with:

- photo gallery view
- delete saved records
- export data as JSON
- sync to a backend service

## Useful commands

```bash
npm install
npx expo start
npx expo start --android
npx expo start --ios
```
