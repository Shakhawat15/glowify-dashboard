const dummyOrders = [
  {
    _id: "1",
    order_id: "ORD001",
    customer_name: "Alice Johnson",
    total_amount: "$120.50",
    status: "completed",
    order_date: "2024-08-25",
    products: [
      {
        product_name: "Laptop",
        quantity: 1,
        price: "$100.00",
      },
      {
        product_name: "Mouse",
        quantity: 1,
        price: "$20.50",
      },
    ],
  },
  {
    _id: "2",
    order_id: "ORD002",
    customer_name: "Bob Smith",
    total_amount: "$75.00",
    status: "pending",
    order_date: "2024-08-26",
    products: [
      {
        product_name: "Keyboard",
        quantity: 2,
        price: "$50.00",
      },
      {
        product_name: "USB Cable",
        quantity: 3,
        price: "$25.00",
      },
    ],
  },
  {
    _id: "3",
    order_id: "ORD003",
    customer_name: "Charlie Brown",
    total_amount: "$200.00",
    status: "completed",
    order_date: "2024-08-27",
    products: [
      {
        product_name: "Smartphone",
        quantity: 1,
        price: "$200.00",
      },
    ],
  },
  {
    _id: "4",
    order_id: "ORD004",
    customer_name: "Diana Prince",
    total_amount: "$95.75",
    status: "pending",
    order_date: "2024-08-28",
    products: [
      {
        product_name: "Headphones",
        quantity: 1,
        price: "$95.75",
      },
    ],
  },
  {
    _id: "5",
    order_id: "ORD005",
    customer_name: "Ethan Hunt",
    total_amount: "$150.00",
    status: "completed",
    order_date: "2024-08-29",
    products: [
      {
        product_name: "Smartwatch",
        quantity: 1,
        price: "$150.00",
      },
    ],
  },
  {
    _id: "6",
    order_id: "ORD006",
    customer_name: "Fiona Gallagher",
    total_amount: "$80.00",
    status: "pending",
    order_date: "2024-08-30",
    products: [
      {
        product_name: "Bluetooth Speaker",
        quantity: 1,
        price: "$80.00",
      },
    ],
  },
  {
    _id: "7",
    order_id: "ORD007",
    customer_name: "George Michael",
    total_amount: "$60.00",
    status: "completed",
    order_date: "2024-08-31",
    products: [
      {
        product_name: "Fitness Tracker",
        quantity: 1,
        price: "$60.00",
      },
    ],
  },
  {
    _id: "8",
    order_id: "ORD008",
    customer_name: "Hannah Montana",
    total_amount: "$110.00",
    status: "pending",
    order_date: "2024-09-01",
    products: [
      {
        product_name: "Tablet",
        quantity: 1,
        price: "$110.00",
      },
    ],
  },
  {
    _id: "9",
    order_id: "ORD009",
    customer_name: "Ivy League",
    total_amount: "$95.50",
    status: "completed",
    order_date: "2024-09-02",
    products: [
      {
        product_name: "Camera",
        quantity: 1,
        price: "$95.50",
      },
    ],
  },
  {
    _id: "10",
    order_id: "ORD010",
    customer_name: "Jack Bauer",
    total_amount: "$130.00",
    status: "pending",
    order_date: "2024-09-03",
    products: [
      {
        product_name: "Gaming Console",
        quantity: 1,
        price: "$130.00",
      },
    ],
  },
];

export default dummyOrders;
