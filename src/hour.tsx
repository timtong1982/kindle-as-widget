import * as React from 'react';
import { AppContext } from './appContext';

import {  useContextSelector } from 'use-context-selector';

const hour = () =>{
    const hour =useContextSelector(AppContext, s=>s[0].app.hour);
    return <div>{hour}</div>
}

export {
    hour as Hour
}
