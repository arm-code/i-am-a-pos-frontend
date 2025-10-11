// components/topbar/Topbar.tsx
export default function Topbar({
  session,
  title,
  subtitle,
}: {
  session: any;
  title?: string;
  subtitle?: string;
}) {
  return (
    <header
      className="flex items-center fixed top-0 z-40 bg-white border-b border-gray-200 px-2 h-15 shadow-sm transition-all duration-300"
      style={{ left: "var(--sidebar-width)", right: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-900">
            {title ?? `Dashboard - ${session ? "Bienvenido" : "Acceso Público"}`}
          </h1>
          {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
        </div>        
      </div>
    </header>
  );
}
