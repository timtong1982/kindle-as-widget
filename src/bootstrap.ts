import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { app } from './app'

const rootId = 'appRoot'

let root = document.querySelector(`#${rootId}`)
if (!root) {
    root = document.createElement('div')
    root.id = rootId
    document.body.appendChild(root)
}

ReactDOM.render(React.createElement(app), root)
