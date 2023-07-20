export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'Training', type: 'label' },
  {
    name: 'Classic',
    icon: 'local_library',
    children: [
      { name: 'Single Choice', iconText: 'SC', path: '/dashboard/Page_MC' },
      { name: 'Poster Matching', iconText: 'MA', path: '/dashboard/Page_Matching' },
      { name: 'Wiki Gaps', iconText: 'WI', path: '/dashboard/Page_WikiGaps' },
    ]
  },
  {
    name: 'New Media',
    icon: 'streetview',
    children: [
      { name: 'Trailer Rotation', iconText: 'TR', path: '/dashboard/Page_Video'  },
      { name: 'Theme Rotation', iconText: 'TH', path: '/dashboard/Page_Audio' },
    ]
  },


  { label: 'Exam', type: 'label' },
  { name: 'Random Exam', path: '/dashboard/Page_RandomExam', icon: 'school' },

  { label: 'UserData ', type: 'label' },
  { name: 'Clustering', path: '/dashboard/Page_Clustering', icon: 'admin_panel_settings' },
  { name: 'Your Level', path: '/dashboard/Level', icon: 'movie_filter' },



  //--------------------------Below here is Documentation and Assets in Navigation-------------------------------
  /* { label: 'Components', type: 'label' },
  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' }
    ]
  },
  {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  },
  {
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'http://demos.ui-lib.com/matx-react-doc/'
  } */
];
