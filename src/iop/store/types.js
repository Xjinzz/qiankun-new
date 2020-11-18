import USER_TYPES from './auth/user/types'

const USER_NAMESPACE = 'iop/auth/user/'
const USER_MUTATION = USER_TYPES.MUTATION
const USER_GETTER = USER_TYPES.GETTER

const IOP_MUTATION = {}
for (const name of Object.keys(USER_MUTATION)) {
  IOP_MUTATION[name] = `${USER_NAMESPACE}${USER_MUTATION[name]}`
}

const IOP_GETTER = {}
for (const name of Object.keys(USER_GETTER)) {
  IOP_GETTER[name] = `${USER_NAMESPACE}${USER_GETTER[name]}`
}

export { IOP_MUTATION, IOP_GETTER }
