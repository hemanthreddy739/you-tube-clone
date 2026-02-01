import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if(!videos?.length) return <Loader />;
  
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => {
        // Handle both old API format (has id.videoId) and new API format (has videoId directly)
        const isVideo = item?.videoId || item?.id?.videoId;
        const isChannel = item?.author?.channelId || item?.id?.channelId;
        
        return (
          <Box key={idx}>
            {isVideo && <VideoCard video={item} /> }
            {isChannel && !isVideo && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
}

export default Videos;
