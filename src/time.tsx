import * as React from 'react';
import { AppContext } from './appContext';
import { appActions } from './appReducer';
import { Hour } from './hour';
import { Minute } from './minute';

import {  useContextSelector } from 'use-context-selector';

const time = ()=>{
    const dispatch = useContextSelector(AppContext, s=>s[1]);
    React.useEffect(()=>{
        const now = new Date();
        dispatch(appActions.setTime(now.getHours(), now.getMinutes(), now.getSeconds()))     
    }, [])
    return (<div>
        <div><Hour /></div>
        <div>:</div>        
        <div><Minute /></div>
    </div>)
}
export {
    time as Time
}
