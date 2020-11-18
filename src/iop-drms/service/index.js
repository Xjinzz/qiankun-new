import openCatalogService from './server/open-catalog'
import openObjectService from './server/open-object'
import openService from './server/open-service'
import authService from './server/auth'
import catalogService from './server/catalog'
import objectService from './server/object'

export {
  openCatalogService as iopDrmsOpenCatalogService,
  openObjectService as iopDrmsOpenObjectService,
  openService as iopDrmsOpenService,
  authService as iopDrmsAuthService,
  catalogService as iopDrmsCatalogService,
  objectService as iopDrmsObjectService
}
