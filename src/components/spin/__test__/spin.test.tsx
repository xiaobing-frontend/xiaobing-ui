import React from 'react'
import { render } from '@testing-library/react'

import Spin, { SpinProps } from '../spin'

const testProps: SpinProps = {
  spinning: false,
  size: 'large',
}
describe('test Spin component', () => {
  it('sholud render correct component', () => {
    const wrapper = render(<Spin />)
    const element = wrapper.container.querySelector('.xiaobing-spin') as HTMLElement
    expect(element.tagName).toEqual('SPAN')
    expect(element).toHaveClass('xiaobing-spin xiaobing-spin-spinning')
    expect(wrapper).toMatchSnapshot()
  })
  it('sholud render correct size', () => {
    const wrapper = render(<Spin {...testProps} />)
    const element = wrapper.container.querySelector('.xiaobing-spin') as HTMLElement
    expect(element.tagName).toEqual('SPAN')
    expect(element).not.toHaveClass('xiaobing-spin-spinning')
    expect(element).toHaveClass('xiaobing-spin-large')
  })
})
