// resources/js/lib/routePath.ts
import { route } from 'ziggy-js';
import { Ziggy } from '@/ziggy';

export function path(name: string, params?: any) {
  return route(name, params, false, Ziggy); // false = relative URL
}
