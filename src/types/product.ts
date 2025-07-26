/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductMedia {
  name: string
  resource_type: string
  resource_value: string
  thumbnail_url?: string
}

export interface ChecklistItem {
  color: string
  icon: string
  id: string
  list_page_visibility: boolean
  text: string
}

export interface Instructor {
  description: string
  has_instructor_page: boolean
  image: string
  name: string
  short_description: string
  slug: string
}

export interface Feature {
  icon: string
  id: string
  subtitle: string
  title: string
}

export interface Pointer {
  color: string
  icon: string
  id: string
  text: string
}

export interface AboutItem {
  description: string
  icon: string
  id: string
  title: string
}

export interface Testimonial {
  description: string
  id: string
  name: string
  profile_image: string
  testimonial: string
  thumb?: string
  video_type: string
  video_url?: string
}

export interface ProductSection {
  type: string
  name: string
  description: string
  bg_color: string
  order_idx: number
  values: any[]
}

export interface ProductData {
  slug: string
  id: number
  title: string
  description: string
  platform: string
  type: string
  modality: string
  start_at: string
  media: ProductMedia[]
  checklist: ChecklistItem[]
  seo: any[]
  cta_text: {
    name: string
    value: string
  }
  sections: ProductSection[]
  is_cohort_based_course: boolean
  secondary_cta_group: any[]
  delivery_method: string
}

export interface ApiResponse {
  code: number
  data: ProductData
  error: any[]
  message: string
  payload: any[]
  status_code: number
}
