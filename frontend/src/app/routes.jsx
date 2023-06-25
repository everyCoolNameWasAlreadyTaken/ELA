import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));



// Audio page
const Page_Audio= Loadable(lazy(() => import('app/views/dashboard/Page_Audio')));

// matching page
const Page_Matching = Loadable(lazy(() => import('app/views/dashboard/Page_Matching')));

// MC page
const Page_MC= Loadable(lazy(() => import('app/views/dashboard/Page_MC')));

// RandomExam page
const Page_RandomExam= Loadable(lazy(() => import('app/views/dashboard/Page_RandomExam')));

// Video page
const Page_Video= Loadable(lazy(() => import('app/views/dashboard/Page_Video')));


const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },
     // audio
     {
      path: '/dashboard/Page_Audio',
      element: <Page_Audio />,
      auth: authRoles.admin
    },      
      // matching
      {
        path: '/dashboard/Page_Matching',
        element: <Page_Matching />,
        auth: authRoles.admin
      },

      // MC
      {
        path: '/dashboard/Page_MC',
        element: <Page_MC />,
        auth: authRoles.admin
      },

      // RandomExam
      {
        path: '/dashboard/Page_RandomExam',
        element: <Page_RandomExam />,
        auth: authRoles.admin
      },

      // Video
      {
        path: '/dashboard/Page_Video',
        element: <Page_Video />,
        auth: authRoles.admin
      },


      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      }
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
