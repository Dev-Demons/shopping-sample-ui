import {REQUEST_STATUS} from "../constants/enums"

export interface UploadDetails {
  file: any;
  title: string;
  useship_price: number | Blob;
  resellship_price: number | Blob;
  ownership_price: number | Blob;
  fileType: string;
}

export interface UploadFile {
  file: any;
  title: string;
  useship_price: number;
  resellship_price: number;
  ownership_price: number;
}

export interface UploadVideos {
  count: number;
  next: string;
  previous: string;
  results: UploadVideo[]
}

export interface UploadVideo {
  id: number;
  owner_display_name: string;
  owner_profile_picture: string;
  title: string;
  watermarked_file: string;
  created_at: string;
  ownership_price: number;
  useship_price: number;
  resellship_price: number;
  hash: string;
  deleted: boolean;
  video_time_length: number;
  owner: number;
  buyer: number;
}

export interface GetUploadVideo {
  videoid: number;
  title: string;
  thumbnail: string;
  useship_price: number;
}

export interface ViewDelProductCard {
  productid: number;
  title: string;
  thumbnail: string;
  useship_price: number;
  product_title: string;
}

export interface viewAddProductCard {
  productid: number;
  title: string;
  thumbnail: string;
  useship_price: number;
}

export interface FileState {
  status: REQUEST_STATUS;
  error: unknown;
  data: any;
}
