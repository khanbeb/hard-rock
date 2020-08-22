    // Lyrics Search

document.getElementById('search-btn').addEventListener('click', function() {
    const songName = document.getElementById('song-name').value.trim()
    document.getElementById('songs-list').innerHTML = '';
    document.getElementById('songs-list').style.display = 'block';


        // Song Name

fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => {
        const apiData = data.data
    for (let i = 0; i < 10; i++) {
        const element = apiData[i];

        // Song details
        const songTitle = element.title
        const albumTitle = element.album.title
        const albumPhoto = element.album.cover_medium
        const artistName = element.artist.name

        let showList = document.createElement('div');
        showList.className = 'single-result row align-items-center my-3 p-3'
        showList.innerHTML = 
        `<div class="col-md-3">
        <img src="${albumPhoto}" alt=""> 
        </div>
        <div class="col-md-6">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album by <span>${albumTitle}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick="songLyrics('${artistName}', '${songTitle}')"  class="btn btn-success">Get Lyrics</button>
        </div>`
        document.getElementById('songs-list').appendChild(showList);
    }   


    })
});
    function songLyrics(artist, title) {    
        fetch(`https://api.lyrics.ovh//v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            if (data.error){
                alert('This song lyrics is not available in our system 😔')
            }
            else{
                document.getElementById('show-lyrics').innerHTML = '';
                document.getElementById('show-lyrics').innerHTML = `<div class="single-lyrics text-center">
                <button class="btn go-back" onclick="returnBtn()">Return</button>
                <h2 class="text-success mb-4">${artist} - ${title}</h2>
                <pre id="song-lyrics" class="lyric text-white">${data.lyrics}</pre>`;
                document.getElementById('show-lyrics').style.display = 'block';
                document.getElementById('songs-list').style.display = 'none';
            }
            })
        }

        // Return Button

        function returnBtn() {
            document.getElementById('songs-list').style.display = 'block';
            document.getElementById('show-lyrics').style.display = 'none';
            document.getElementById('song-name-input').value = ''
        };