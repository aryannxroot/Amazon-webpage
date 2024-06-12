function Cart(localStorageKey) {
    
const cart = {
    cartItems : JSON.parse(localStorage.getItem(localStorageKey)) || [{

        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 1,
        deliveryOptionId : '1'
    },
    {
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 2,
        deliveryOptionId : '2'
    }],

    saveToStorage() {
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    addToCart(productId){

        const itemFound = this.cartItems.find((cartItem) => {
            return cartItem.productId === productId ;
        })
        if(!itemFound){
            this.cartItems.push({
                productId : productId,
                quantity : 1,
                deliveryOptionId : '1',
            })
        }
    
        else {
            itemFound.quantity += 1;
        }
    
        //save cart to local Storage
        this.saveToStorage();
        console.log(this.cartItems);
    },

    deleteFromCart(productId){
        const newCartItems = [];
    
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId){
                newCartItems.push(cartItem);
            }
        });
        this.cartItems = newCartItems;
    
        this.saveToStorage();
    },

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem ;
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId){
                matchingItem = cartItem;
            }
    
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage(); 
    }

};

return cart ;

}


const cart = Cart('cart-oop');
const businessCart = Cart('business-cart-oop');

// console.log(cart);  
// console.log(businessCart);
