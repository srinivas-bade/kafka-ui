import React from 'react';
import { FullConnectorInfo } from 'generated-sources';
import { CellContext } from '@tanstack/react-table';
import type { TableFeatures } from 'components/common/NewTable/features';

const RunningTasksCell: React.FC<
  CellContext<TableFeatures, FullConnectorInfo, unknown>
> = ({ row }) => {
  const { tasksCount, failedTasksCount } = row.original;

  if (!tasksCount) {
    return null;
  }

  return (
    <>
      {tasksCount - (failedTasksCount || 0)} of {tasksCount}
    </>
  );
};

export default RunningTasksCell;
