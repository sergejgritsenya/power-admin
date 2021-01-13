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

export const news_routes = {
  root: root_routes.news,
  get: (id: string) => `${root_routes.news}/${id}`,
  upload: (id: string) => `${root_routes.news}/upload/${id}`,
  deleteLogo: (id: string) => `${root_routes.news}/deleteLogo/${id}`,
}

export const tournament_routes = {
  root: root_routes.tournament,
  get: (id: string) => `${root_routes.tournament}/${id}`,
  upload: (id: string) => `${root_routes.tournament}/upload/${id}`,
  deleteLogo: (id: string) => `${root_routes.tournament}/deleteLogo/${id}`,
  video: (id: string) => `${root_routes.tournament}/video/${id}`,
  deleteVideo: (tournament_id: string, video_id: string) =>
    `${root_routes.tournament}/video/${tournament_id}/${video_id}`,
  image: (id: string) => `${root_routes.tournament}/image/${id}`,
  deleteImage: (tournament_id: string, image_id: string) =>
    `${root_routes.tournament}/image/${tournament_id}/${image_id}`,
}
