import {lazy} from 'react';
import {Navigate} from 'react-router-dom';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

// Audio page
const Page_Audio = Loadable(lazy(() => import('app/views/dashboard/Page_Audio')));

// MC page
const Page_MC = Loadable(lazy(() => import('app/views/dashboard/Page_MC')));

// RandomExam page
const Page_RandomExam = Loadable(lazy(() => import('app/views/dashboard/Page_RandomExam')));

// Video page
const Page_Video = Loadable(lazy(() => import('app/views/dashboard/Page_Video')));

// Clustering page
const Page_Clustering = Loadable(lazy(() => import('app/views/dashboard/Page_Clustering')));

// levelling
const Level = Loadable(lazy(() => import('app/views/dashboard/Level')));

// levelling
const Wiki = Loadable(lazy(() => import('app/views/dashboard/Page_ClozeText')));


const routes = [
    {
        element: (
            <MatxLayout/>
        ),
        children: [
            ...materialRoutes,
            // dashboard route
            {
                path: '/dashboard/default',
                element: <Analytics/>,
            },
            // audio
            {
                path: '/dashboard/Page_Audio',
                element: <Page_Audio/>,
            },

            // MC
            {
                path: '/dashboard/Page_MC',
                element: <Page_MC/>,
            },

            // RandomExam
            {
                path: '/dashboard/Page_RandomExam',
                element: <Page_RandomExam/>,
            },

            // Video
            {
                path: '/dashboard/Page_Video',
                element: <Page_Video/>,
            },

            // Clustering
            {
                path: '/dashboard/Page_Clustering',
                element: <Page_Clustering/>,
            },

            // Levelling
            {
                path: '/dashboard/Level',
                element: <Level/>,
            },

            // Wiki
            {
                path: '/dashboard/Page_ClozeText',
                element: <Wiki/>,
            },
        ]
    },

    // session pages route
    {path: '/session/404', element: <NotFound/>},

    {path: '/', element: <Navigate to="dashboard/default"/>},
    {path: '*', element: <NotFound/>}
];

export default routes;
