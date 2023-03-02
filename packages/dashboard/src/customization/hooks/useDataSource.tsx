import { SiteWiseQuery } from '@iot-app-kit/source-iotsitewise';
import React, { ReactNode, useContext, useState } from 'react';

type DataSource = { name: string; query: SiteWiseQuery | undefined };

type Dispatcher = React.Dispatch<
  React.SetStateAction<{
    name: string;
    query: SiteWiseQuery | undefined;
  }>
>;

/**
 * Context to access a data source provided to the dashboard
 */
const DataSourceContext = React.createContext<{ dataSource: DataSource; update: Dispatcher }>({
  dataSource: { name: 'iotsitewise', query: undefined },
  update: () => {},
});

interface DataSourceProviderProps {
  query?: SiteWiseQuery;
  children: ReactNode;
}

export const DataSourceProvider: React.FC<DataSourceProviderProps> = ({ children, query }) => {
  const [dataSource, setDataSource] = useState({ name: 'iotsitewise', query });

  return (
    <DataSourceContext.Provider value={{ dataSource, update: setDataSource }}>{children}</DataSourceContext.Provider>
  );
};

export const useDataSource = () => {
  const { dataSource, update } = useContext(DataSourceContext);
  return { dataSource, update };
};
