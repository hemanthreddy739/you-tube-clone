import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video }) => {
  // Handle both old API (youtube-v2) and new API (youtube138) formats
  const videoId = video?.videoId || video?.video_id || video?.id?.videoId;
  
  // New API has thumbnails array with objects, old has nested structure
  const thumbnail = (video?.thumbnails && video?.thumbnails[1]?.url) || 
                   (video?.thumbnails && video?.thumbnails[0]?.url) ||
                   video?.snippet?.thumbnails?.high?.url;
  
  const title = video?.title || video?.snippet?.title;
  
  // New API: author is an object with title, old API: nested in snippet
  const channelId = video?.author?.channelId || video?.snippet?.channelId;
  const channelTitle = video?.author?.title || video?.author || video?.snippet?.channelTitle;

  return (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
        <CardMedia image={thumbnail || demoThumbnailUrl} alt={title} 
          sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} 
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {title ? title.slice(0, 60) : demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl} >
          <Typography variant="subtitle2" color="gray">
            {channelTitle || demoChannelTitle}
            <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard