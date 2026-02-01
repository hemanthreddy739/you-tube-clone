import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch related videos and create channel detail from author info
        const videosData = await fetchFromAPI(`search?query=channel`);
        console.log('Channel search results:', videosData);
        
        // Extract videos and try to find channel info from first video
        const videoItems = videosData.contents?.filter(item => item.type === 'video').map(item => item.video) || [];
        
        // Try to find a video from this channel
        const channelVideo = videoItems.find(v => v.author?.channelId === id);
        
        if (channelVideo) {
          setChannelDetail({
            channel_id: id,
            title: channelVideo.author.title,
            thumbnail_url: channelVideo.author.avatar?.[0]?.url || 'https://via.placeholder.com/200',
            subscribers: 'N/A'
          });
        } else {
          setChannelDetail({
            channel_id: id,
            title: 'Channel',
            thumbnail_url: 'https://via.placeholder.com/200',
            subscribers: 'N/A'
          });
        }
        
        setVideos(videoItems);
      } catch (error) {
        console.error('Channel detail error:', error);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
