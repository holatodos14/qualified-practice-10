import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const newName = Date.now() + '-' + file.originalname
    cb(null, newName)
  }
})
const filterImage = (req, file, cb) => {
  const { mimetype } = file
  const allows = ['image/png', 'image/jpeg']
  if (allows.includes(mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only acceptable image types'), false)
  }
}
export const uploadImages = multer({ storage, fileFilter: filterImage })
