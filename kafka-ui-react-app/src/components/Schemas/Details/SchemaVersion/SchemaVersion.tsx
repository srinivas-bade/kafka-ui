import React from 'react';
import EditorViewer from 'components/common/EditorViewer/EditorViewer';
import { SchemaSubject } from 'generated-sources';
import { Row } from '@tanstack/react-table';
import type { TableFeatures } from 'components/common/NewTable/features';

interface Props {
  row: Row<TableFeatures, SchemaSubject>;
}

const SchemaVersion: React.FC<Props> = ({ row }) => {
  return (
    <EditorViewer
      data={row?.original?.schema}
      schemaType={row?.original?.schemaType}
    />
  );
};

export default SchemaVersion;
