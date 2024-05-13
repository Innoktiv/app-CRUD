const express = require('express');
const app = express();
const { query } = require('./db');
const PORT = 3000;

// Middleware para parsear el body en JSON
app.use(express.json());

// Ruta POST /cancion para crear una nueva canción
app.post('/cancion', async (req, res) => {
    const { titulo, artista, tono } = req.body;
    const text = 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)';
    const values = [titulo, artista, tono];
    await query(text, values);
    res.json({ message: 'Canción creada correctamente' });
});

// Ruta GET /canciones para obtener todas las canciones
app.get('/canciones', async (req, res) => {
    const text = 'SELECT * FROM canciones';
    const result = await query(text);
    res.json(result.rows);
});

// Ruta PUT /cancion/:id para editar una canción
app.put('/cancion/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, artista, tono } = req.body;
    const text = 'UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4';
    const values = [titulo, artista, tono, id];
    await query(text, values);
    res.json({ message: 'Canción actualizada correctamente' });
});

// Ruta DELETE /cancion/:id para eliminar una canción
app.delete('/cancion/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const text = 'DELETE FROM canciones WHERE id = $1';
    const values = [id];
    await query(text, values);
    res.json({ message: 'Canción eliminada correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
