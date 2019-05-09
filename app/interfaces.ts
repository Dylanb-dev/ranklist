export interface ThingRequest {
  label: string
  rank: number
}

export interface Thing extends ThingRequest {
  id: string
  label: string
  rank: number
}
