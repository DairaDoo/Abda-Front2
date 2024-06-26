import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { ProductInterface } from '../../lib/products/ProductInterface';
import Loader from '@/app/lib/loader';

interface ProductsContainerProps {
  apiUrl: string; // URL to fetch product data
  section_name: string;
  fetchCartItemCount: () => void;
}

const ProductsContainer: React.FC<ProductsContainerProps> = ({ apiUrl, section_name, fetchCartItemCount}) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

    const [loader, setLoader] = useState(false)


  useEffect(() => {
    console.log('Effect hook triggered');
      setLoader(true)
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data: ProductInterface[] = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          const sortedData = data.sort((a, b) => (b.wanted_count ?? 0) - (a.wanted_count ?? 0));
          setProducts(sortedData);
          console.log(sortedData)
            setLoader(false)
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

      fetchProducts();
    }, [apiUrl]);
    
    if (loader) {
      return <Loader/>;
  }
    return (<>
      <h2 className=' flex flex-1 justify-center text-center align-top text-2xl md:text-4xl  font-bold'>{section_name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map(product => (
          <ProductCard key={product.general_product_id} product={product} fetchCartItemCount={fetchCartItemCount}/>
        ))}
      </div>
    </>
  );
};

export default ProductsContainer;
