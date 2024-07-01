/* import 'dotenv/config' */
import db from '../database/db_connect.js'

/* SELECT para tener todos los datos de las tabla Posts */

export const getPosts = async () => {
  try {
    const result = await db('SELECT * FROM posts;')
    return result
  } catch (error) {
    throw new Error(`Error al obtener el posts: ${error.message}`)
  }
}

/* SELECT para tener todos los datos de las tabla Posts por id */

export const getPostsId = async (id) => {
  try {
    const consulta = 'SELECT * FROM posts WHERE id = $1;'
    const values = [id]
    const result = await db(consulta, values)
    return result
  } catch (error) {
    throw new Error(`Error al obtener el posts: ${error.message}`)
  }
}

/* INSERT para insertar nuevo Posts a la tabla Posts */

export const agregarPost = async ({ titulo, url, descripcion, likes = 0 }) => {
  try {
    const query = 'INSERT INTO posts ( id,titulo, img, descripcion, likes) VALUES (DEFAULT,$1,$2,$3,$4) RETURNING *'
    const values = [titulo, url, descripcion, likes]
    const { rows } = await db(query, values)
    return rows
  } catch (error) {
    console.log(error)
    throw new Error(`Error al guarda el posts: ${error.message}`)
  }
}
