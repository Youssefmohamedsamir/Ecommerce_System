import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'specificbrand/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'SpecificCategories/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
