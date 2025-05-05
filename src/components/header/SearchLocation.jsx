import { DatePicker, Input } from 'antd';
import { useSearchLocation } from '../../hooks/listings/useSearchLocation.jsx';
import { useMemo, useState } from 'react';
import { debounce, uniqBy } from 'lodash';

function SearchLocation() {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useMemo(() => debounce(setQuery, 500), []);

  const { data, isPending } = useSearchLocation(query, {
    enabled: query.length > 2,
  });
  const unqResults = uniqBy(data, 'location');
  console.log('🚀 ~ SearchLocation ~ unqResults: ', unqResults);

  function handleSearchInputChange(e) {
    debouncedSearchTerm(e.target.value);
  }

  return (
    <div>
      <Input placeholder='Search..' onChange={handleSearchInputChange} className='!border-none focus:!shadow-none' />
      <DatePicker.RangePicker size='small' />
    </div>
  );
}

export default SearchLocation;
