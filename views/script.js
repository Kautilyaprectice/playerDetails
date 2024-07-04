document.addEventListener('DOMContentLoaded', function() {
    const playerForm = document.getElementById('playerForm');
    const searchForm = document.getElementById('searchForm');
    const playerDetails = document.getElementById('playerDetails');

    let currentPlayerId = null;

    playerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const playerData = {
            name: document.getElementById('name').value,
            dob: document.getElementById('dob').value,
            photoUrl: document.getElementById('photoUrl').value,
            birthPlace: document.getElementById('birthPlace').value,
            noOfMatches: document.getElementById('noOfMatches').value,
            score: document.getElementById('score').value,
            fifties: document.getElementById('fifties').value,
            hundreds: document.getElementById('hundreds').value,
            wicket: document.getElementById('wicket').value,
            average: document.getElementById('average').value
        };

        if(currentPlayerId){
            axios.put(`http://localhost:3000/player/${currentPlayerId}`, playerData)
                .then(res => {
                    playerForm.reset();
                    console.log(res);
                    currentPlayerId = null;
                    playerDetails.innerHTML = '';
                })
                .catch(err => console.error(err));
        }
        else{

            axios.post('http://localhost:3000/player', playerData)
            .then(res => {
                playerForm.reset();
                console.log(res);
            })
            .catch(err => console.error(err));
        }
    });

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const playerName = document.getElementById('search').value;

        axios.get(`http://localhost:3000/player/${playerName}`)
            .then(res => {
                const player = res.data[0];

                if(player){
                    currentPlayerId = player.id;

                    playerDetails.innerHTML = `
                    <h2>Player Details</h2>
                    <p>Name: ${player.name}</p>
                    <p>DOB: ${player.dob}</p>
                    <p><img src="${player.photoUrl}" alt="Player Photo"</p>
                    <p>Birth Place: ${player.birthPlace}</p>
                    <p>No Of Matches: ${player.noOfMatches}</p>
                    <p>Score: ${player.score}</p>
                    <p>Fifties: ${player.fifties}</p>
                    <p>Hundreds: ${player.hundreds}</p>
                    <p>Wicket: ${player.wicket}</p>
                    <p>Average: ${player.average}</p>
                    <button id="editButton">Edit</button>
                    <button id="deleteButton">Delete</button>`;

                    document.getElementById('editButton').addEventListener('click', () => {
                        editPlayer(player)
                    });

                    document.getElementById('deleteButton').addEventListener('click', () => {
                        deletePlayer(player.id);
                    });
                }
                else{
                    playerDetails.innerHTML = `<p>Player not found!</p>`;
                }
            })
            .catch(err => {
                console.error('There was an error', err);
                playerDetails.innerHTML = `<p>Player Not Found!!</p>`
            });
    });

    function editPlayer(player){
        document.getElementById('name').value = player.name;
        document.getElementById('dob').value = player.dob;
        document.getElementById('photoUrl').value = player.photoUrl;
        document.getElementById('birthPlace').value = player.birthPlace;
        document.getElementById('noOfMatches').value = player.noOfMatches;
        document.getElementById('score').value = player.score;
        document.getElementById('fifties').value = player.fifties;
        document.getElementById('hundreds').value = player.hundreds;
        document.getElementById('wicket').value = player.wicket;
        document.getElementById('average').value = player.average;

    };

    function deletePlayer(playerId){
        axios.delete(`http://localhost:3000/player/${playerId}`)
            .then(() => {
                console.log('Player Deleted');
                playerDetails.innerHTML = '';
                currentPlayerId = null;
            })
            .catch(err => console.error(err));
    };

});