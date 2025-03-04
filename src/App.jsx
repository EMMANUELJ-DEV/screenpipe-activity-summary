import React, { useState, useEffect } from 'react';
import { fetchLastFiveMinutesActivity } from './api/screenpipe';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// CSS styles for improved UI
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    height: '100vh',
    margin: '0',
    padding: '20px',
    backgroundColor: '#f5f7fa',
    overflowY: 'auto',
    boxSizing: 'border-box',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainContent: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '24px',
  },
  header: {
    marginBottom: '20px',
    borderBottom: '1px solid #e1e4e8',
    paddingBottom: '15px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2e3c50',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#6a788a',
    fontSize: '16px',
    marginBottom: '15px',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#99aae5',
    cursor: 'not-allowed',
  },
  timestamp: {
    color: '#6a788a',
    fontSize: '14px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    padding: '20px',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#2e3c50',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // More responsive grid
    gap: '15px',
    marginBottom: '10px',
  },
  statCard: {
    padding: '15px',
    borderRadius: '6px',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: '14px',
    color: '#6a788a',
    marginBottom: '5px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2e3c50',
  },
  usageItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  appName: {
    width: '120px',
    fontWeight: '500',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  progressBarContainer: {
    flexGrow: 1,
    height: '8px',
    backgroundColor: '#e1e4e8',
    borderRadius: '4px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  progressBar: {
    height: '100%',
    borderRadius: '4px',
  },
  count: {
    fontSize: '14px',
    color: '#6a788a',
    width: '80px',
    textAlign: 'right',
  },
  timelineContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '15px',
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginRight: '15px',
    marginTop: '4px',
  },
  timelineContent: {
    flexGrow: 1,
    paddingBottom: '15px',
    borderBottom: '1px solid #e1e4e8',
  },
  timelineHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  timelineTime: {
    fontSize: '13px',
    color: '#6a788a',
    marginRight: '10px',
  },
  timelineDivider: {
    margin: '0 8px',
    color: '#ccc',
  },
  timelineApp: {
    fontWeight: '500',
    color: '#2e3c50',
  },
  timelineText: {
    fontSize: '14px',
    color: '#4a5568',
  },
  screenshotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
    gap: '15px',
  },
  screenshotCard: {
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  screenshotHeader: {
    padding: '8px 12px',
    backgroundColor: '#f5f7fa',
    borderBottom: '1px solid #e1e4e8',
    fontSize: '13px',
    fontWeight: '500',
  },
  screenshotImage: {
    width: '100%',
    display: 'block',
  },
  placeholderImage: {
    aspectRatio: '16/9',
    backgroundColor: '#f5f7fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6a788a',
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    padding: '15px',
    marginBottom: '20px',
    color: '#b91c1c',
  },
  errorTitle: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  troubleshooting: {
    marginTop: '10px',
    fontSize: '14px',
  },
  noActivityContainer: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fcd34d',
    borderRadius: '6px',
    padding: '15px',
    marginBottom: '20px',
    color: '#92400e',
  },
  footer: {
    marginTop: '30px',
    paddingTop: '15px',
    borderTop: '1px solid #e1e4e8',
    color: '#6a788a',
    fontSize: '13px',
    textAlign: 'center',
  },
  tabContainer: {
    marginBottom: '20px',
  },
  tabList: {
    display: 'flex',
    borderBottom: '1px solid #e1e4e8',
    marginBottom: '20px',
    overflowX: 'auto', // Add horizontal scrolling for small screens
  },
  tab: {
    padding: '10px 16px',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#6a788a',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap', // Prevent tabs from wrapping
  },
  activeTab: {
    color: '#4a6cf7',
    borderBottom: '2px solid #4a6cf7',
  },
  chartContainer: {
    height: '300px',
    marginBottom: '20px',
  }
};

