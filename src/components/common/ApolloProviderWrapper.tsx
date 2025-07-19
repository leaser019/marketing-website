"use client";

import { ApolloLink, FetchPolicy, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = new HttpLink({
    uri:  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });

    return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'network only' as FetchPolicy,
      },
      watchQuery: {
        fetchPolicy: 'network only' as FetchPolicy,
      },
    },
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloProviderWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}