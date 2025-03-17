'use client';
import { getQueryClient } from './get-client-query-client';
import type * as React from 'react';
import { getGraphqlUrl } from '@snapwp/core/config';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    const uri = getGraphqlUrl()
    return (
      <ApolloNextAppProvider makeClient={()=>getQueryClient(uri)}>
        {children}
      </ApolloNextAppProvider>
    );
  }