import React, { useState, useEffect } from 'react';
import { Book, BookFormData } from '../types/Book';
import { X, Plus, Edit3 } from 'lucide-react';

interface BookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: BookFormData) => void;
  editingBook?: Book | null;
}

export const BookForm: React.FC<BookFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingBook,
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    accessionNumber: '',
    title: '',
    publisherName: '',
    authors: '',
    locationName: '',
    status: 'Available',
  });

  const [errors, setErrors] = useState<Partial<BookFormData>>({});

  useEffect(() => {
    if (editingBook) {
      setFormData({
        accessionNumber: editingBook.accessionNumber,
        title: editingBook.title,
        publisherName: editingBook.publisherName,
        authors: editingBook.authors,
        locationName: editingBook.locationName,
        status: editingBook.status,
      });
    } else {
      setFormData({
        accessionNumber: '',
        title: '',
        publisherName: '',
        authors: '',
        locationName: '',
        status: 'Available',
      });
    }
    setErrors({});
  }, [editingBook, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormData> = {};

    if (!formData.accessionNumber.trim()) {
      newErrors.accessionNumber = 'Accession number is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.publisherName.trim()) {
      newErrors.publisherName = 'Publisher name is required';
    }
    if (!formData.authors.trim()) {
      newErrors.authors = 'Authors are required';
    }
    if (!formData.locationName.trim()) {
      newErrors.locationName = 'Location name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {editingBook ? (
              <Edit3 className="w-6 h-6 text-primary-600" />
            ) : (
              <Plus className="w-6 h-6 text-primary-600" />
            )}
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Accession Number *
              </label>
              <input
                type="text"
                name="accessionNumber"
                value={formData.accessionNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.accessionNumber
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter accession number"
              />
              {errors.accessionNumber && (
                <p className="text-sm text-red-500">{errors.accessionNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.title
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter book title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Publisher Name *
              </label>
              <input
                type="text"
                name="publisherName"
                value={formData.publisherName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.publisherName
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter publisher name"
              />
              {errors.publisherName && (
                <p className="text-sm text-red-500">{errors.publisherName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Authors *
              </label>
              <input
                type="text"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.authors
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter author names"
              />
              {errors.authors && (
                <p className="text-sm text-red-500">{errors.authors}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location Name *
              </label>
              <input
                type="text"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.locationName
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter location name"
              />
              {errors.locationName && (
                <p className="text-sm text-red-500">{errors.locationName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Available">Available</option>
                <option value="Issued">Issued</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {editingBook ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};