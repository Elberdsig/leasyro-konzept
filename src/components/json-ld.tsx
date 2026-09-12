/** Renders one or more JSON-LD graphs into the document. */

export function JsonLd({ data }: { data: object | object[] }) {
  const graphs = Array.isArray(data) ? data : [data];
  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          // The payload is built from our own content files; escaping "<" keeps
          // it from ever terminating the script element early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
