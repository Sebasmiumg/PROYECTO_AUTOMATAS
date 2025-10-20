
export const seedOrders = [
  { id: "123456", date: "15 Oct, 2023", items: "Burger, Fries (2 artículos)", total: 25.0 },
  { id: "789012", date: "12 Oct, 2023", items: "Pizza, Salad, Drink (3 artículos)", total: 35.0 },
  { id: "345678", date: "10 Oct, 2023", items: "Sushi (1 artículo)", total: 18.0 },
  { id: "901234", date: "5 Oct, 2023", items: "Tacos, Guacamole (2 artículos)", total: 22.0 },
  { id: "567890", date: "1 Oct, 2023", items: "Pasta, Bread, Wine (4 artículos)", total: 45.0 },
];

export const seedReservations = [
  { id: 1, name: "Sofía Martínez", people: 4, time: "19:00", status: "Confirmada", notes: "Alergia a frutos secos. Mesa cerca de ventana." },
  { id: 2, name: "Carlos López", people: 2, time: "20:30", status: "Pendiente" },
  { id: 3, name: "Ana García", people: 6, time: "21:00", status: "Confirmada" },
  { id: 4, name: "Javier Pérez", people: 3, time: "18:00", status: "Cancelada" },
];

export const seedInventory = [
  { id: 1, name: "Tomates", category: "Ingrediente", stock: "150 kg", status: "En Stock" },
  { id: 2, name: "Lechuga", category: "Ingrediente", stock: "50 unidades", status: "En Stock" },
  { id: 3, name: "Hamburguesa Clásica", category: "Plato Preparado", stock: "20 unidades", status: "Bajo Stock" },
  { id: 4, name: "Pizza Margarita", category: "Plato Preparado", stock: "10 unidades", status: "Crítico" },
  { id: 5, name: "Refresco de Cola", category: "Bebida", stock: "300 unidades", status: "En Stock" },
];

export const seedStaff = [
  { id: 1, name: "Sofía Rodríguez", role: "Gerente", email: "sofia.rodriguez@email.com", status: "Activo" },
  { id: 2, name: "Carlos López", role: "Chef", email: "carlos.lopez@email.com", status: "Activo" },
  { id: 3, name: "Ana García", role: "Camarera", email: "ana.garcia@email.com", status: "Activo" },
  { id: 4, name: "Javier Martínez", role: "Cocinero", email: "javier.martinez@email.com", status: "Inactivo" },
  { id: 5, name: "Laura Pérez", role: "Barista", email: "laura.perez@email.com", status: "Activo" },
];

export const seedMenu = [
  { id: 1, name: "Ensalada Fresca", desc: "Mezcla de lechugas, tomate, pepino y...", price: 8.99, cat: "Entradas", status: "Disponible" },
  { id: 2, name: "Salmón a la Parrilla", desc: "Filete de salmón con guarnición de...", price: 18.5, cat: "Platos Fuertes", status: "Disponible" },
  { id: 3, name: "Tarta de Chocolate", desc: "Deliciosa tarta de chocolate con cre...", price: 6.75, cat: "Postres", status: "Agotado" },
  { id: 4, name: "Vino Tinto", desc: "Copa de vino tinto de la casa.", price: 7.5, cat: "Bebidas", status: "Disponible" },
  { id: 5, name: "Agua Mineral", desc: "Botella de agua mineral con gas.", price: 3.0, cat: "Bebidas", status: "Disponible" },
];
