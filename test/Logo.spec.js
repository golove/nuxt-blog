import { mount } from '@vue/test-utils'
import musicplayer from '@/layouts/default.vue'

describe('musicplayer', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(musicplayer)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
