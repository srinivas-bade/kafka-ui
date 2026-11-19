import { CellContext, RowData } from '@tanstack/react-table';
import React from 'react';
import IndeterminateCheckbox from 'components/common/IndeterminateCheckbox/IndeterminateCheckbox';

import type { TableFeatures } from './features';

const SelectRowCell = <TData extends RowData>({
  row,
}: CellContext<TableFeatures, TData, unknown>) => (
  <IndeterminateCheckbox
    checked={row.getIsSelected()}
    disabled={!row.getCanSelect()}
    indeterminate={row.getIsSomeSelected()}
    onChange={row.getToggleSelectedHandler()}
  />
);

export default SelectRowCell;
