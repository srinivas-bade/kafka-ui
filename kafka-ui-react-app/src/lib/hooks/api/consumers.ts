import { consumerGroupsApiClient as api } from 'lib/api';
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { ClusterName } from 'redux/interfaces';
import {
  ConsumerGroup,
  ConsumerGroupOffsetsReset,
  ConsumerGroupOrdering,
  SortOrder,
} from 'generated-sources';
import { showSuccessAlert } from 'lib/errorHandling';

export type ConsumerGroupID = ConsumerGroup['groupId'];

type UseConsumerGroupsProps = {
  clusterName: ClusterName;
  orderBy?: ConsumerGroupOrdering;
  sortOrder?: SortOrder;
  page?: number;
  perPage?: number;
  search: string;
};

type UseConsumerGroupDetailsProps = {
  clusterName: ClusterName;
  consumerGroupID: ConsumerGroupID;
};

export function useConsumerGroups(props: UseConsumerGroupsProps) {
  const { clusterName, ...rest } = props;
  return useQuery({
    queryKey: ['clusters', clusterName, 'consumerGroups', rest],
    queryFn: () => api.getConsumerGroupsPage(props),
    placeholderData: keepPreviousData,
  });
}

export function useConsumerGroupDetails(props: UseConsumerGroupDetailsProps) {
  const { clusterName, consumerGroupID } = props;
  return useSuspenseQuery({
    queryKey: ['clusters', clusterName, 'consumerGroups', consumerGroupID],
    queryFn: () => api.getConsumerGroup({ clusterName, id: consumerGroupID }),
  });
}

export const useDeleteConsumerGroupMutation = ({
  clusterName,
  consumerGroupID,
}: UseConsumerGroupDetailsProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.deleteConsumerGroup({ clusterName, id: consumerGroupID }),
    onSuccess: () => {
      showSuccessAlert({
        message: `Consumer ${consumerGroupID} group deleted`,
      });
      queryClient.invalidateQueries({
        queryKey: ['clusters', clusterName, 'consumerGroups'],
      });
    },
  });
};

export const useResetConsumerGroupOffsetsMutation = ({
  clusterName,
  consumerGroupID,
}: UseConsumerGroupDetailsProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: ConsumerGroupOffsetsReset) =>
      api.resetConsumerGroupOffsets({
        clusterName,
        id: consumerGroupID,
        consumerGroupOffsetsReset: props,
      }),
    onSuccess: () => {
      showSuccessAlert({
        message: `Consumer ${consumerGroupID} group offsets reset`,
      });
      queryClient.invalidateQueries({
        queryKey: ['clusters', clusterName, 'consumerGroups'],
      });
    },
  });
};
