import * as React from 'react';
import { AppContext } from './appContext';


import {  useContextSelector } from 'use-context-selector';
import { appActions } from './appReducer';

const minute = () =>{
    
    const dispatch = useContextSelector(AppContext, s=>s[1]);
    const minute = useContextSelector(AppContext, s=>s[0].app.minute);
    return <div onClick={()=>dispatch(appActions.setTick())}>{minute}</div>
}

export {
    minute as Minute
}
