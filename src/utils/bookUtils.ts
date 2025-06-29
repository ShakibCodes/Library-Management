import { Book, BookFormData } from '../types/Book';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createBook = (formData: BookFormData): Book => {
  const now = new Date();
  return {
    id: generateId(),
    ...formData,
    createdAt: now,
    updatedAt: now,
  };
};

export const updateBook = (existingBook: Book, formData: BookFormData): Book => {
  return {
    ...existingBook,
    ...formData,
    updatedAt: new Date(),
  };
};

export const filterBooks = (
  books: Book[],
  searchTerm: string,
  statusFilter: string
): Book[] => {
  return books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.accessionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || book.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
};