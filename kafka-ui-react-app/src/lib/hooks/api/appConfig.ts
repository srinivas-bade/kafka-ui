import { appConfigApiClient as api } from 'lib/api';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ApplicationConfigPropertiesKafkaClusters } from 'generated-sources';
import { QUERY_REFETCH_OFF_OPTIONS } from 'lib/constants';

export function useAppInfo() {
  return useSuspenseQuery({
    queryKey: ['app', 'info'],
    queryFn: () => api.getApplicationInfo(),
    ...QUERY_REFETCH_OFF_OPTIONS,
  });
}

export function useAppConfig() {
  return useSuspenseQuery({
    queryKey: ['app', 'config'],
    queryFn: () => api.getCurrentConfig(),
  });
}

export function useUpdateAppConfig({ initialName }: { initialName?: string }) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (cluster: ApplicationConfigPropertiesKafkaClusters) => {
      const existingConfig = await api.getCurrentConfig();
      const existingClusters = existingConfig.properties?.kafka?.clusters || [];

      let clusters: ApplicationConfigPropertiesKafkaClusters[];

      if (existingClusters.length > 0) {
        if (!initialName) {
          clusters = [...existingClusters, cluster];
        } else {
          clusters = existingClusters.map((c) =>
            c.name === initialName ? cluster : c
          );
        }
      } else {
        clusters = [cluster];
      }

      const config = {
        ...existingConfig,
        properties: {
          ...existingConfig.properties,
          kafka: { clusters },
        },
      };
      return api.restartWithConfig({ restartRequest: { config } });
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ['app', 'config'] }),
  });
}

export function useAppConfigFilesUpload() {
  return useMutation({
    mutationFn: (payload: FormData) =>
      fetch('/api/config/relatedfiles', {
        method: 'POST',
        body: payload,
      }).then((res) => res.json()),
  });
}

export function useValidateAppConfig() {
  return useMutation({
    mutationFn: (config: ApplicationConfigPropertiesKafkaClusters) =>
      api.validateConfig({
        applicationConfig: { properties: { kafka: { clusters: [config] } } },
      }),
  });
}
