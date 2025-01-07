import React from 'react'


    const VideoAsset = ({ asset }) => (
        <div className="asset-container video-asset">
          <h3>{asset.asset_title}</h3>
          <p>{asset.asset_description}</p>
          <div className="video-wrapper">
            <iframe 
              src={asset.asset_content}
              title={asset.asset_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
  


export default VideoAsset