import { Button, message } from 'antd';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useWishlistToggle } from '../../hooks/wishlist/useWishlistToggle.js';
import { useIsWishlisted } from '../../hooks/wishlist/useIsWishlisted.js';
import { useTranslation } from 'react-i18next';

function ButtonWishlist({ listID, text = true, iconSize = 17, card = false, className, ...props }) {
  const user = useSelector((state) => state.auth.user);

  const { id: listingId } = useParams();
  const { mutate, isPending } = useWishlistToggle();
  const finalListID = listID || listingId;
  const { data: isWishlisted, isPending: isWishlistPending } = useIsWishlisted(user?.id, finalListID);
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
      }
    },
    [mutate, user, finalListID],
  );

  if (!card)
    return (
      <Button
        type='text'
        className={clsx('flex items-center underline duration-300', className)}
        {...props}
        onClick={handleWishlist}
        loading={isPending || isWishlistPending}
        disabled={isPending || isWishlistPending}
      >
        <Icon
          icon={text ? 'mdi:heart-outline' : 'line-md:heart-twotone'}
          width={iconSize}
          className={isWishlisted && '!text-primary'}
        />
        {text && (isWishlisted ? t('saved') : t('save'))}
      </Button>
    );

  if (card)
    return (
      <Icon
        icon='line-md:heart-twotone'
        width={28}
        className={clsx(
          'cursor-pointer text-white duration-200 hover:scale-115 active:scale-100',
          isWishlisted && '!text-primary',
        )}
        onClick={handleWishlist}
      />
    );
}

export default memo(ButtonWishlist);
