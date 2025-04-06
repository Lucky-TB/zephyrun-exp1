# Zephyrun

A smart running route planning app powered by AI, built with React Native and Expo.

## Features

- Smart Route Planning with AI-powered recommendations
- Real-time trail conditions and community updates
- Personalized training optimization
- Terrain analysis and elevation visualization
- Weather integration for optimal running times

## Tech Stack

- React Native with Expo
- NativeWind for styling
- Tamagui for UI components
- Supabase for backend and authentication
- Gemini API for AI-powered route analysis
- React Navigation for routing
- React Native Maps for map integration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/zephyrun.git
cd zephyrun
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Fill in your API keys in the `.env` file:
- Supabase URL and Anon Key
- Gemini API Key
- Maps API Key
- Weather API Key

5. Start the development server:
```bash
npx expo start
```

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── screens/        # Screen components
  ├── services/       # API and external service integrations
  ├── hooks/          # Custom React hooks
  ├── utils/          # Utility functions
  ├── constants/      # App constants and configuration
  ├── types/          # TypeScript type definitions
  └── assets/         # Images, fonts, and other static assets
```

## Development

- Follow the TypeScript and React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, maintainable code
- Add comments for complex logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 