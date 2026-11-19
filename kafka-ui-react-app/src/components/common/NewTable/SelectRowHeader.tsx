import { HeaderContext, RowData } from '@tanstack/react-table';
import React from 'react';
import IndeterminateCheckbox from 'components/common/IndeterminateCheckbox/IndeterminateCheckbox';

import type { TableFeatures } from './features';

const SelectRowHeader = <TData extends RowData>({
  table,
}: HeaderContext<TableFeatures, TData, unknown>) => (
  <IndeterminateCheckbox
    checked={table.getIsAllRowsSelected()}
    indeterminate={
      table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
    }
    onChange={table.getToggleAllRowsSelectedHandler()}
  />
);

export default SelectRowHeader;
