import { useState } from "react";



const FourSAAsset = ({ asset }) => {
    const [saData, setSaData] = useState({
      situation: '',
      strategy: '',
      solution: '',
      success: ''
    });
  
    const handleInputChange = (field, value) => {
      setSaData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    return (
      <div className="asset-container foursa-asset">
        <h3>{asset.asset_title}</h3>
        <p>{asset.asset_description}</p>
        <div className="foursa-container">
          <div className="sa-section">
            <h4>Situation</h4>
            <textarea
              placeholder="Describe the situation..."
              value={saData.situation}
              onChange={(e) => handleInputChange('situation', e.target.value)}
              className="sa-textarea"
            />
          </div>
          <div className="sa-section">
            <h4>Strategy</h4>
            <textarea
              placeholder="Describe your strategy..."
              value={saData.strategy}
              onChange={(e) => handleInputChange('strategy', e.target.value)}
              className="sa-textarea"
            />
          </div>
          <div className="sa-section">
            <h4>Solution</h4>
            <textarea
              placeholder="Describe your solution..."
              value={saData.solution}
              onChange={(e) => handleInputChange('solution', e.target.value)}
              className="sa-textarea"
            />
          </div>
          <div className="sa-section">
            <h4>Success</h4>
            <textarea
              placeholder="Describe the success metrics..."
              value={saData.success}
              onChange={(e) => handleInputChange('success', e.target.value)}
              className="sa-textarea"
            />
          </div>
          <button className="submit-btn">Submit 4SA Analysis</button>
        </div>
      </div>
    );
  };
  export default FourSAAsset;
  