/* eslint-disable camelcase */
import { pool } from './config/db.js'

export const getALL = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT * FROM users')
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteByID = async (req, res) => {
  const { id } = req.params
  const [result] = await pool.execute('DELETE FROM users WHERE id =?', [id])

  if (result.affectedRows === 1) {
    return res.json({ message: 'User deleted' })
  }
  return res.status(500).json({ message: 'Could not delete user' })
}

export const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body
    const profilePicture = req.file ? req.file.filename : null
    if (!name || !email || !role || !profilePicture) return res.status(404).json({ message: 'Missing data required' })

    const [result] = await pool.execute(
      'INSERT INTO users(name, email, password, role, profile_picture) VALUES (?,?,?,?,?)',
      [name, email, role, profilePicture]
    )
    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'There was a mistake creating the artist' })
    }
    res.status(201).json({ message: 'User saved' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', details: error.message })
  }
}

export const totalUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, role } = req.body
    const profilePicture = req.file ? req.file.filename : null

    if (!name || !email || !role || !profilePicture) return res.status(404).json({ message: 'Missing data required' })

    const [result] = await pool.execute(
      'INSERT INTO users(name, email, password, role, profile_picture) VALUES (?,?,?,?,?)',
      [name, email, role, profilePicture, id]
    )
    if (result.affectedRows !== 1 && !result.insertId) {
      return res.status(500).json({ message: 'There was a mistake creating the artist' })
    }
    res.status(201).json({ message: 'User saved' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', details: error.message })
  }
}

export const editUser = async (req, res) => {
  const { id } = req.params
  const updates = req.body
  const profilePicture = req.file ? req.file.filename : null

  try {
    let query = 'UPDATE users SET '
    const params = []
    const setStatements = []

    if (updates.name) {
      setStatements.push('name = ?')
      params.push(updates.name)
    }
    if (updates.email) {
      setStatements.push('email = ?')
      params.push(updates.email)
    }
    if (updates.role) {
      setStatements.push('role = ?')
      params.push(updates.role)
    }
    if (profilePicture) {
      setStatements.push('profile_picture = ?')
      params.push(profilePicture)
    }

    if (setStatements.length === 0) {
      return res.status(400).json({ message: 'No fields to update' })
    }

    query += setStatements.join(', ') + ' WHERE id = ?'
    params.push(id)

    const result = await pool.query(query, params)

    if (result.affectedRows > 0) {
      const [updatedUser] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
      res.json(updatedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Error', details: error.message })
  }
}
