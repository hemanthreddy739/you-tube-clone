import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Initialize with basic video data to avoid loading screen
    // This allows the player to start immediately
    setVideoDetail({ 
      videoId: id,
      title: 'Loading video...',
      author: { title: 'Channel' }
    });
    setVideos([]);

    // Fetch recommendations/related videos
    fetchFromAPI(`search?query=javascript`)
      .then((data) => {
        console.log('Recommendations:', data);
        const videoItems = data.contents?.filter(item => item.type === 'video').map(item => item.video) || [];
        setVideos(videoItems);
      })
      .catch((error) => console.error('Recommendations error:', error))
  }, [id]);

  // Don't wait for data to load, render immediately with whatever we have
  if(!videoDetail) return <Loader />;

  const { 
    title = 'Video',
    author = {},
    stats = {},
    publishedTimeText = ''
  } = videoDetail;

  const channelTitle = author.title || 'Channel';
  const channelId = author.channelId || '';
  const viewCount = stats.views || 0;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={channelId ? `/channel/${channelId}` : '#'}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {publishedTimeText || ''}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
