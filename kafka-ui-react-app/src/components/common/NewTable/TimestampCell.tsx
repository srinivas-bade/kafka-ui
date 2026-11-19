import { CellContext, RowData } from '@tanstack/react-table';
import { formatTimestamp } from 'lib/dateTimeHelpers';
import React from 'react';

import type { TableFeatures } from './features';
import * as S from './Table.styled';

const TimestampCell = <TData extends RowData>({
  getValue,
}: CellContext<TableFeatures, TData, unknown>) => (
  <S.Nowrap>{formatTimestamp(getValue<string | number>())}</S.Nowrap>
);

export default TimestampCell;
