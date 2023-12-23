import { Outlet } from 'react-router-dom';
import Nav from '../Header/Nav';

const Main = () => {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
};

export default Main;