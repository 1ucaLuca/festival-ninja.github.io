async function fetchTopArtists(timeRange = 'medium_term', limit = 18) { 
    const accessToken = getAccessTokenFromUrl();

    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`, {        
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    const data = await response.json();
    return data.items;
}
 
function updateArtists() {
    const selectedTimeRange = document.querySelector('input[name="time_range"]:checked').value;
    const selectedArtistCount = document.querySelector('input[name="artist_count"]:checked').value;

    if (selectedArtistCount == 10) {
        smallLineUp(selectedTimeRange, selectedArtistCount)
    }
    if (selectedArtistCount == 18) {
        mediumLineUp(selectedTimeRange, selectedArtistCount)
    }
    if (selectedArtistCount == 30) {
        largeLineUp(selectedTimeRange, selectedArtistCount)
    }

    changeFestivalName()
}

function smallLineUp(selectedTimeRange, selectedArtistCount) {
    fetchTopArtists(selectedTimeRange, selectedArtistCount).then(artists => {
        const artistList = document.getElementById('artist-list');
        artistList.innerHTML = '';

        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';

        if (artists.length < 10) {
            noData(list)
        } else {
            addLine(`SA, 14. Juni`, 'font-date', list);
            addLine(`${artists[0].name}`, 'font-large', list);
            addLine(`${artists[2].name} • ${artists[3].name}`, 'font-medium', list);
            addLine(`${artists[6].name} • ${artists[7].name}`, 'font-small', list);

            addLine('\u{2000}', 'font-date', list)
            addLine(`SO, 15. Juni`, 'font-date', list);
            addLine(`${artists[1].name}`, 'font-large', list);
            addLine(`${artists[4].name} • ${artists[5].name}`, 'font-medium', list);
            addLine(`${artists[8].name} • ${artists[9].name}`, 'font-small', list);
        }
        
        artistList.appendChild(list);
    });
}

function mediumLineUp(selectedTimeRange, selectedArtistCount) {
    fetchTopArtists(selectedTimeRange, selectedArtistCount).then(artists => {
        const artistList = document.getElementById('artist-list');
        artistList.innerHTML = '';

        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';

        if (artists.length < 18) {
            noData(list)
        } else {
            addLine(`SA, 14. Juni`, 'font-date', list);
            addLine(`${artists[0].name} • ${artists[1].name}`, 'font-large', list);
            addLine(`${artists[4].name} • ${artists[5].name} • ${artists[6].name}`, 'font-medium', list);
            addLine(`${artists[10].name} • ${artists[11].name} • ${artists[12].name} • ${artists[13].name}`, 'font-small', list);

            addLine('\u{2000}', 'font-date', list)
            addLine(`SO, 15. Juni`, 'font-date', list);
            addLine(`${artists[2].name} • ${artists[3].name}`, 'font-large', list);
            addLine(`${artists[7].name} • ${artists[8].name} • ${artists[9].name}`, 'font-medium', list);
            addLine(`${artists[14].name} • ${artists[15].name} • ${artists[16].name} • ${artists[17].name}`, 'font-small', list);
        }

        artistList.appendChild(list);
    });
}

function largeLineUp(selectedTimeRange, selectedArtistCount) {
    fetchTopArtists(selectedTimeRange, selectedArtistCount).then(artists => {
        const artistList = document.getElementById('artist-list');
        artistList.innerHTML = '';

        const list = document.createElement('ul');
        list.style.listStyle = 'none';
        list.style.padding = '0';

        if (artists.length < 30) {
            noData(list)
        } else {
            addLine(`FR, 13. Juni`, 'font-date', list);
            addLine(`${artists[0].name}`, 'font-large', list);
            addLine(`${artists[5].name} • ${artists[6].name}`, 'font-medium', list);
            addLine(`${artists[15].name} • ${artists[16].name} • ${artists[17].name}`, 'font-small', list);

            addLine('\u{2000}', 'font-date', list)
            addLine(`SA, 14. Juni`, 'font-date', list);
            addLine(`${artists[1].name} • ${artists[2].name}`, 'font-large', list);
            addLine(`${artists[7].name} • ${artists[8].name} • ${artists[9].name} • ${artists[10].name}`, 'font-medium', list);
            addLine(`${artists[18].name} • ${artists[19].name} • ${artists[20].name} • ${artists[21].name}`, 'font-small', list);
            addLine(`${artists[22].name} • ${artists[23].name}`, 'font-small', list);

            addLine('\u{2000}', 'font-date', list)
            addLine(`SO, 15. Juni`, 'font-date', list);
            addLine(`${artists[3].name} • ${artists[4].name}`, 'font-large', list);
            addLine(`${artists[11].name} • ${artists[12].name} • ${artists[13].name} • ${artists[14].name}`, 'font-medium', list);
            addLine(`${artists[24].name} • ${artists[25].name} • ${artists[26].name} • ${artists[27].name}`, 'font-small', list);
            addLine(`${artists[28].name} • ${artists[29].name}`, 'font-small', list);
        }

        artistList.appendChild(list);
    });
}

function addLine(artist, className, list) {
    const listItem = document.createElement('li');
    listItem.textContent = artist;
    listItem.classList.add(className);
    list.appendChild(listItem);
}

function noData(list) {
    addLine('\u{2000}', 'font-date', list)
    addLine('Es stehen nicht genügend Daten zur Verfügung.', 'font-large', list)
    addLine('Passe ggf. deine Einstellungen an', 'font-medium', list)

}

function changeFestivalName() {
    var input = document.getElementById('festival-name-input').value;
    var festivalDiv = document.getElementById('festival-name');

    if (input.trim() !== "") {
        festivalDiv.textContent = input;
    }
}

function downloadImage() {
    html2canvas(document.getElementById('download-img')).then(canvas => {
        let link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'my-festival.png';
        link.click();
    });
}



