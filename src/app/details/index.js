import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import Head from "../../components/head";
import Controls from "../../components/controls";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import DetailsCart from "../../components/details-cart";
import PageLayout from "../../components/page-layout";

function DetailsInfo() {
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    activeModal: state.modals.name,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      (item) => {
        return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} />;
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Название Товара" />
      <DetailsCart
        onAdd={callbacks.addToBasket}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
    </PageLayout>
  );
}

export default memo(DetailsInfo);
