/*
MIT License

Copyright (c) 2017 Vu Le <thenewvu@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Children, Component, cloneElement } from 'react'

export default class EventData extends Component {
  constructor (props) {
    super(props)
    this.createEnhancedProps()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.event !== this.props.event) {
      this.createEnhancedProps()
    }
  }

  render () {
    const target = Children.only(this.props.children)
    return cloneElement(target, this.enhancedProp)
  }

  createEnhancedProps () {
    const { children, event, data, ...rest } = this.props
    this.enhancedProp = {
      [event]: (...args) => {
        const target = Children.only(children)
        const eventHandle = target.props[event]
        if (typeof eventHandle === 'function') {
          eventHandle(data, ...args)
        }
      },
      ...rest
    }
  }
}
