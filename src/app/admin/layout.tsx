import Link from 'next/link';
import { logout } from '@/app/actions/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <nav className="space-x-4">
            <Link href="/admin/products" className="text-gray-600 hover:text-blue-600 font-medium">
              Товари (Products)
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors">
            Повернутися на сайт
          </Link>
          <form action={logout}>
            <button type="submit" className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors">
              Вийти
            </button>
          </form>
        </div>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
