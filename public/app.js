// Hacer una solicitud al servidor para obtener los Pokémon
fetch('/pokemones')
    .then(response => response.json())
    .then(pokemons => {
        const gallery = document.getElementById('gallery');

        // Generar y agregar las tarjetas de los Pokémon a la galería
        pokemons.forEach(pokemon => {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            // Crear el contenido de la tarjeta
            pokemonCard.innerHTML = `
                <img src="${pokemon.image}" alt="${pokemon.name}">
                <p>${pokemon.name}</p>
            `;

            // Agregar la tarjeta a la galería
            gallery.appendChild(pokemonCard);
        });
    })
    .catch(error => {
        console.error('Error al obtener los pokemones:', error);
        document.getElementById('error-message').style.display = 'block';
    });
