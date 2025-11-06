import Navbar from "@/components/navbar/Navbar.component";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-violet-50">
      <div className="flex justify-end p-4 absolute top-0 right-0 w-full">
      <Navbar/>

      </div>
      <div className="flex items-center min-h-screen justify-center">

      {children}
      </div>
    </div>
  )
}
