import { v4 as uuidv4 } from 'uuid'

function generateGUID() {
  return uuidv4()
}

export default {
  generateGUID,
}
