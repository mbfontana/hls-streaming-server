import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import path from "path";
import fs from "fs";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

export const transcodeToHLS = async (inputFile: string, outputDir: string) => {
  return new Promise<void>((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPlaylist = path.join(outputDir, "output.m3u8");

    ffmpeg(inputFile)
      .outputOptions([
        "-codec: copy", // Copy codec without re-encoding
        "-start_number 0", // Start segment numbering from 0
        "-hls_time 10", // Segment duration (10 seconds)
        "-hls_list_size 0", // Include all segments in the playlist
        "-f hls", // Set format to HLS
      ])
      .output(outputPlaylist)
      .on("end", () => {
        console.log("Transcoding complete:", outputPlaylist);
        resolve();
      })
      .on("error", (err: { message: string }) => {
        console.error("Error during transcoding:", err.message);
        reject(err);
      })
      .run();
  });
};
