import { useCallback } from 'react';
import _ from 'lodash';
import cartSlice from '@store/cart';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import ProductCard from '@modules/cartAside/components/organisms/ProductCard';
import { Cart, Item } from '@entities/cart/cart.entity';
import updateItem from '@use-cases/cart/update-item';
import deleteItem from '@use-cases/cart/delete-item';
import { AvailableProductText, BodyContainer } from './styles';
import ProductCardWithouthStock from '@modules/cartAside/components/organisms/ProductCardWithoutStock';
import useItemWithoutStock from '@hooks/useItemWithoutStock';
import { useAnalytics } from '@hooks/useAnalytics';
import { Loader } from '@modules/cart/sections/main/styles';

const Body = () => {
  // Hooks
  const { cartId, cartBFF, loading } = useAppSelector((state) => state.cart);
  const { joinProductUnavailable } = useItemWithoutStock(cartBFF as Cart);
  const dispatch = useAppDispatch();
  const {
    decrementProductQuantity,
    incrementProductQuantity,
    removeProduct,
    resetSelectedQuantityMinicart,
  } = cartSlice.actions;

  const {
    methods: { sendQuantityClickEvent },
  } = useAnalytics();

  const getLastPaintingCode = (item: Item, action: number) => {
    const colorCodes = item.product?.colorCodes;
    if (!colorCodes || colorCodes.length === 0) return undefined;

    const prevTotalQuantity = colorCodes.reduce((acc, colorCode) => {
      return acc + colorCode.quantity;
    }, 0);

    const lastColorCode = colorCodes[colorCodes.length - 1];
    const newQuantity =
      item.quantity + action - prevTotalQuantity + lastColorCode.quantity;

    // update with quantity 0 --> remove the last color
    if (action === -1 && newQuantity <= 0) {
      return {
        code: lastColorCode.code,
        hexColor: lastColorCode.hexColor,
        quantity: 0,
        itemQuantity: prevTotalQuantity - lastColorCode.quantity,
      };
    }

    return {
      code: lastColorCode.code,
      hexColor: lastColorCode.hexColor,
      quantity: newQuantity,
      itemQuantity: item.quantity + action,
    };
  };

  // Methods
  const methods = {
    incrementQuantity: (item: Item, index: number) => {
      sendQuantityClickEvent({
        event: 'addToCart',
        eventType: 'CH',
        ecommerce: {
          currencyCode: 'CLP',
          add: {
            products: [
              {
                name: item?.product?.description,
                id: item?.product?.sku,
                price: item?.product?.prices?.normalPrice?.toString(),
                brand: item?.product?.brand,
                category: item?.product?.category,
                variant: '',
                quantity: 1,
              },
            ],
          },
        },
      });
      methods.handleIncrementQuantity(item, index);
    },
    handleIncrementQuantity: useCallback(
      _.debounce((item: Item, index: number) => {
        const quantity = item.quantity ?? 0;
        const lastPaintingCode = getLastPaintingCode(item, 1);

        dispatch(
          updateItem({
            cartId: cartId ?? '',
            items: [
              {
                quantity: lastPaintingCode
                  ? lastPaintingCode.itemQuantity
                  : quantity + 1,
                index: index,
                paintingCode: lastPaintingCode
                  ? _.omit(lastPaintingCode, ['itemQuantity'])
                  : undefined,
              },
            ],
            sentFrom: 'MINICART',
          }),
        );
        sendQuantityClickEvent({
          event: 'addToCart',
          eventType: 'CH',
          ecommerce: {
            currencyCode: 'CLP',
            add: {
              products: [
                {
                  name: item?.product?.description,
                  id: item?.product?.sku,
                  price: item?.product?.prices?.normalPrice?.toString(),
                  brand: item?.product?.brand,
                  category: item?.product?.category,
                  variant: '',
                  quantity: 1,
                },
              ],
            },
          },
        });
      }, 500),
      [],
    ),
    handleDecrementQuantity: useCallback(
      _.debounce((item: Item, index: number) => {
        const quantity = item.quantity ?? 0;
        const lastPaintingCode = getLastPaintingCode(item, -1);
        dispatch(
          updateItem({
            cartId: cartId ?? '',
            items: [
              {
                quantity: lastPaintingCode
                  ? lastPaintingCode.itemQuantity
                  : quantity - 1,
                index: index,
                paintingCode: lastPaintingCode
                  ? _.omit(lastPaintingCode, ['itemQuantity'])
                  : undefined,
              },
            ],
            sentFrom: 'MINICART',
          }),
        );
        sendQuantityClickEvent({
          event: 'removeFromCart',
          eventType: 'CH',
          ecommerce: {
            currencyCode: 'CLP',
            remove: {
              products: [
                {
                  name: item?.product?.description,
                  id: item?.product?.sku,
                  price: item?.product?.prices.normalPrice?.toString(),
                  brand: item?.product?.brand,
                  category: item?.product?.category,
                  variant: '',
                  quantity: 1,
                },
              ],
            },
          },
        });
      }, 500),
      [],
    ),

    handleRemoveFromCart: (index: number) => {
      dispatch(removeProduct(index));
      dispatch(
        deleteItem({
          cartId: cartId ?? '',
          itemIndex: index,
          sentFrom: 'MINICART',
        }),
      );
    },
    sendRemoveFromCart: (item: Item, index: number) => {
      sendQuantityClickEvent({
        event: 'removeFromCart',
        eventType: 'CH',
        ecommerce: {
          currencyCode: 'CLP',
          remove: {
            products: [
              {
                name: item?.product?.description,
                id: item?.product?.sku,
                price: item?.product?.prices.normalPrice?.toString(),
                brand: item?.product?.brand,
                category: item?.product?.category,
                variant: '',
                quantity: item?.quantity,
              },
            ],
          },
        },
      });
    },
  };

  const renderProductWithoutStock = () => {
    return (
      <>
        <ProductCardWithouthStock
          items={joinProductUnavailable}
          onRemoveFromCart={(index: number) => {
            methods.handleRemoveFromCart(index);
          }}
        />
        <AvailableProductText>Productos disponibles</AvailableProductText>
      </>
    );
  };

  return (
    <BodyContainer data-id="cart-aside">
      {loading && <Loader />}
      {joinProductUnavailable?.length ? renderProductWithoutStock() : null}

      {cartBFF?.items?.map((item: Item, index: number) => (
        <ProductCard
          key={item.itemId}
          item={item}
          index={index}
          onRemoveFromCart={() => {
            methods.handleRemoveFromCart(index);
            methods.sendRemoveFromCart(item, index);
          }}
          onIncrementQuantity={() => {
            dispatch(incrementProductQuantity(index));
            dispatch(resetSelectedQuantityMinicart());
            methods.handleIncrementQuantity(item, index);
          }}
          onDecrementQuantity={() => {
            dispatch(decrementProductQuantity(index));
            dispatch(resetSelectedQuantityMinicart());
            methods.handleDecrementQuantity(item, index);
          }}
        />
      ))}
    </BodyContainer>
  );
};

export default Body;
