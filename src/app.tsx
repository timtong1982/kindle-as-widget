import * as React from 'React';
import { AppContext, AppContextProvider } from './appContext';
import { appReducer ,initialAppState} from './appReducer';
import { Time } from './time';


const app = (): React.ReactElement => {


  return <AppContextProvider><Time/></AppContextProvider>
};

export { app };
