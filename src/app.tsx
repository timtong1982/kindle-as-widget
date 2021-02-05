import * as React from 'React';
import { AppContext } from './appContext';
import { appReducer ,initialAppState} from './appReducer';
import { Time } from './time';


const app = (): React.ReactElement => {

  const  [state, dispatch] = React.useReducer(appReducer, initialAppState);
  const createElement = (): JSX.Element => {
    return (<div>
      <Time/>
    </div>);
  };

  return <AppContext.Provider value={[{app: state}, dispatch]}>{createElement()}</AppContext.Provider> 
};

export { app };
