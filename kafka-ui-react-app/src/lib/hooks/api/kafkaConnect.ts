import {
  Connect,
  Connector,
  ConnectorAction,
  NewConnector,
} from 'generated-sources';
import { kafkaConnectApiClient as api } from 'lib/api';
import sortBy from 'lodash/sortBy';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ClusterName } from 'redux/interfaces';
import { showSuccessAlert } from 'lib/errorHandling';

interface UseConnectorProps {
  clusterName: ClusterName;
  connectName: Connect['name'];
  connectorName: Connector['name'];
}
interface CreateConnectorProps {
  connectName: Connect['name'];
  newConnector: NewConnector;
}

const connectsKey = (clusterName: ClusterName) => [
  'clusters',
  clusterName,
  'connects',
];
const connectorsKey = (clusterName: ClusterName, search?: string) => {
  const base = ['clusters', clusterName, 'connectors'];
  if (search) {
    return [...base, { search }];
  }
  return base;
};
const connectorKey = (props: UseConnectorProps) => [
  'clusters',
  props.clusterName,
  'connects',
  props.connectName,
  'connectors',
  props.connectorName,
];
const connectorTasksKey = (props: UseConnectorProps) => [
  ...connectorKey(props),
  'tasks',
];

export function useConnects(clusterName: ClusterName) {
  return useSuspenseQuery({
    queryKey: connectsKey(clusterName),
    queryFn: () => api.getConnects({ clusterName }),
  });
}
export function useConnectors(clusterName: ClusterName, search?: string) {
  return useSuspenseQuery({
    queryKey: connectorsKey(clusterName, search),
    queryFn: () => api.getAllConnectors({ clusterName, search }),
    select: (data) => sortBy(data, 'name'),
  });
}
export function useConnector(props: UseConnectorProps) {
  return useSuspenseQuery({
    queryKey: connectorKey(props),
    queryFn: () => api.getConnector(props),
  });
}
export function useConnectorTasks(props: UseConnectorProps) {
  return useSuspenseQuery({
    queryKey: connectorTasksKey(props),
    queryFn: () => api.getConnectorTasks(props),
    select: (data) => sortBy(data, 'status.id'),
  });
}
export function useUpdateConnectorState(props: UseConnectorProps) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (action: ConnectorAction) =>
      api.updateConnectorState({ ...props, action }),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ['clusters', props.clusterName, 'connectors'],
      }),
  });
}
export function useRestartConnectorTask(props: UseConnectorProps) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (taskId: number) =>
      api.restartConnectorTask({ ...props, taskId }),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: connectorTasksKey(props) }),
  });
}
export function useConnectorConfig(props: UseConnectorProps) {
  return useSuspenseQuery({
    queryKey: [...connectorKey(props), 'config'],
    queryFn: () => api.getConnectorConfig(props),
  });
}
export function useUpdateConnectorConfig(props: UseConnectorProps) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (requestBody: Connector['config']) =>
      api.setConnectorConfig({ ...props, requestBody }),
    onSuccess: () => {
      showSuccessAlert({
        message: `Config successfully updated.`,
      });
      client.invalidateQueries({ queryKey: connectorKey(props) });
    },
  });
}
function useCreateConnectorMutation(clusterName: ClusterName) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (props: CreateConnectorProps) =>
      api.createConnector({ ...props, clusterName }),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: connectorsKey(clusterName) }),
  });
}

// this will change later when we validate the request before
export function useCreateConnector(clusterName: ClusterName) {
  const mutate = useCreateConnectorMutation(clusterName);

  return {
    createResource: async (param: CreateConnectorProps) => {
      return mutate.mutateAsync(param);
    },
    ...mutate,
  };
}

export function useDeleteConnector(props: UseConnectorProps) {
  const client = useQueryClient();

  return useMutation({
    mutationFn: () => api.deleteConnector(props),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: connectorsKey(props.clusterName) }),
  });
}
