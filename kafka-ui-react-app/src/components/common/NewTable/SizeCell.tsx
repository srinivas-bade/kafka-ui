import React from 'react';
import { CellContext, RowData } from '@tanstack/react-table';
import BytesFormatted from 'components/common/BytesFormatted/BytesFormatted';

import type { TableFeatures } from './features';

const SizeCell = <TData extends RowData>({
  getValue,
  row,
  renderSegments = false,
  precision = 0,
}: CellContext<TableFeatures, TData, unknown> & {
  renderSegments?: boolean;
  precision?: number;
}) => (
  <>
    <BytesFormatted value={getValue<string | number>()} precision={precision} />
    {renderSegments
      ? `, ${'count' in row.original ? row.original.count : undefined} segment(s)`
      : null}
  </>
);

export default SizeCell;
