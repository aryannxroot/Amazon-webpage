export const cart = [];

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