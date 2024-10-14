const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

app.get('/pokemones', async (req, res) => {
    try {
        const pokemons = [];
        const promises = [];

        // Hacer 150 solicitudes a los endpoints de la pokeAPI
        for (let i = 1; i <= 150; i++) {
            promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(response => response.json()));
        }

        const results = await Promise.all(promises);

        results.forEach(pokemon => {
            pokemons.push({
                name: pokemon.name,
                image: pokemon.sprites.front_default
            });
        });

        res.json(pokemons);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pokemones', error });
    }
});

// Ruta por defecto para servir index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


// moostranding 


