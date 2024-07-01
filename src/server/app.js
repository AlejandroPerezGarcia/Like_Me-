import express from 'express'
import cors from 'cors'
import { getPosts, agregarPost, getPostsId } from '../server/utils/consultas.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

/* Pagina Index inicial Like me */

app.get('/', (req, res) => {
  res.status(200).send('Api Like Me')
})

/* Muestra listado Like me en pantalla */

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts()
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send(error)
  }
})

/* Get Put recupera una cancion por ID */

app.get('/posts/:id', async (req, res) => {
  try {
    const posts = await getPostsId(req.params.id)
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send(error)
  }
})

/* Agrega un nuevo Like me */

app.post('/posts', async (req, res) => {
  try {
    await agregarPost(req.body)
    res.status(201).send('Post creado con exito')
  } catch (error) {
    res.status(400).send(error)
  }
})

app.delete('/', (req, res) => { })

/* Muestra el error cuando no se encuentra la Pagina Web */

app.all('*', (req, res) => res.status(404).json({ status: false, message: 'Page no found' }))

app.listen(PORT, () => console.log(`Server UP! ${PORT}`))

export default app
