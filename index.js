import { Children, Component, cloneElement } from 'react'

export default class EventData extends Component {
  render = () => cloneElement(Children.only(this.props.children), this.enhancedProp)
  onEvent = (...args) => Children.only(this.props.children).props.onPress(this.props.data, ...args)
  enhancedProp = { [this.props.event]: this.onEvent }
}
