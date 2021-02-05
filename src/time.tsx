import * as React from 'react';
import { AppContext } from './appContext';
import { appActions } from './appReducer';
import { Hour } from './hour';
import { Minute } from './minute';

import {  useContextSelector } from 'use-context-selector';
import { Second } from './second';

const time = ()=>{
    const dispatch = useContextSelector(AppContext, s=>s[1]);
    React.useEffect(()=>{
        const now = new Date();
        dispatch(appActions.setTime(now.getHours(), now.getMinutes(), now.getSeconds()))     
        const tick = () => {
            const id = setTimeout(() => {
                dispatch(appActions.setTick())
                console.log('tick')
                tick();
            }, 1000);

            return id;
        }
        tick();
    }, [])
    return (<div>
        <div><Hour /></div>
        <div>:</div>        
        <div><Minute /></div>
        <div>:</div>        
        <div><Second /></div>
    </div>)
}
export {
    time as Time
}
