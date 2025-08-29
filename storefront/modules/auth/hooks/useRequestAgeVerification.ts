import { useCallback, useEffect, useRef, useState } from 'react';

const useRequestAgeVerification = ({
  skip = false,
}: { skip?: boolean } = {}) => {
  const [data, setData] = useState<any>(null);
  const sourceRef = useRef<EventSource | null>(null);

  const createEventSource = useCallback(() => {
    const uri =
      typeof window === 'undefined'
        ? process.env.UNCHAINED_ENDPOINT || 'http://localhost:4010/graphql'
        : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
          `${window.origin}/graphql`;

    const url = new URL(`${uri}`);
    url.searchParams.append(
      'query',
      `subscription RequestAgeVerification {
        requestAgeVerification {
          _id
          state
          verificationLink
          verificationDeepLink
          presentationDefinition
        }
      }`,
    );

    const source = new EventSource(url, {
      withCredentials: true,
    });

    source.addEventListener('next', (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed?.data?.requestAgeVerification || parsed?.data);
      } catch (err) {
        console.error('Failed to parse event data:', err);
      }
    });

    source.addEventListener('error', (e) => {
      console.error(e);
    });

    source.addEventListener('complete', () => {
      source.close();
    });

    return source;
  }, [setData]);

  useEffect(() => {
    if (skip) return;
    sourceRef.current = createEventSource();
    return () => {
      sourceRef.current?.close();
      sourceRef.current = null;
    };
  }, [createEventSource, skip]);

  const reset = () => {
    sourceRef.current?.close();
    sourceRef.current = createEventSource();
    setData(null);
  };

  return { verificationRequest: data, reset };
};

export default useRequestAgeVerification;
