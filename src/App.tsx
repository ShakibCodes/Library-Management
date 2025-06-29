import React, { useState, useEffect } from 'react';
import { Book, BookFormData } from './types/Book';
import { BookForm } from './components/BookForm';
import { BookCard } from './components/BookCard';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { useLocalStorage } from './hooks/useLocalStorage';
import { createBook, updateBook, filterBooks } from './utils/bookUtils';
import { Plus, BookOpen, TrendingUp, CheckCircle, Clock } from 'lucide-react';

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('library-books', []);
  const [isDark, setIsDark] = useLocalStorage('dark-mode', false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredBooks = filterBooks(books, searchTerm, statusFilter);

  const handleAddBook = (formData: BookFormData) => {
    const newBook = createBook(formData);
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleEditBook = (formData: BookFormData) => {
    if (editingBook) {
      const updatedBook = updateBook(editingBook, formData);
      setBooks((prev) =>
        prev.map((book) => (book.id === editingBook.id ? updatedBook : book))
      );
      setEditingBook(null);
    }
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const openEditForm = (book: Book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingBook(null);
  };

  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.status === 'Available').length;
  const issuedBooks = books.filter(book => book.status === 'Issued').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-primary-950 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Library Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your book collection with ease
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Book
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Books</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalBooks}</p>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Available</p>
                <p className="text-3xl font-bold text-green-600">{availableBooks}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issued</p>
                <p className="text-3xl font-bold text-yellow-600">{issuedBooks}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {books.length === 0 ? 'No books yet' : 'No books found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {books.length === 0 
                ? 'Start building your library by adding your first book'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
            {books.length === 0 && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Your First Book
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BookCard
                  book={book}
                  onEdit={openEditForm}
                  onDelete={handleDeleteBook}
                />
              </div>
            ))}
          </div>
        )}

        {/* Book Form Modal */}
        <BookForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          editingBook={editingBook}
        />
      </div>
    </div>
  );
}

export default App;