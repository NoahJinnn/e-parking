import HttpError from 'http-errors'
import { DEVICE_TYPE, DEFAULT_LOCATION } from '@const/index'
import { createDevice } from '../database/device'
import { getDebugService } from './debug.util'

const logger = getDebugService()

/**
 * Not allow to send master the first time device register with the system
 */
export const registerDeviceHelper = async (registerInstance): Promise<IDevice> => {
  const PrefixFn = 'registerDeviceHelper'

  let {
    id,
    caseUUID,
    macAddress,
    ipAddress,
    deviceName,
    deviceType,
    note,
    isActive,
    isOnline,
    balenaUUID,
    publicIpAddress,
    longitude,
    latitude,
    customLongitude,
    customLatitude
  } = registerInstance

  let deviceInstance: IDevice // Save Device Instance

  try {
    deviceInstance = {
      id: id || balenaUUID || null,
      caseUUID: caseUUID || null,
      macAddress: macAddress || null,
      ipAddress: ipAddress || null,
      masterDevice: null, // Not allow to assign master device the first time device is registered
      deviceName: deviceName || null,
      deviceType: deviceType || DEVICE_TYPE.DPU, // DPU is the default type
      note: note || '',
      isActive: isActive || false, // Default to false
      isOnline: isOnline || false, // Default to false,
      balenaUUID: balenaUUID || null,
      publicIpAddress: publicIpAddress || null,
      longitude: longitude || DEFAULT_LOCATION.longitude,
      latitude: latitude || DEFAULT_LOCATION.latitude,
      customLongitude: customLongitude || null,
      customLatitude: customLatitude || null
    }
  } catch (generalError) {
    logger.error(generalError)
    throw new HttpError.InternalServerError(generalError)
  }

  try {
    let newDevice = await createDevice(deviceInstance)
    logger.debug(`${PrefixFn} Device register successfully`)
    return newDevice
  } catch (err) {
    logger.error(err)
    throw new HttpError.InternalServerError(err)
  }
}
