export interface User {
  id: number
  name: string
  username: string
  email: string
  address?: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone?: string
  website?: string
  company?: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface CreateUserRequest {
  name: string
  username: string
  email: string
}

export interface UpdateUserRequest {
  id: number
  name?: string
  username?: string
  email?: string
}

export interface CreatePostRequest {
  userId: number
  title: string
  body: string
}

export interface UpdatePostRequest {
  id: number
  userId?: number
  title?: string
  body?: string
}