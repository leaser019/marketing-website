
import { ApolloProviderWrapper } from "@/components/common/ApolloProviderWrapper";

export default function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         <ApolloProviderWrapper>
          {children}
          </ApolloProviderWrapper>
      </body>
    </html>
  );
}
