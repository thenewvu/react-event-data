THE PROBLEM
===========

I usually have to deal with this kind of data (look familiar?):

```js
const ids = ['H1oHAKVdZ', 'SJXIAKEdb', 'S1j8At4u-']
const data = {
  'H1oHAKVdZ': {name: 'Item 1'},
  'SJXIAKEdb': {name: 'Item 2'},
  'S1j8At4u-': {name: 'Item 3'}
}
```

And the common mission is to render it as a list, clicking on an item will trigger an action, for example, highlight it.

I usually come up with this (look familiar?):


```js
class Item extends React.Component {
  constructor () {
    this.onClick = this.onClick.bind(this)
  }

  render () {
    return (<buttom onclick={this.onClick}>
      {this.props.name}
    </buttom>)
  }

  onClick () {
    this.props.onClick(this.props.id)
  }
}

function onItemClick (id) {
  alert(`highlight ${id}`)
}

function List () {
  return (<div>
    {ids.map(id => <Item key={id} id={id}
      data={data[id]} onClick={onItemClick} />)}
  </div>)
}
```

So ... where is the problem right? The problem is, let's say we need 10 of them, for example, we need to remove the item, we need to start editing it, ... 2000 years later you will repeat yourself in this way:

```js
class Item extends React.Component {
  constructor () {
    this.onAction1 = this.onAction1.bind(this)
    this.onAction2 = this.onAction2.bind(this)
    this.onAction3 = this.onAction3.bind(this)
    this.onAction4 = this.onAction4.bind(this)
    this.onAction5 = this.onAction5.bind(this)
  }

  render () {
    return (<div>
      <span>{this.props.name}</span>
      <button onclick={this.onAction1} />
      <button onclick={this.onAction2} />
      <button onclick={this.onAction3} />
      <button onclick={this.onAction4} />
      <button onclick={this.onAction5} />
    </div>)
  }

  onAction1 () {
    this.props.onAction1(this.props.id)
  }

  onAction2 () {
    this.props.onAction2(this.props.id)
  }

  onAction3 () {
    this.props.onAction3(this.props.id)
  }

  onAction4 () {
    this.props.onAction4(this.props.id)
  }

  onAction5 () {
    this.props.onAction5(this.props.id)
  }
}
```

THE SOLUTION
============

```js
function Item (props) {
  return (<div>
    <span>{props.name}</span>

    <EventData event='onclick' data={props.id}>
      <button onclick={props.onAction1} />
    </EventData>
    <EventData event='onclick' data={props.id}>
      <button onclick={props.onAction2} />
    </EventData>
    <EventData event='onclick' data={props.id}>
      <button onclick={props.onAction3} />
    </EventData>
    <EventData event='onclick' data={props.id}>
      <button onclick={props.onAction4} />
    </EventData>
    <EventData event='onclick' data={props.id}>
      <button onclick={props.onAction5} />
    </EventData>
  </div>)
}
```

See the difference? It's declarative and cleaner. That's it.


INSTALLING
==========

```
npm install --save react-event-data
```

USAGE
=====

```js
/*
 * onClick = (id, ev) => {}
 */
function Button ({ id, onClick }) {
  return (<EventData event='onclick' data={id}>
    <button onclick={onClick}>Click me</button>
  </EventData>)
}

/*
 * TextInput from react-native
 * onChange = (name, value) => {}
 */
function Field ({ name, value, onChange }) {
  return (<EventData event='onChangeText' data={name}>
    <TextInput value={value} onChangeText={onChange} />
  </EventData>)
}

/*
 * TouchableOpacity from react-native
 * onPress = (id, ev) => {}
 */
function Touchable ({ id, onPress }) {
  return (<EventData event='onPress' data={id}>
    <TouchableOpacity onPress={onPress}>
      <Text>Tap me</Text>
    </TouchableOpacity>
  </EventData>)
}
```
