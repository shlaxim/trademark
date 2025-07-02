export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Trademark Registration System</h1>
        <p className="text-xl mb-4">
          A comprehensive platform for searching, filing, and monitoring trademark applications.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Search Trademarks</h2>
            <p>Search existing trademarks across multiple jurisdictions to ensure your mark is unique.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Start Search
            </button>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Register Trademark</h2>
            <p>Begin the process of registering your trademark with our streamlined application system.</p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Start Registration
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}