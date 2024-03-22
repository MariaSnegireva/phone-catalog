/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { UpgratedProduct } from '../types/UpgratedProduct';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';

type Props = {
  children: React.ReactNode;
};

type Action = ''
| 'favourites'
| 'cart'
| 'remove'
| 'minusQuantity'
| 'plusQuantity';

type Store = {
  products: UpgratedProduct[],
  localStorage: UpgratedProduct[],
  handleAction: (product: UpgratedProduct, action: Action) => void,
  totalCartQuantity: number,
  isError: boolean,
  isLoading: boolean,
};

const initialStore: Store = {
  products: [],
  localStorage: [],
  handleAction: () => {},
  totalCartQuantity: 0,
  isError: false,
  isLoading: false,
};

export const StateStore = React.createContext(initialStore);

export const StoreContext: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<UpgratedProduct[]>([]);
  const [localStorage, setLocalStorage] = useLocalStorage<UpgratedProduct[]>('products', []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getProducts()
      .then(resolve => {
        const newProducts = resolve.map(item => {
          return localStorage.find((currentItem : Product) => currentItem.id === item.id)
            || ({
              ...item,
              addedToFavourites: false,
              addedToCart: false,
              quantity: 1,
            });
        });

        setProducts(newProducts);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cartProducts = products.filter(product => product.addedToCart);
    const totalQuantity = cartProducts.reduce((total, product) => total + product.quantity, 0);
    setTotalCartQuantity(totalQuantity);
  }, [products]);

  const handleAction = (product: UpgratedProduct, action: Action) => {
    const newProducts = [...products];
    const indexOfProduct = newProducts.indexOf(product);

    switch (action) {
      case 'favourites':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, addedToFavourites: !product.addedToFavourites },
        );
        break;

      case 'cart':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, addedToCart: !product.addedToCart },
        );
        break;

      case 'remove':
        newProducts.splice(
          indexOfProduct,
          1,
          {
            ...product,
            addedToCart: false,
            quantity: 1,
          },
        );
        break;

      case 'minusQuantity':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, quantity: product.quantity - 1 },
        );
        break;

      case 'plusQuantity':
        newProducts.splice(
          indexOfProduct,
          1,
          { ...product, quantity: product.quantity + 1 },
        );
        break;

      default:
        break;
    }

    setProducts(newProducts);
    setLocalStorage(newProducts.filter(item => item.addedToFavourites || item.addedToCart));
  };

  const store: Store = {
    products,
    localStorage,
    handleAction,
    totalCartQuantity,
    isError,
    isLoading,
  };

  return (
    <StateStore.Provider value={store}>
      {children}
    </StateStore.Provider>
  );
};
