
export const deliveryOptions = [{
    id : '1',
    deliverDays : 7,
    priceCents : 0
 },
{
    id : '2',
    deliverDays : 3,
    priceCents : 499
},
{
    id : '3',
    deliverDays : 1,
    priceCents : 999
}];


export function getDeliveryOption(deliveryOptionId){
    const deliveryOption = deliveryOptions.find((deliveryOption) => {
        return deliveryOption.id === deliveryOptionId;
    });

    return deliveryOption || deliveryOptions[0];

}