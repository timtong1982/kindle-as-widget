import * as React from 'React';
import { createContext } from 'use-context-selector';
import { appReducer, initialAppState } from './appReducer';

const AppContext = createContext<[{ app: ReturnType<typeof appReducer> }, any]>(
    [{ app: initialAppState }, {}]
);

const AppContextProvider = (props: React.PropsWithChildren<unknown>) => {
    const [state, dispatch] = React.useReducer(appReducer, initialAppState);
    const { children } = props;

    return (
        <AppContext.Provider value={[{ app: state }, dispatch]}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextProvider };
