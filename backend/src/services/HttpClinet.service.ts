import axios from 'axios'

type methodRequest = 'GET' | 'POST' | 'PUT' | 'DELETE'

export const apiConnectProxy = async (name: string, method: methodRequest, body: any, pathVaribable: any): Promise<any> => {
  const headers = {}
  let path = 'test'
  try {
    return await httpClient(method, path, body, headers, pathVaribable)
  } catch (error: any) {}
}
export const httpClient = async (method: methodRequest, path: string, body: any, headers: any, urlParams: string, customReqProps: any = {}): Promise<any> => {
  try {
    console.info(`try to get ${path} with method ${method}. body: ${body && JSON.stringify(body)}`)
    const data: any = await send(method, path, body, headers, urlParams, customReqProps)
    console.info(`request success: ${data && JSON.stringify(data)}`)
    return data
  } catch (error: any) {
    console.error(`error on request: ${error.message}`)
  }
}

export const send = async (method: methodRequest, path: string, body: any, headers: any, urlParams: string, customReqProps: any = {}): Promise<any> => {
  const config = {
    method,
    headers,
    params: urlParams,
    url: path,
    data: body,
    ...customReqProps,
  }

  const { data } = await axios(config)
  return data
}
