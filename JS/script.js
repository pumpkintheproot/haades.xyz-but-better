const apiKey = '6375d13681d6474eb3c16b71423a00f5'; // Replace with your Last.fm API key
const username = 'koltontheshek'; // Replace with your Last.fm username
const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;

async function fetchNowPlaying() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
      const nowPlaying = data.recenttracks.track[0];
      const isNowPlaying = nowPlaying['@attr'] && nowPlaying['@attr'].nowplaying;

      if (isNowPlaying) {
        console.log(`Now Playing: ${nowPlaying.artist['#text']} - ${nowPlaying.name}`);
      } else {
        console.log('No track is currently playing.');
      }
    } else {
      console.log('No recent tracks found.');
    }
  } catch (error) {
    console.error('Error fetching data from Last.fm:', error);
  }
}

// Call the function to fetch and display the currently playing track
fetchNowPlaying();