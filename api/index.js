import { MIDDLE_ENDPOINT } from "./const"
import axiosDebugger from "./debuggerAxios"

/**
 * @typedef {Object} paramsInterface
 * @property {number[]} polygon
 * @property {string} name
 * @property {string} date - datetime
 */

export const FetchHelloWorld = async () => {
  try {

    const res = await axiosDebugger.get(MIDDLE_ENDPOINT.HELLO_WORLD)
    return res.data
    /**
    {
     "hello": "world",
     "status": 200
    }
     */
  } catch (error) {
    console.error(error)
    throw error
  }
}


export const FetchCountryArr = async (country) => {
  try {
    const res = await axiosDebugger.get(MIDDLE_ENDPOINT.COUNTRY)
    return res
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * @param {paramsInterface} payload 
 */
export const FetchBioinfo = async (payload) => {
  try {
    const res = await axiosDebugger.get(MIDDLE_ENDPOINT.BIOINFO, payload)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}


/**
 * @param {paramsInterface} payload 
 */
export const FetchBioDist = async (payload) => {
  try {
    const res = await axiosDebugger.get(MIDDLE_ENDPOINT.BIODIST, payload)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}


/**
 * @param {paramsInterface} payload 
 */
export const FetchBioTrack = async (payload) => {
  try {
    const res = await axiosDebugger.post(MIDDLE_ENDPOINT.BIOTRACK, payload)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}


/**
 * @param {paramsInterface} payload 
 */
export const FetchEcoDiv = async (payload) => {
  try {
    const res = await axiosDebugger.post(MIDDLE_ENDPOINT.ECODIV, payload)
    return res.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

