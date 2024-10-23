---
layout: post
title: "Download protected video streams"
tags: AI ChatGPT ClaudeAI ffmpeg m3u8
image: /assets/img/daniel.webp
---

Driven by my passion for enhancing the developer experience, I am here to guide you through using an AI assistant to craft a Bash script capable of downloading protected video streams. I favor simplicity and prefer to avoid installing a unique app for every task. As a developer, maintaining control over my tools, automating repetitive tasks, and minimizing dependencies to ensure a clean, secure system are my top priorities.

In this guide, I will demonstrate how to utilize AI (specifically, ClaudeAI) to create a Bash script that downloads videos protected by obfuscating the video stream through an m3u8[^1] playlist. While such streams aren't directly downloadable, they can be accessed using tools like [ffmpeg][ffmpeg][^2].

With just about 10 minutes spent, I developed and tested a video downloader script using AI assistants, efficiently applying it to a sample video stream. I began with [ClaudeAI][ClaudeAI], posing this query:

<tt>
Please write a Bash script that downloads a video given a link pointing to an m3u8 file. The m3u8 file may contain
links to video files, segments, or nested m3u8 files. The output should consolidate into a single video stream file. Utilize the ffmpeg library if possible.
</tt>

The generated script ran perfectly for an m3u8 file with links to video stream parts. It was quite verbose, printing each stream part to the console, so I asked ClaudeAI to adjust it to show progress instead. As my free ClaudeAI credits ran out, I switched to [ChatGPT][ChatGPT].

<tt>
Modify the console/terminal output of the following video stream downloader to display progress as a percentage. Ideally, the total content length should be known in advance, otherwise, a spinning ASCII progress indicator should be used.<br>
<br>
(script omitted)
</tt>

The script functioned as expected until it encountered the second m3u8 file. An error message appeared, prompting me to ask ChatGPT to resolve this issue.

<tt>
The percentage display works, but on loading the next part, this error appears, and the script stops:<br>
<br>
line 95: (00 * 3600) + (02 * 60) + 08: value too great for base (error token is "08")
</tt>

ChatGPT resolved the issue by prefixing each time component with `10#` within the arithmetic evaluation, ensuring Bash treats them as base-10 numbers, mitigating any octal misinterpretation.

Finally, the script ran smoothly, complete with a satisfying progress indicator. I could download video streams and view them offline without requiring additional software, aside from ffmpeg. I took additional time to refine the script using [Shellcheck][Shellcheck] and added some manual improvements. A potential enhancement could be to automatically obtain the m3u8 URL using a separate script that extracts it from a media library URL's DOM.

Below is the complete `video-downloader.sh` script[^4].

