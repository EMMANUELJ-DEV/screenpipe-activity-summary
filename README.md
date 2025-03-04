# Screenpipe Activity Dashboard

A real-time monitoring dashboard for visualizing and tracking your screen and audio activity data collected by Screenpipe.

## Overview

The Screenpipe Activity Dashboard is a React-based web application that provides visual insights into your computer usage patterns. It displays screen events, audio activity, application usage statistics, and screenshots collected by the Screenpipe monitoring tool, giving you a comprehensive view of your digital activities.

## Features

- **Real-time Activity Monitoring**: Automatically refreshes data every minute
- **Interactive Dashboard**: Multiple views in a clean, modern interface
- **Activity Overview**: Quick summary of screen events, audio events, and unique applications used
- **Application Usage Statistics**: Bar charts and progress indicators showing which applications you use most
- **Activity Timeline**: Chronological list of screen and audio events with timestamps
- **Screenshot Gallery**: Visual history of your screen activity
- **Activity Trends**: Line charts showing activity patterns over time
- **Responsive Design**: Works on desktop and mobile devices

## Tabs

The dashboard includes four main tabs:

1. **Overview**: Summary statistics and application usage charts
2. **Timeline**: Chronological list of screen and audio activities
3. **Screenshots**: Gallery of recent screenshots
4. **Activity Trends**: Charts showing activity patterns over time

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Screenpipe application installed and running (for actual data collection)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/screenpipe-dashboard.git
   cd screenpipe-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Configuration

The dashboard connects to the Screenpipe API to fetch activity data. For development and testing purposes, the application includes mock data generation. 

You can modify the API connection in `src/api/screenpipe.js`.

## Dependencies

- React
- Recharts for data visualization
- @screenpipe/browser for API integration

## Development

### Project Structure

- `src/App.js`: Main application component and layout
- `src/api/screenpipe.js`: API integration and data fetching logic
- Component functions in App.js:
  - `ActivitySummary`: Displays activity overview statistics
  - `AppUsage`: Shows application usage charts
  - `ActivityTimeline`: Renders the chronological timeline
  - `LatestScreenshots`: Displays screenshot gallery
  - `ActivityTrends`: Visualizes activity patterns over time

