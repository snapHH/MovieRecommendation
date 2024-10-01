// Function to search movies based on the input query
function searchMovies() {
    const query = document.getElementById('search-input').value; // Get search input value
    if (query.trim()) {
        fetchMovies(query); // Call fetchMovies with search query
    } else {
        alert('Please enter a movie name to search'); // Alert if input is empty
    }
}

// Function to fetch movies, either popular or based on the search query
async function fetchMovies(query = '') {
    try {
        const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
        const movies = await response.json();
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Function to dynamically display movies in the container
function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; // Clear previous movie results

    if (movies.length === 0) {
        container.innerHTML = '<p>No movies found for your search query.</p>'; // Handle empty results
        return;
    }

    movies.forEach(movie => {
        // Create movie container
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        // Create movie poster element
        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        poster.alt = movie.title;
        movieDiv.appendChild(poster);

        // Create movie details container
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        detailsDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>${movie.overview ? movie.overview.substring(0, 100) + '...' : 'No overview available'}</p>
        `;
        movieDiv.appendChild(detailsDiv);

        // Append the movie div to the main container
        container.appendChild(movieDiv);
    });
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    searchMovies(); // Call searchMovies when button is clicked
});

// Allow search functionality with Enter key
document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMovies(); // Call searchMovies when Enter key is pressed
    }
});

// Initial fetch of popular movies when the page loads
window.onload = function() {
    fetchMovies(); // Fetch popular movies when the page loads
};
