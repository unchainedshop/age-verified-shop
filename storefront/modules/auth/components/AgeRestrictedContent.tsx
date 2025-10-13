export default function AgeRestrictedContent({
  restricted,
  children,
  className,
}: {
  restricted: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!restricted) return children;
  return (
    <div className={`${className}`}>
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-10">
        Please verify your age to view this content
      </div>
      {children}
    </div>
  );
}
