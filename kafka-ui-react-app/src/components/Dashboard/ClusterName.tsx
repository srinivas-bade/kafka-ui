import React from 'react';
import { CellContext } from '@tanstack/react-table';
import type { TableFeatures } from 'components/common/NewTable/features';
import { Tag } from 'components/common/Tag/Tag.styled';
import { Cluster } from 'generated-sources';

type ClusterNameProps = CellContext<TableFeatures, Cluster, unknown>;

const ClusterName: React.FC<ClusterNameProps> = ({ row }) => {
  const { readOnly, name } = row.original;
  return (
    <>
      {readOnly && <Tag color="blue">readonly</Tag>}
      {name}
    </>
  );
};

export default ClusterName;
