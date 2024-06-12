export const cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 1
},{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 2
}];

export function addToCart(productId){

    const itemFound = cart.find((cartItem) => {
        return cartItem.productId === productId ;
    })
    if(!itemFound){
        cart.push({
            productId : productId,
            quantity : 1
        })
    }

    else {
        itemFound.quantity += 1;
    }

    console.log(cart);
}