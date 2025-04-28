import { VueQueryPlugin } from "@tanstack/vue-query"
import { App, createApp } from "vue"

// Reference - https://alexop.dev/posts/how-to-test-vue-composables/
export function withSetup<T>(composable: () => T): [T, App] {
    let result: T
    const app = createApp({
      setup() {
        result = composable()
        return () => {}
      },
    }).use(VueQueryPlugin   )
  
    app.mount(document.createElement('div'))
    // @ts-ignore
    return [result, app]
  }