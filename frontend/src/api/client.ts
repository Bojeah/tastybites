
const API_URL = "http://localhost:8000";

export async function fetchCustomers() {
  const res = await fetch(`${API_URL}/customers/`);
  return res.json();
}

export async function getCustomer(id: number) {
  const res = await fetch(`${API_URL}/customers/${id}`);
  return res.json();
}

export async function createCustomer(data: unknown) {
  const res = await fetch(`${API_URL}/customers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCustomer(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCustomer(id: number) {
  await fetch(`${API_URL}/customers/${id}`, { method: "DELETE" });
}

// Order API functions
export async function fetchOrders() {
  const res = await fetch(`${API_URL}/orders/`);
  return res.json();
}

export async function getOrder(id: number) {
  const res = await fetch(`${API_URL}/orders/${id}`);
  return res.json();
}

export async function createOrder(data: unknown) {
  const res = await fetch(`${API_URL}/orders/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateOrder(id: number, data: unknown) {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteOrder(id: number) {
  await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
}