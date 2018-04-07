import { MAP_INITIALIZED, } from '../constants'


const app = (state = { loading: true }, action) => {
  switch (action.type) {
    case MAP_INITIALIZED:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default app

