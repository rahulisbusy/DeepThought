import { useState } from "react";

const ArticleAsset = ({ asset }) => {
    const [content, setContent] = useState('');
    const [wordCount, setWordCount] = useState(0);
  
    const handleContentChange = (e) => {
      const newContent = e.target.value;
      setContent(newContent);
      setWordCount(newContent.trim().split(/\s+/).filter(word => word.length > 0).length);
    };
  
    return (
      <div className="asset-container article-asset">
        <h3>{asset.asset_title}</h3>
        <p>{asset.asset_description}</p>
        <div className="article-editor">
          <textarea 
            placeholder="Write your article here..." 
            value={content}
            onChange={handleContentChange}
            className="article-textarea"
          />
          <div className="article-controls">
            <span>Word count: {wordCount}/500</span>
            <button className="publish-btn">Publish</button>
          </div>
        </div>
      </div>
    );
  };
  export default ArticleAsset;
  