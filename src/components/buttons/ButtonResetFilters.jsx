import { Button } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { t } from 'i18next';

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
      {t('reset')}
    </Button>
  );
}

export default ButtonResetFilters;