function App() {
  const [recentActivity, setRecentActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  // New state to track previous data for timeline
  const [activityHistory, setActivityHistory] = useState([]);

  useEffect(() => {
    fetchRecentActivity();
    
    // Set up polling every minute
    const intervalId = setInterval(() => {
      fetchRecentActivity();
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching recent activity...');
      const activity = await fetchLastFiveMinutesActivity();
      console.log('Activity data received:', activity);
      
      // Add timestamp to the activity data for historical tracking
      const timestampedActivity = {
        ...activity,
        timestamp: new Date().toISOString()
      };
      
      // Update activity history (keep last 10 polls)
      setActivityHistory(prevHistory => {
        const updatedHistory = [...prevHistory, timestampedActivity].slice(-10);
        return updatedHistory;
      });
      
      setRecentActivity(activity);
    } catch (err) {
      console.error('Error fetching activity:', err);
      setError('Failed to fetch recent activity data. Make sure Screenpipe is running and configured correctly.');
    } finally {
      setLoading(false);
    }
  };

  const hasData = recentActivity && (
    recentActivity.summary.totalScreenEvents > 0 ||
    recentActivity.summary.totalAudioEvents > 0 ||
    recentActivity.timeline.length > 0
  );
  
  // Prepare data for the activity trend chart
  const prepareChartData = () => {
    if (activityHistory.length === 0) return [];
    
    return activityHistory.map(entry => {
      const time = new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      return {
        time,
        screenEvents: entry.summary.totalScreenEvents,
        audioEvents: entry.summary.totalAudioEvents,
        apps: entry.summary.uniqueApps
      };
    });
  };
  
  const chartData = prepareChartData();

  // Fixed button style function to avoid the spread issue
  const getButtonStyle = () => {
    if (loading) {
      return {
        backgroundColor: styles.buttonDisabled.backgroundColor,
        color: styles.button.color,
        border: styles.button.border,
        padding: styles.button.padding,
        borderRadius: styles.button.borderRadius,
        fontWeight: styles.button.fontWeight,
        cursor: styles.buttonDisabled.cursor,
        fontSize: styles.button.fontSize,
        transition: styles.button.transition
      };
    }
    return styles.button;
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.title}>Activity Dashboard</h1>
          <p style={styles.subtitle}>
            Monitor your recent screen and audio activity captured by Screenpipe
          </p>
        </header>
        
        <div style={styles.actionBar}>
          <button 
            onClick={fetchRecentActivity}
            style={getButtonStyle()}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
          
          <div style={styles.timestamp}>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {loading && (
          <div style={{textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '8px', marginBottom: '24px'}}>
            <div>Loading recent activity...</div>
          </div>
        )}
        
        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorTitle}>Error</p>
            <p>{error}</p>
            <div style={styles.troubleshooting}>
              <p>Troubleshooting tips:</p>
              <ul style={{paddingLeft: '20px', marginTop: '5px'}}>
                <li>Make sure the Screenpipe application is running</li>
                <li>Check if screen recording permissions are enabled</li>
                <li>Verify your browser has access to the Screenpipe API</li>
              </ul>
            </div>
          </div>
        )}
        
        {!loading && !error && recentActivity && !hasData && (
          <div style={styles.noActivityContainer}>
            <p style={{fontWeight: 'bold'}}>No activity found</p>
            <p>No screen or audio activity was detected in the past 5 minutes.</p>
          </div>
        )}
        
        {recentActivity && !loading && hasData && (
          <>
            <div style={styles.tabContainer}>
              <div style={styles.tabList}>
                <div 
                  style={activeTab === 'overview' ? 
                    { ...styles.tab, ...styles.activeTab } : 
                    styles.tab}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </div>
                <div 
                  style={activeTab === 'timeline' ? 
                    { ...styles.tab, ...styles.activeTab } : 
                    styles.tab}
                  onClick={() => setActiveTab('timeline')}
                >
                  Timeline
                </div>
                <div 
                  style={activeTab === 'screenshots' ? 
                    { ...styles.tab, ...styles.activeTab } : 
                    styles.tab}
                  onClick={() => setActiveTab('screenshots')}
                >
                  Screenshots
                </div>
                <div 
                  style={activeTab === 'trends' ? 
                    { ...styles.tab, ...styles.activeTab } : 
                    styles.tab}
                  onClick={() => setActiveTab('trends')}
                >
                  Activity Trends
                </div>
              </div>
            
              {activeTab === 'overview' && (
                <div>
                  <ActivitySummary summary={recentActivity.summary} />
                  
                  {Object.keys(recentActivity.appUsage).length > 0 && (
                    <AppUsage appUsage={recentActivity.appUsage} />
                  )}
                </div>
              )}
              
              {activeTab === 'timeline' && (
                <div>
                  {recentActivity.timeline.length > 0 ? (
                    <ActivityTimeline timeline={recentActivity.timeline} />
                  ) : (
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>Activity Timeline</div>
                      <p style={{color: '#6a788a'}}>No activity recorded in timeline</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'screenshots' && (
                <div>
                  {recentActivity.screenshots.length > 0 ? (
                    <LatestScreenshots screenshots={recentActivity.screenshots} />
                  ) : (
                    <div style={styles.card}>
                      <div style={styles.cardTitle}>Latest Screenshots</div>
                      <p style={{color: '#6a788a'}}>No screenshots available</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'trends' && (
                <div>
                  <ActivityTrends chartData={chartData} />
                </div>
              )}
            </div>
          </>
        )}
        
        <footer style={styles.footer}>
          <p>Powered by Screenpipe SDK • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

function ActivitySummary({ summary }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>Activity Overview</div>
      <div style={styles.statGrid}>
        <div style={{
          padding: '15px',
          borderRadius: '6px',
          textAlign: 'center',
          backgroundColor: '#ebf5ff'
        }}>
          <div style={styles.statLabel}>Total Screen Events</div>
          <div style={styles.statValue}>{summary.totalScreenEvents}</div>
        </div>
        <div style={{
          padding: '15px',
          borderRadius: '6px',
          textAlign: 'center',
          backgroundColor: '#f0fff4'
        }}>
          <div style={styles.statLabel}>Total Audio Events</div>
          <div style={styles.statValue}>{summary.totalAudioEvents}</div>
        </div>
        <div style={{
          padding: '15px',
          borderRadius: '6px',
          textAlign: 'center',
          backgroundColor: '#f3f0ff'
        }}>
          <div style={styles.statLabel}>Apps Used</div>
          <div style={styles.statValue}>{summary.uniqueApps}</div>
        </div>
      </div>
      
      {summary.totalScreenEvents > 0 || summary.totalAudioEvents > 0 ? (
        <div style={{marginTop: '20px'}}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              {name: 'Screen Events', value: summary.totalScreenEvents, fill: '#4a6cf7'},
              {name: 'Audio Events', value: summary.totalAudioEvents, fill: '#10b981'},
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" name="Events" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  );
}

function AppUsage({ appUsage }) {
  // Calculate the maximum count for scaling
  const maxCount = Math.max(...Object.values(appUsage));
  
  // Convert to chart data
  const chartData = Object.entries(appUsage)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([app, count]) => ({
      name: app,
      count: count
    }));
  
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>App Usage</div>
      
      {chartData.length > 0 && (
        <div style={{marginBottom: '20px'}}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4a6cf7" name="Events" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div>
        {Object.entries(appUsage)
          .sort(([, countA], [, countB]) => countB - countA)
          .map(([app, count]) => (
            <div key={app} style={styles.usageItem}>
              <div style={styles.appName} title={app}>{app}</div>
              <div style={styles.progressBarContainer}>
                <div 
                  style={{
                    height: '100%',
                    borderRadius: '4px',
                    width: `${(count / maxCount) * 100}%`,
                    backgroundColor: '#4a6cf7'
                  }}
                ></div>
              </div>
              <div style={styles.count}>{count} events</div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ActivityTimeline({ timeline }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>Activity Timeline</div>
      {timeline.length === 0 ? (
        <p style={{color: '#6a788a'}}>No activity recorded in timeline</p>
      ) : (
        <div style={styles.timelineContainer}>
          {timeline.map((item, index) => (
            <div key={index} style={styles.timelineItem}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                marginRight: '15px',
                marginTop: '4px',
                backgroundColor: item.type === 'audio' ? '#10b981' : '#4a6cf7'
              }}></div>
              <div style={styles.timelineContent}>
                <div style={styles.timelineHeader}>
                  <span style={styles.timelineTime}>{item.time}</span>
                  <span style={styles.timelineDivider}>•</span>
                  <span style={styles.timelineApp}>{item.app}</span>
                </div>
                <div style={styles.timelineText}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LatestScreenshots({ screenshots }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>Latest Screenshots</div>
      {screenshots.length === 0 ? (
        <p style={{color: '#6a788a'}}>No screenshots available</p>
      ) : (
        <div style={styles.screenshotGrid}>
          {screenshots.map((screenshot, index) => (
            <div key={index} style={styles.screenshotCard}>
              <div style={styles.screenshotHeader}>
                {screenshot.app} - {screenshot.time}
              </div>
              {screenshot.image.startsWith('/api/placeholder') ? (
                <div style={{
                  aspectRatio: '16/9',
                  backgroundColor: '#f5f7fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6a788a'
                }}>
                  Screenshot placeholder
                </div>
              ) : (
                <img 
                  src={`data:image/png;base64,${screenshot.image}`} 
                  alt={`Screenshot from ${screenshot.app}`}
                  style={styles.screenshotImage}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityTrends({ chartData }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>Activity Trends</div>
      
      {chartData.length < 2 ? (
        <p style={{color: '#6a788a'}}>Not enough data to display trends. Check back after more activity has been recorded.</p>
      ) : (
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="screenEvents" 
                name="Screen Events" 
                stroke="#4a6cf7" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="audioEvents" 
                name="Audio Events" 
                stroke="#10b981" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="apps" 
                name="Apps Used" 
                stroke="#8b5cf6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      <div style={{marginTop: '15px'}}>
        <p style={{fontSize: '14px', color: '#6a788a'}}>
          This chart shows your activity patterns over time. Data is collected every minute and retains the last 10 data points.
        </p>
      </div>
    </div>
  );
}

export default App;