import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Switch, { SwitchProps } from '../Switch'

const checkeDefaultdProps: SwitchProps = {
  defaultChecked: true,
}

const haveClickProps: SwitchProps = {
  checked: false,
  onChange: jest.fn(),
  onClick: jest.fn(),
}

const defaultAndValueProps: SwitchProps = {
  defaultChecked: false,
  checked: void 0,
}

const disAbledProps: SwitchProps = {
  defaultChecked: true,
  disabled: true,
  onClick: jest.fn(),
}

describe('test Switch component', () => {
  it('should render close state', () => {
    const wrapper = render(<Switch {...checkeDefaultdProps} />)
    const element = wrapper.container.querySelector('.xiaobing-switch') as HTMLButtonElement
    expect(element).toHaveClass('xiaobing-switch xiaobing-switch-checked')
    fireEvent.click(element)
    expect(element.getAttribute('aria-checked')).toEqual('false')
    expect(wrapper).toMatchSnapshot()
  })
  it('should render disabled when base on disabed state', () => {
    const wrapper = render(<Switch {...disAbledProps} />)
    const element = wrapper.container.querySelector('.xiaobing-switch') as HTMLButtonElement
    expect(element).toHaveClass('xiaobing-switch xiaobing-switch-disabled')
    fireEvent.click(element)
    expect(haveClickProps.onClick).not.toHaveBeenCalled()
  })
  it('should render deFalutValue state when value is undefined or null', () => {
    const wrapper = render(<Switch {...defaultAndValueProps} />)
    const element = wrapper.container.querySelector('.xiaobing-switch') as HTMLButtonElement
    expect(element).toHaveClass('xiaobing-switch')
    fireEvent.click(element)
    expect(element.getAttribute('aria-checked')).toEqual('true')
  })
  it('should render state base on change', () => {
    const wrapper = render(<Switch {...haveClickProps} />)
    const element = wrapper.container.querySelector('.xiaobing-switch') as HTMLButtonElement
    expect(element).toHaveClass('xiaobing-switch')
    fireEvent.click(element)
    expect(haveClickProps.checked).toEqual(false)
    expect(haveClickProps.onChange).toHaveBeenCalled()
    expect(haveClickProps.onClick).toHaveBeenCalled()
    expect(element.getAttribute('aria-checked')).toEqual('false')
  })
})
