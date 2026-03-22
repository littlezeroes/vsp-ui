export default function IALayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* Hide Next.js dev tools in wireframe iframes */
        [data-nextjs-dialog-overlay],
        [data-nextjs-toast],
        nextjs-portal,
        #__next-build-indicator,
        [data-next-dev-tools-button],
        button[title="Open Next.js Dev Tools"],
        [class*="dev-tools"],
        body > div:last-child:not(#__next) {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}
