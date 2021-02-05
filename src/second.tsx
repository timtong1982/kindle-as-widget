import * as React from 'react';
import { AppContext } from './appContext';


import {  useContextSelector } from 'use-context-selector';
import { appActions } from './appReducer';

const second = () =>{
    
    const second = useContextSelector(AppContext, s=>s[0].app.second);
    return <div>{second}</div>
}

export {
    second as Second
}
