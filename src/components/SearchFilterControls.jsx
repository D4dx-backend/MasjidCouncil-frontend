import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";

const SearchFilterControls = ({ 
  data, 
  onFilteredDataChange, 
  searchFields = ['mosqueName'], 
  filterFields = ['status', 'district'],
  uniqueFieldValues = {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});

  // Initialize filters based on filterFields
  useEffect(() => {
    const initialFilters = {};
    filterFields.forEach(field => {
      initialFilters[field] = 'all';
    });
    setFilters(initialFilters);
  }, [filterFields]);

  // Filter and search logic
  useEffect(() => {
    let filtered = data || [];

    // Search functionality
    if (searchTerm && searchFields.length > 0) {
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const fieldValue = getNestedValue(item, field);
          return fieldValue?.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    // Filter functionality
    filterFields.forEach(field => {
      if (filters[field] && filters[field] !== 'all') {
        filtered = filtered.filter(item => {
          const fieldValue = getNestedValue(item, field);
          return fieldValue === filters[field];
        });
      }
    });

    onFilteredDataChange(filtered);
  }, [data, searchTerm, filters, searchFields, filterFields, onFilteredDataChange]);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShowFilter(false);
    }
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      setShowSearch(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getUniqueValues = (field) => {
    if (uniqueFieldValues[field]) {
      return uniqueFieldValues[field];
    }
    return [...new Set(data?.map(item => getNestedValue(item, field)).filter(Boolean))];
  };

  const getSearchPlaceholder = () => {
    if (searchFields.includes('mosqueName')) return 'Search by mosque name...';
    if (searchFields.includes('name')) return 'Search by name...';
    return 'Search...';
  };

  return (
    <div className="flex items-center gap-4 h-12">
      {/* Search Button that Expands */}
      <div className="flex items-center h-10">
        {!showSearch ? (
          <button
            onClick={toggleSearch}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-500 h-10"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        ) : (
          <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-500">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-lg transition-all duration-500 w-80 h-10"
                autoFocus
              />
            </div>
            <button
              onClick={() => setShowSearch(false)}
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Filter Button that Expands */}
      <div className="flex items-center h-10">
        {!showFilter ? (
          <button
            onClick={toggleFilter}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-500 h-10"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        ) : (
          <div className="flex items-center gap-2 animate-in slide-in-from-right-4 duration-500">
            <div className="flex gap-2 bg-white p-2 rounded-lg shadow-lg border border-gray-300 h-10 items-center">
              {filterFields.map(field => (
                <select
                  key={field}
                  value={filters[field] || 'all'}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm h-8"
                >
                  <option value="all">
                    All {field.charAt(0).toUpperCase() + field.slice(1)}
                  </option>
                  {getUniqueValues(field).map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ))}
            </div>
            <button
              onClick={() => setShowFilter(false)}
              className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterControls;
