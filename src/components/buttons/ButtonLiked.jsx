import { Button, message } from 'antd';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useLikedToggle } from '../../hooks/liked/useLikedToggle.js';
import { useIsLiked } from '../../hooks/liked/useIsLiked.js';
import { useTranslation } from 'react-i18next';
import { setIsLoginOpen } from '../../store/modalSlice.js';

function ButtonLiked({ listID, text = true, iconSize = 17, card = false, className, ...props }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { id: listingId } = useParams();
  const { mutate, isPending } = useLikedToggle();
  const finalListID = listID || listingId;
  const { data: isLiked } = useIsLiked(user?.id, finalListID);
  const { t } = useTranslation();

  const handleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (user && finalListID) {
        mutate(
          { userId: user.id, listingId: finalListID },
          {
            onSuccess: (data) => {
              if (data.status === 'added') {
                return message.success(t('added_to_wishlist'));
              } else if (data.status === 'removed') {
                return message.success(t('removed_from_wishlist'));
              }
            },
            onError: () => message.error(t('error_saving')),
          },
        );
      } else if (!user) {
        dispatch(setIsLoginOpen());
      }
    },
    [mutate, user, finalListID, t, dispatch],
  );

  if (!card)
    return (
      <Button
        type='text'
        className={clsx('flex items-center underline duration-300', className)}
        {...props}
        onClick={handleWishlist}
        loading={isPending}
        disabled={isPending}
      >
        <Icon
          icon={text ? 'mdi:heart-outline' : 'line-md:heart-twotone'}
          width={iconSize}
          className={isLiked && '!text-primary'}
        />
        {text && (isLiked ? t('saved') : t('save'))}
      </Button>
    );

  if (card)
    return (
      <Icon
        key={user}
        icon='line-md:heart-twotone'
        width={28}
        className={clsx(
          'cursor-pointer text-white duration-200 hover:scale-115 active:scale-100',
          isLiked && '!text-primary',
        )}
        onClick={handleWishlist}
      />
    );
}

export default memo(ButtonLiked);
