async function fetchNowPlaying() {
  try {
    const response = await fetch('https://haades-backend.vercel.app/now-playing'); // Use the Vercel URL
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
    console.error('Error fetching data from backend:', error);
    document.getElementById('now-playing').innerText = 'Error fetching data.';
  }
}

fetchNowPlaying();
setInterval(fetchNowPlaying, 30000);