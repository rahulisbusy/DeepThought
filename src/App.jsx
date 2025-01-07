import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Home, Building2, Lightbulb, HelpCircle, 
  Bell, User, MoreVertical 
} from 'lucide-react';
import ArticleAsset from './components/ArticleAsset';
import VideoAsset from './components/VideoAsset';
import ThreadbuilderAsset from './components/ThreadbuilderAsset';
import FourSAAsset from './components/FourSAAsset.JSX';
const Logo = () => (
  <img src="https://deepthought.education/assets/images/logo/logo.svg" alt="" />
);






const AssetRenderer = ({ asset }) => {
  switch(asset.asset_content_type) {
    case 'video':
      return <VideoAsset asset={asset} />;
    case 'threadbuilder':
      return <ThreadbuilderAsset asset={asset} />;
    case 'article':
      if (asset.asset_type === 'display_asset') {
        return (
          <div className="asset-container article-asset">
            <h3>{asset.asset_title}</h3>
            <p>{asset.asset_description}</p>
            <div className="article-content">
              <a 
                href={asset.asset_content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="article-link"
              >
                Read More
              </a>
            </div>
          </div>
        );
      }
      return <ArticleAsset asset={asset} />;
    default:
      return <FourSAAsset asset={asset}/>;
  }
};

const App = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourseData(data);
        
        if (data.tasks && data.tasks.length > 0) {
          setCurrentTask(data.tasks[0]);
          if (data.tasks[0].assets && data.tasks[0].assets.length > 0) {
            setSelectedTab(data.tasks[0].assets[0].asset_id);
          }
        }
      } catch (error) {
        console.error('Error loading course data:', error);
        setError('Failed to load course data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCourseData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courseData || !currentTask) {
    return (
      <div className="error-container">
        <p className="error-message">No course data available</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="top-navbar">
        <div className="top-navbar-left">
          <div className="brand">
            <Logo />
          </div>
        </div>
        <div className="top-navbar-right">
          <div className="nav-icons">
            <Home className="nav-icon" size={20} />
            <Building2 className="nav-icon" size={20} />
            <Lightbulb className="nav-icon" size={20} />
            <HelpCircle className="nav-icon" size={20} />
            <Bell className="nav-icon" size={20} />
            <User className="nav-icon" size={20} />
            <MoreVertical className="nav-icon" size={20} />
          </div>
        </div>
      </nav>

      <div className="main-wrapper">
      <nav className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
  <div
    className="sidebar-toggle"
    onClick={() => setSidebarOpen(!isSidebarOpen)}
  >
    {isSidebarOpen ? '←' : '→'}
  </div>
  <div className="sidebar-content">
    <div className="nav-items">
      <h3>Explore the world of management</h3>
      <ul>
        {currentTask.assets.map((asset) => (
          <li
            key={asset.asset_id}
            className={`nav-item ${selectedTab === asset.asset_id ? 'active' : ''}`}
            onClick={() => setSelectedTab(asset.asset_id)}
          >
            {asset.asset_title}
          </li>
        ))}
      </ul>
    </div>
  </div>
</nav>


        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="task-header">
            <h1>{currentTask.task_title}</h1>
            <p>{currentTask.task_description}</p>
          </div>

          <div className="assets-grid ">
            {currentTask.assets.map(asset => (
              <AssetRenderer key={asset.asset_id} asset={asset} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;