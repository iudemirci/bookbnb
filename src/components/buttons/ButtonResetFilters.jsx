import { Button } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

function ButtonResetFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasFilters = useMemo(() => {
    return searchParams.size > 0;
  }, [searchParams]);

  const handleClick = () => {
    if (!hasFilters) return;
    setSearchParams({});
  };

  return (
    <Button size='large' onClick={handleClick}>
      Reset Filters
    </Button>
  );
}

export default ButtonResetFilters;
