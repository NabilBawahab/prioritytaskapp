export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="border p-6 rounded-xl shadow-sm border-slate-300">
        {children}
      </div>
    </main>
  );
}
