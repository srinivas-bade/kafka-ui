import { CellContext, RowData } from '@tanstack/react-table';
import React from 'react';
import getTagColor from 'components/common/Tag/getTagColor';
import { Tag } from 'components/common/Tag/Tag.styled';

import type { TableFeatures } from './features';

const TagCell = <TData extends RowData>({
  getValue,
}: CellContext<TableFeatures, TData, unknown>) => {
  const value = getValue<string>();
  return <Tag color={getTagColor(value)}>{value}</Tag>;
};

export default TagCell;
