import React from 'react'
import { render } from '@testing-library/react'

import Avatar, { AvatarProps } from '../avatar'

const url =
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1068316074,4162025599&fm=26&gp=0.jpg'

const testProps: AvatarProps = {
  src: url,
  size: 'large',
  shape: 'circle',
}
describe('test Avatar component', () => {
  it('should render correct component', () => {
    const wrapper = render(<Avatar src={url} shape="circle" />)
    const element = wrapper.container.querySelector('.xiaobing-avatar') as HTMLElement
    expect(element.tagName).toEqual('SPAN')
    expect(element).toHaveClass('xiaobing-avatar xiaobing-avatar-default')
    expect(wrapper).toMatchSnapshot()
  })
  it('should render correct size', () => {
    const wrapper = render(<Avatar {...testProps} />)
    const element = wrapper.container.querySelector('.xiaobing-avatar') as HTMLElement
    expect(element.tagName).toEqual('SPAN')
    expect(element).not.toHaveClass('xiaobing-avatar-default')
    expect(element).toHaveClass('xiaobing-avatar-large')
  })
})
