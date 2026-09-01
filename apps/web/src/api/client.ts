import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import type { paths } from './schema';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const fetchClient = createFetchClient<paths>({ baseUrl: API_URL });

// Typed React Query hooks: $api.useQuery / $api.useMutation / $api.queryOptions
export const $api = createClient(fetchClient);
