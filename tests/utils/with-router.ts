// test-utils.ts
import { render } from '@testing-library/vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RenderOptions } from '@testing-library/vue'
// path of the definition of your routes
import { routes } from '../../src/router'

interface RenderWithRouterOptions extends Omit<RenderOptions<any>, 'global'> {
  initialRoute?: string
  routerOptions?: {
    routes?: typeof routes
    history?: ReturnType<typeof createWebHistory>
  }
}

export async function renderWithRouter(Component: any, options: RenderWithRouterOptions = {}) {
  const { initialRoute = '/', routerOptions = {}, ...renderOptions } = options

  const router = createRouter({
    history: createWebHistory(),
    // Use provided routes or import from your router file
    routes: routerOptions.routes || routes,
  })


  await router.replace(initialRoute)

  const wrapper = render(Component, {
    global: {
      plugins: [router],
    },
    ...renderOptions,
  })

  return {
    // Return everything from regular render, plus the router instance
    wrapper,
    router,
  }
}