// services for users
import Auth from './auth'
import HTTP from './http-common'

/**
 * Login of user
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 *
 * @returns Promisse
 */
export const login = (user) => HTTP.post('users/login', JSON.stringify(user))

/**
 * Logout of user
 *
 * @returns Promisse
 */
export const logout = () => HTTP.post('users/logout', {}, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * Logout of user
 *
 * @returns Promisse
 */
export const timeout = (id) => HTTP.post('users/timeout', JSON.stringify({ id }))

/**
 * Init process for recuperation password | step 1
 *
 * @param {string} email
 *
 * @returns Promisse
 */
export const forgotPassword = (email) => {
  let url = window.location.origin
  return HTTP.post('users/forgot_password', JSON.stringify({ email, url }))
}

/**
 * Continue process for recuperation password | step 2
 *
 * @param {string} password
 *
 * @returns Promisse
 */
export const changePassword = (password, token) => HTTP.post(`users/change_password?token=${token}`, JSON.stringify({ password }))

/**
 * Check password
 *
 * @param {string} password
 *
 * @returns Promisse
 */
export const checkPass = (password) => HTTP.post('users/check_pass', JSON.stringify({ password }), { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * Create user
 *
 * @param {Object} user
 * @param {string} user.name
 * @param {string} user.rgacpf
 * @param {string} user.email
 * @param {string} user.password
 *
 * @returns Promisse
 */
export const create = (user) => HTTP.post('users', JSON.stringify(user))

/**
 * List all users
 *
 * @param {Object} query
 * @param {string} query.order
 * @param {integer} query.limit
 * @param {integer} query.offset
 *
 * @returns Promisse
 */
export const listAll = (pagination) => HTTP.get(`users${pagination}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * List user by identified
 *
 * @param {integer} id
 *
 * @returns Promisse
 */
export const list = (id) => HTTP.get(`users/${id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * Edit info of user
 *
 * @param {integer} id
 * @param {Object} user
 * @param {string} user.name
 * @param {string} user.rgacpf
 * @param {string} user.email
 * @param {string} user.password
 *
 * @returns Promisse
 */
export const edit = (id, user) => HTTP.put(`users/${id}`, JSON.stringify(user), { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * Delete user info
 *
 * @param {integer} id
 *
 * @returns Promisse
 */
export const exclude = (id) => HTTP.delete(`users/${id}`, { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })

/**
 * Get metadata in entity users
 *
 * @returns Promisse
 */
export const info = () => HTTP.head('users/info', { headers: { 'Authorization': `Bearer ${Auth.getToken()}` } })
