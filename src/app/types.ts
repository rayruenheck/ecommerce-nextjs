export interface product {
    id: number
    title: string
    price: string
    category: string
    description: string
    image: string
}

export interface productable {
    product: product
}

export interface cartitem {
    id: number
    image: string
    product_id: number
    product_category: string
    product_name: string
    quantity: number
    price: number
    usertoken: string
}

export interface cartable {
    cart: cartitem
    updateCartItem : (itemId:number) =>void
}

export interface favoriteitem {
    id: number
    product_id : string
    image: string
    product_category: string
    product_name: string
    price: number
    usertoken: string
}
export interface favoriteable {
    favorite: favoriteitem
    updateFavoriteItem : (itemId:number) =>void
}

