import { mount } from '@vue/test-utils'
import musicplayer from '@/components/music/musicplayer.vue'

describe('musicplayer', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(musicplayer)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
