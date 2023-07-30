import {CssBaseline} from '@mui/material';
import {useRoutes} from 'react-router-dom';
import {MatxTheme} from './components';
import {SettingsProvider} from './contexts/SettingsContext';
import routes from './routes';
import {UserContextProvider} from './contexts/UserContext';

const App = () => {
    const content = useRoutes(routes);

    return (

        <SettingsProvider>
            <UserContextProvider>
                <MatxTheme>
                    <CssBaseline/>
                    {content}
                </MatxTheme>
            </UserContextProvider>
        </SettingsProvider>

    );
};

export default App;
