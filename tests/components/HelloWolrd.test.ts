
import {render} from '@testing-library/vue';
import { describe, it, expect } from 'vitest'

import HelloWorld from '../../src/components/HelloWorld.vue'  

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper= render(HelloWorld, { 
        props: {
        msg : 'Hello Vitest'
        }
    })

    expect(wrapper.html()).toContain('Hello Vitest')
  })
})