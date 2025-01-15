export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export enum OrderType {
    Individual = 'Individual',
    Kids = 'Kids',
    Family = 'Family',
}

export enum Area {

}

export enum Process {
    NewShipment = 'New Shipment',
    ShipmentSorting = 'Shipment Sorting',
    ShipmentDispatch = 'Shipment Dispatch',
    ShipmentDelivered = 'Shipment Delivered',
    OverdueOrder = 'Overdue Order',
    OrderQueue = 'Order Queue',
    OrderCuration = 'Order Curation',
    OrderDispatch = 'Order Dispatch',
    OrderDelivered = 'Order Delivered',
}

export enum Role {
    OpsAdmin = 'Ops Lead',
    OpsTeamMember = 'Ops Team',
    DeliveryAssociate = 'Delivery Associate',
    ProductAdmin = 'Product Lead',
    MarketingAdmin = 'Marketing Lead',
    Stylist = 'Stylist',
    Investor = 'Investor',
    CTO = 'CTO',
    COO = 'COO',
    CEO = 'CEO',
    CustomerRepresentative = 'Customer Representative',
}

export enum PaymentProvider {
    PayStack = 'Paystack',
}
