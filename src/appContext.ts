import * as React from 'React';
import { appReducer, initialAppState } from './appReducer';

import { createContext } from 'use-context-selector';

const AppContext = createContext<[{app:ReturnType<typeof appReducer>}, any]>([{app: initialAppState}, {}]);
export {
    AppContext
}
