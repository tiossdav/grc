import DOMPurify from "dompurify";

export const SafeHTML = ({
  html,
  className,
}: {
  html: string;
  className?: string;
}) => {
  const cleanHTML = DOMPurify.sanitize(html);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};
