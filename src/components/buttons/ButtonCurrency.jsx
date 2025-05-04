import { Button } from 'antd';
import { setIsLanguageAndCurrencyOpen } from '../../store/modalSlice.js';
import { useDispatch } from 'react-redux';

function ButtonCurrency() {
  const dispatch = useDispatch();

  function showModal() {
    dispatch(setIsLanguageAndCurrencyOpen('2'));
  }

  return (
    <Button type='text' onClick={showModal}>
      ₺ TRY
    </Button>
  );
}

export default ButtonCurrency;
