const control_routes = {
  control: "/control",
}

const root_routes = {
  admin: `${control_routes.control}/admin`,
  auth: `${control_routes.control}/auth`,
  news: `${control_routes.control}/news`,
  shop: `${control_routes.control}/shop`,
  tournament: `${control_routes.control}/tournament`,
}

export const admin_routes = {
  root: root_routes.admin,
  change_pass: `${root_routes.admin}/change_pass`,
  admin_me: `${root_routes.admin}/admin_me`,
  get: (id: string) => `${root_routes.admin}/${id}`,
}

export const auth_routes = {
  login: `${root_routes.auth}/login`,
  refresh: `${root_routes.auth}/refresh`,
}

export const news_routes = {
  root: root_routes.news,
  get: (id: string) => `${root_routes.news}/${id}`,
  upload: (id: string) => `${root_routes.news}/upload/${id}`,
  deleteLogo: (id: string) => `${root_routes.news}/deleteLogo/${id}`,
}

export const shop_routes = {
  root: root_routes.shop,
  get: (id: string) => `${root_routes.shop}/${id}`,
  upload: (id: string) => `${root_routes.shop}/upload/${id}`,
  deleteLogo: (id: string) => `${root_routes.shop}/deleteLogo/${id}`,
  image: (id: string) => `${root_routes.shop}/image/${id}`,
  deleteImage: (image_id: string) => `${root_routes.shop}/image/${image_id}`,
}

export const tournament_routes = {
  root: root_routes.tournament,
  get: (id: string) => `${root_routes.tournament}/${id}`,
  upload: (id: string) => `${root_routes.tournament}/upload/${id}`,
  deleteLogo: (id: string) => `${root_routes.tournament}/deleteLogo/${id}`,
  video: (id: string) => `${root_routes.tournament}/video/${id}`,
  deleteVideo: (video_id: string) => `${root_routes.tournament}/video/${video_id}`,
  image: (id: string) => `${root_routes.tournament}/image/${id}`,
  deleteImage: (image_id: string) => `${root_routes.tournament}/image/${image_id}`,
}
