declare module '@const/index' {
  export const USER_STATUS: { [key: string]: string }
  export const SOCIAL_TYPE: { [key: string]: string }

  export const CITIES: { [key: string]: string }

  export const COUNTRIES: { [key: string]: string }

  export const COUNTRIES_CODE: { [key: string]: string }

  export const LANGUAGE: { [key: string]: string }

  export const USER_TYPE: {
    END_USER: 0
    SOCIAL_USER: 1
    PARTNER_USER: 2
    ADMIN_USER: 3
  }

  export const USER_ROLE: { [key: string]: string }

  export const DYNAMO_QUERY: {
    PUT: 'put'
    GET: 'get'
    UPDATE: 'update'
    QUERY: 'query'
    DELETE: 'delete'
  }

  export const DOCUMENT_TYPE: {
    USER_AVATAR: 'user_avatar'
    USER_SESSION: 'user_session'
    USER_OTHERS: 'user_others'
    USER_REVIEW: 'user_review'
    UNIT_SESSION: 'unit_session'
    UNIT_OTHERS: 'unit_others'
  }

  export const DOCUMENT_UPDATE_TYPE: {
    STATUS: 'change_status'
    DESCRIPTION: 'change_description'
    ADD_FILES: 'add_files'
    MOD_FILES: 'modify_files'
    DEL_FILES: 'del_files'
  }

  export const DEVICE_TYPE: {
    CPU: 'cpu'
    DPU: 'dpu'
    CRA: 'cra'
    PSC: 'psc'
    CPR: 'cpr'
  }

  export const DEFAULT_LOCATION: {
    longitude: 106.721991 // Pole to Pole (east-west)
    latitude: 10.794743 // (south - east)
  }
}
