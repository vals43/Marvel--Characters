import ComponentViewer from './components/ComponentViewer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-800 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-100">
      <div className="w-full max-w-5xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl-custom p-8 md:p-12 lg:p-16 border border-gray-700 backdrop-blur-sm bg-opacity-90 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <h1 className="text-6xl font-extrabold text-center mb-12 tracking-tight relative z-10">
          <span className="text-red-600 drop-shadow-md">MARVEL</span> <span className="text-gray-200">Characters</span>
        </h1>
        
        <ComponentViewer />
      </div>
    </div>
  );
}
