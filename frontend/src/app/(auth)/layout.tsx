export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center items-center h-screen">
      {children}
    </main>
  );
}
