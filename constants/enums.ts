
export enum REQUEST_STATUS {
  IDLE = "LDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  GETOWNSTATE="GET OWNER SUCCEEDED",
  GETPRODUCTS="LOAD PRODUCT SUCCEEDED",
  GETVIDEOS="LOAD VIDEO SUCCEEDED",

}

export enum FILE_TYPE {
  IMAGE = "image",
  MP4 = "mp4",
}

export enum USER_ROLE {
  PRODUCER="PRODUCER",
  CONSUMER="CONSUMER",
  VENDER="VENDER",
  ANONYMOUS="ANON",
}