```bash
#!/bin/bash

# --------------------------------------------------------
#  Copyright (c) 2024 Daniel Dietrich, licensed under MIT
# --------------------------------------------------------

# Function to display usage instructions
usage() {
  echo "Usage: $0 [-y] <m3u8_url> <output_filename>"
  echo "  -y   Overwrite existing output files without prompt."
  echo "Example: $0 \"https://example.com/stream.m3u8\" \"output.mp4\""
  exit 1
}

# Function to check if required commands are available
check_requirements() {
  local missing_requirements=0
  if ! command -v ffmpeg >/dev/null 2>&1; then
    echo "Error: ffmpeg is not installed. Please install it first."
    missing_requirements=1
  fi
  if ! command -v ffprobe >/dev/null 2>&1; then
    echo "Error: ffprobe is not installed. Please install it first."
    missing_requirements=1
  fi
  if ! command -v curl >/dev/null 2>&1; then
    echo "Error: curl is not installed. Please install it first."
    missing_requirements=1
  fi
  if [ $missing_requirements -eq 1 ]; then
    exit 1
  fi
}

# Function to validate URL
validate_url() {
  local url=$1
  if ! curl --output /dev/null --silent --head --fail "$url"; then
    echo "Error: Invalid URL or resource not accessible: $url"
    exit 1
  fi
}

# Function to determine total content length using ffprobe
get_content_length() {
  local url=$1
  local duration
  duration=$(ffprobe -i "$url" -show_entries format=duration -v quiet -of csv="p=0")
  echo "$duration"
}

# Function to get format name and long name using ffprobe
get_format() {
  local url=$1
  local format_info
  format_info=$(ffprobe -i "$url" -show_entries format=format_name,format_long_name -v quiet -of csv="p=0")

  # Transform the output into "<name> (<long_name>)"
  echo "$format_info" | awk -F, '{print $1 " (" $2 ")"}'
}

get_video_resolution() {
  local file=$1
  local resolution
  resolution=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$file")
  echo "$resolution"
}

# Function to display spinner
spinner() {
  local pid=$1
  local delay=0.1
  local spinstr="|/-\\"
  while ps a | awk '{print $1}' | grep -q "$pid"; do
    local temp=${spinstr#?}
    printf " [%c] " "$spinstr"
    spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
}

# Function to download and process the m3u8 stream
download_stream() {
  local url=$1
  local output=$2
  echo "Starting download of: $url"
  echo "Format: $(get_format "$url")"
  echo "Output will be saved as: $output"

  # Get the total duration of the stream
  local total_duration
  total_duration=$(get_content_length "$url")
  total_duration=${total_duration%.*} # Remove any decimal part
  if [[ ! "$total_duration" =~ ^[0-9]+$ ]]; then
    echo "Content length not determinable."
    ffmpeg -i "$url" \
      -c copy \
      -bsf:a aac_adtstoasc \
      -movflags +faststart \
      -y \
      "$output" >/dev/null 2>&1 &
    spinner $!
  else
    # Convert total duration to HH:MM:SS format
    printf -v formatted_duration '%02d:%02d:%02d' "$(echo "$total_duration/3600" | bc)" "$(echo "$total_duration%3600/60" | bc)" "$(echo "$total_duration%60" | bc)"
    echo "Content length determined: $formatted_duration"
    ffmpeg -i "$url" \
      -c copy \
      -bsf:a aac_adtstoasc \
      -movflags +faststart \
      -y \
      "$output" 2>&1 | while read -r line; do
      if [[ "$line" =~ time=([0-9]+):([0-9]+):([0-9]+) ]]; then
        hours=${BASH_REMATCH[1]}
        minutes=${BASH_REMATCH[2]}
        seconds=${BASH_REMATCH[3]}
        # Remove leading zeros by using arithmetic evaluation
        current_duration=$((10#$hours * 3600 + 10#$minutes * 60 + 10#$seconds))
        if [ "$total_duration" -ne 0 ]; then
          progress=$(awk "BEGIN {printf \"%.2f\", ($current_duration / $total_duration) * 100}")
          echo -ne "Progress: $progress% \r"
        fi
      fi
    done
  fi

  if [ "${PIPESTATUS[0]}" -eq 0 ]; then
    echo "Download completed successfully!"
    echo "File saved in $(get_video_resolution "$output") as: $output"
  else
    echo "Error: Download failed!"
    rm -f "$output"
    exit 1
  fi
}

# Main script execution starts here

# Check if correct number of arguments provided
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
  usage
fi

# Initialize variables
FORCE_OVERWRITE=0

# Parse command line options
while getopts ":y" opt; do
  case ${opt} in
  y)
    FORCE_OVERWRITE=1
    ;;
  \?)
    usage
    ;;
  esac
done
shift $((OPTIND - 1))

# Get command line arguments
M3U8_URL=$1
OUTPUT_FILE=$2

# Check if output file already exists
if [ "$FORCE_OVERWRITE" -eq 0 ] && [ -f "$OUTPUT_FILE" ]; then
  read -p "File $OUTPUT_FILE already exists. Overwrite? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Operation cancelled."
    exit 1
  fi
fi

# Check for required commands
check_requirements

# Validate URL
validate_url "$M3U8_URL"

# Start download
download_stream "$M3U8_URL" "$OUTPUT_FILE"
```

Indeed, writing this script served as a kata exercise for me. Regularly utilizing AI to generate and refine code enhances my development workflow and sparks various new ideas. I'm eager to see where this journey leads next.

I hope this post was beneficial, and you found it enjoyable. For any questions or feedback, feel free to follow the links below to engage with me.

Thanks for reading, and have a splendid day!<br>
Daniel

P.S. Stay tuned for my next journal post, possibly about the stunning country of Portugal, inspired by a recent German [documentary][documentary][^3] I watched on the ZDF media library.

[^1]: m3u8 is a multimedia playlist file format utilized for serving audio and video content online. You can obtain the m3u8 URL by playing the video in a web browser, opening developer tools with ⌥ ⌘ I on macOS, navigating to Network, and filtering for m3u8.
[^2]: [ffmpeg][ffmpeg] is an open-source project offering a comprehensive suite of libraries and programs for handling video, audio, and other multimedia files and streams. Installable on macOS via [Homebrew][Homebrew] `brew install ffmpeg` or on Ubuntu with `sudo apt install ffmpeg`.
[^3]: The documentary on Portugal is available on the ZDF media library until 15.12.2025.
[^4]: The script may require execution permissions, which can be set using `chmod +x video-downloader.sh`.

[ChatGPT]: https://chatgpt.com
[ClaudeAI]: https://claudeai.com/
[documentary]: https://www.zdf.de/dokumentation/abenteuer-auswandern/portugal-auswandern-reisen-surfen-bauernhof-100.html
[ffmpeg]: https://ffmpeg.org/
[Homebrew]: https://brew.sh/
[Shellcheck]: https://www.shellcheck.net
