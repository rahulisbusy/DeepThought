import { useState, } from "react";

const ThreadbuilderAsset = ({ asset }) => {
    const [threads, setThreads] = useState([{ title: '', summary: '' }]);
  
    const addThread = () => {
      setThreads([...threads, { title: '', summary: '' }]);
    };
  
    const handleThreadChange = (index, field, value) => {
      const newThreads = [...threads];
      newThreads[index] = {
        ...newThreads[index],
        [field]: value
      };
      setThreads(newThreads);
    };
  
    return (
      <div className="asset-container threadbuilder-asset">
        <h3>{asset.asset_title}</h3>
        <p>{asset.asset_description}</p>
        <div className="threads-container">
          {threads.map((thread, index) => (
            <div key={index} className="thread-input-group">
              <input 
                type="text" 
                placeholder="Sub Thread Title" 
                value={thread.title}
                onChange={(e) => handleThreadChange(index, 'title', e.target.value)}
                className="thread-input"
              />
              <textarea 
                placeholder="Sub Thread Summary" 
                value={thread.summary}
                onChange={(e) => handleThreadChange(index, 'summary', e.target.value)}
                className="thread-textarea"
              />
            </div>
          ))}
          <button className="add-thread-btn" onClick={addThread}>
            + Add Thread
          </button>
        </div>
      </div>
    );
  };
export default ThreadbuilderAsset;  