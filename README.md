Repo created to learn more about Adaptive Video Streaming with HLS (HTTP Live Streaming)

Convert MP4 video file to HLS with ffmpeg
```
ffmpeg -i input_video.mp4 \
  -codec: copy \
  -hls_time 10 \
  -hls_list_size 0 \
  -f hls \
  filename.m3u8
```