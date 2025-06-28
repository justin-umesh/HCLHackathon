import type { CustomEndPoint } from ".."
import type { CustomJsonObject } from "../../constants"

export const userQuery : CustomJsonObject<CustomEndPoint> = {
    getUsers : {
        getUrl: () =>  `/users?page=1&limit=10&sort=asc`,
        method: 'GET',
        transformResponse: (response: any) => response,
        transformErrorResponse: (response: any) => response.error,
    },
}

export const userMutation : CustomJsonObject<CustomEndPoint> = {
    addUser: {
        getUrl: () =>  `/users`,
        method: 'POST',
        transformResponse: (response: any) => response,
        transformErrorResponse: (response: any) => response.error,
    },
}