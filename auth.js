const client_id = '80b1d43ee96d4cae952761ebb9762598';
const redirect_uri = 'https://festival.ninja/results.html';
const scope = 'user-top-read';

function loginWithSpotify() {

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    window.location.href = url;
}

function getAccessTokenFromUrl() {
    const hash = window.location.hash;
    if (hash) {
        const token = new URLSearchParams(hash.substring(1)).get('access_token');
        return token;
    }
    return null;
}