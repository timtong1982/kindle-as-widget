import * as React from 'react'
import { AppContext } from './appContext'

import { useContextSelector } from 'use-context-selector'
import { appActions } from './appReducer'

const minute = () => {
    const minute = useContextSelector(AppContext, (s) => s[0].app.minute)
    return <div>{minute}</div>
}

export { minute as Minute }
