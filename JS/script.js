// script.js
const USERNAME = 'koltontheshek';
const API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json`;

async function fetchNowPlaying() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
      const nowPlaying = data.recenttracks.track[0];
      const isNowPlaying = nowPlaying['@attr'] && nowPlaying['@attr'].nowplaying;

      if (isNowPlaying) {
        const artist = nowPlaying.artist['#text'];
        const track = nowPlaying.name;
        document.getElementById('now-playing').innerText = `Now Playing: ${track} by ${artist}`;
      } else {
        document.getElementById('now-playing').innerText = 'Not currently playing anything.';
      }
    } else {
      document.getElementById('now-playing').innerText = 'No recent tracks found.';
    }
  } catch (error) {
    console.error('Error fetching data from Last.fm:', error);
    document.getElementById('now-playing').innerText = 'Error fetching data.';
  }
}

// Refresh that thang every 30 sexconds
fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);