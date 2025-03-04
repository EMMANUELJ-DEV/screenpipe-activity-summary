// src/api/screenpipe.js
import { pipe } from '@screenpipe/browser';

// src/api/screenpipe.js

/**
 * Fetches the activity data for the last five minutes
 * @returns {Promise<Object>} Activity data
 */
export async function fetchLastFiveMinutesActivity() {
  // In a real implementation, this would make an API call to the Screenpipe server
  // For now, returning mock data for testing

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data
  return {
    summary: {
      totalScreenEvents: Math.floor(Math.random() * 200) + 50,
      totalAudioEvents: Math.floor(Math.random() * 100) + 10,
      uniqueApps: Math.floor(Math.random() * 8) + 2
    },
    appUsage: {
      "Chrome": Math.floor(Math.random() * 50) + 20,
      "Visual Studio Code": Math.floor(Math.random() * 40) + 15,
      "Slack": Math.floor(Math.random() * 30) + 10,
      "Spotify": Math.floor(Math.random() * 20) + 5,
      "File Explorer": Math.floor(Math.random() * 15) + 3,
      "Zoom": Math.floor(Math.random() * 25) + 5,
      "Microsoft Word": Math.floor(Math.random() * 20) + 3
    },
    timeline: [
      { type: 'screen', time: '10:30 AM', app: 'Chrome', text: 'Web browsing activity detected' },
      { type: 'audio', time: '10:32 AM', app: 'Spotify', text: 'Audio playback detected' },
      { type: 'screen', time: '10:35 AM', app: 'Visual Studio Code', text: 'Code editing activity' },
      { type: 'screen', time: '10:40 AM', app: 'Slack', text: 'Messaging activity detected' },
      { type: 'audio', time: '10:45 AM', app: 'Zoom', text: 'Voice chat activity detected' },
      { type: 'screen', time: '10:48 AM', app: 'Microsoft Word', text: 'Document editing activity' }
    ],
    screenshots: [
      { app: 'Chrome', time: '10:30 AM', image: '/api/placeholder/400/300' },
      { app: 'Visual Studio Code', time: '10:35 AM', image: '/api/placeholder/400/300' },
      { app: 'Slack', time: '10:40 AM', image: '/api/placeholder/400/300' },
      { app: 'Zoom', time: '10:45 AM', image: '/api/placeholder/400/300' }
    ]
  };
}
function processActivityData(data) {
  // Summary statistics
  const summary = {
    totalScreenEvents: 0,
    totalAudioEvents: 0,
    uniqueApps: 0,
  };
  
  // App usage tracking
  const appUsage = {};
  
  // Timeline items (most recent first)
  const timeline = [];
  
  // Latest screenshots (up to 4)
  const screenshots = [];
  
  // Process each item
  data.forEach(item => {
    // Handle different content types
    if (item.type === "OCR") {
      summary.totalScreenEvents++;
      
      // Track app usage
      const appName = item.content.app_name || "Unknown";
      appUsage[appName] = (appUsage[appName] || 0) + 1;
      
      // Add to timeline
      timeline.push({
        time: new Date(item.content.timestamp).toLocaleTimeString(),
        app: appName,
        text: truncateText(item.content.text, 100),
        type: "screen"
      });
      
      // Add to screenshots if it has a frame (image)
      if (item.content.frame && screenshots.length < 4) {
        screenshots.push({
          time: new Date(item.content.timestamp).toLocaleTimeString(),
          app: appName,
          image: item.content.frame
        });
      }
    } else if (item.type === "Audio") {
      summary.totalAudioEvents++;
      
      // Add to timeline
      timeline.push({
        time: new Date(item.content.timestamp).toLocaleTimeString(),
        app: "Audio Transcript",
        text: truncateText(item.content.transcription, 100),
        type: "audio",
        speaker: item.content.speaker_id || "Unknown"
      });
    }
  });
  
  // Calculate unique apps count
  summary.uniqueApps = Object.keys(appUsage).length;
  
  // Sort timeline by most recent first
  timeline.sort((a, b) => new Date(b.time) - new Date(a.time));
  
  return {
    summary,
    appUsage,
    timeline: timeline.slice(0, 10), // Only show 10 most recent events
    screenshots
  };
}

function truncateText(text, maxLength) {
  if (!text) return "No text available";
  return text.length > maxLength 
    ? text.substring(0, maxLength) + "..." 
    : text;
}

// Create empty data structure for when no data is found
function createEmptyDataStructure() {
  return {
    summary: {
      totalScreenEvents: 0,
      totalAudioEvents: 0,
      uniqueApps: 0,
    },
    appUsage: {},
    timeline: [],
    screenshots: []
  };
}

// Create mock data for development testing
function createMockData() {
  return {
    summary: {
      totalScreenEvents: 15,
      totalAudioEvents: 5,
      uniqueApps: 3,
    },
    appUsage: {
      "Chrome": 8,
      "VS Code": 5,
      "Terminal": 2,
    },
    timeline: [
      {
        time: "10:45:23 AM",
        app: "Chrome",
        text: "GitHub - User activity dashboard showing recent commits",
        type: "screen"
      },
      {
        time: "10:43:12 AM",
        app: "VS Code",
        text: "function processData() { const results = []; for (const item of data) {",
        type: "screen"
      },
      {
        time: "10:42:05 AM",
        app: "Audio Transcript",
        text: "Let me check the documentation for the API endpoint",
        type: "audio",
        speaker: "1"
      },
      {
        time: "10:40:30 AM",
        app: "Terminal",
        text: "npm install @screenpipe/browser",
        type: "screen"
      }
    ],
    screenshots: [
      {
        time: "10:45:23 AM",
        app: "Chrome",
        image: "/api/placeholder/400/300" // For testing UI without real base64 images
      },
      {
        time: "10:43:12 AM",
        app: "VS Code",
        image: "/api/placeholder/400/300"
      }
    ]
  };

  
}

