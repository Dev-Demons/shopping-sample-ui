export interface AddProductCart {
    product: number;
    type: string;
}

export interface AddPackageCart {
    package: number;
    type: string;
}

export interface Cart {
    id: number;
    total_amount: number;
    created_at: string;
    owner: number;
    products: Product[];
}

interface Product {
    id: number;
    product_title: string;
    product_file: string;
    product_watermarked_file: string;
    product_owner: {
        id: number;
        email: string;
    }
    product_useship_price: number;
    product_created_at: string;
    package_product: Package_Product;
    type: string;
    package: number;
}

export interface Package_Product{
    id: number,
    products: Products[],
    title: string,
    created_at: string,
    ownership_price: number,
    useship_price: number,
    owner: number
}

export interface Products {
    product_created_at: string,
    product_watermarked_file: string    
}
    
export interface CartState {
    items: Cart;
    isLoading: boolean;
    error: string;
}

export interface shoppingState {
    status: string;
    error: unknown;
    data: any;
    cartdata: any;
  }
