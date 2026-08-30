import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

// Pre-configured Base44 SDK client for frontend use.
// appId is resolved the same way the rest of this app resolves it
// (URL param -> stored value -> VITE_BASE44_APP_ID env var).
// If you know your app's id (from base44/.app.jsonc in the Base44 dashboard),
// you can hardcode it here instead: createClient({ appId: 'your-app-id' }).
export const base44 = createClient({
  appId: appParams.appId,
});
