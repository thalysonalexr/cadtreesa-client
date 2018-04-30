// services for trees
import Auth from './auth'
import HTTP from './http-common'

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Auth.getToken()}`
  }
}

/**
 * Create tree
 *
 * @param {Object} tree
 * @param {string} tree.name
 * @param {string} tree.specie
 * @param {string} tree.family
 * @param {string} tree.cap
 * @param {string} tree.height
 * @param {string} tree.classcup
 * @param {string} tree.sanity
 * @param {string} tree.growth
 * @param {string} tree.sociological
 * @param {string} tree.utilization
 * @param {string} tree.features
 * @param {string} tree.image
 * @param {string} tree.latitude
 * @param {string} tree.longitude
 *
 * @returns Promisse
 */
export const create = (tree) => HTTP.post('trees', JSON.stringify(tree), config)

/**
 * List all trees
 *
 * @param {Object} query
 * @param {string} query.order
 * @param {integer} query.limit
 * @param {integer} query.offset
 *
 * @returns Promisse
 */
export const listAll = (pagination) => HTTP.get(`trees${pagination}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * Get metadata in entity trees
 *
 * @returns Promisse
 */
export const info = () => HTTP.head('trees/info', { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
