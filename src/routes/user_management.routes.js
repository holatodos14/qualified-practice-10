import { Router } from 'express'
import { deleteByID, getALL, getUser, editUser, createUser, totalUpdate }
  from '../controller.js'

const router = Router()

router.get('/', getALL)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteByID)
router.put('/:id', totalUpdate)
router.patch('/:id', editUser)

export default router
