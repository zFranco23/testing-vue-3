import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const posts = [
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
},
{
  "userId": 1,
  "id": 2,
  "title": "quis ut nam facilis et officia qui",
  "completed": false
}
]

const users = [
  {
    "id": 1,
    "name": "Franco Jossep",
    "username": "francojosep",
    "email": "francojosep@gmail.com",
    "address": {
      "street": "Rua do Paço",
      "suite": "Apto 1",
      "city": "São Paulo",
      "zipcode": "01310-000",
      "geo": {
        "lat": "-40.8563",
        "lng": "-73.9228"
      }
    },
    "phone": "(11) 555-9857",
    "website": "https://francojosep.com.br",
    "company": {
      "name": "Franco Jossep",
      "catchPhrase": "Experienced multi-tasking extranet",
      "bs": "strategize extensible e-markets"
    }
  }
]

export const restHandlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json(posts)
  }),
  http.get('https://jsonplaceholder.typicode.com/users/:id', () => HttpResponse.json(users[0])),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())