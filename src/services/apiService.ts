// services/apiService.ts

// Define your data types (replace 'any' with actual types after consulting with your backend developer)
interface Item {
  id: string;
  name: string;
  description: string;

}

// Function to get items (using dummy data)
export async function getItems(): Promise<Item[]> {
  // TODO: Replace with real API call

  // If using Axios (ensure compatibility with Telegram Mini Apps):
  // const response = await axios.get<Item[]>('/api/items');
  // return response.data;

  // Alternatively, using fetch:
  // const response = await fetch('/api/items');
  // const data = await response.json();
  // return data;

  // Dummy data
  return [
    { id: '1', name: 'Item One', description: 'Description of Item One' },
    { id: '2', name: 'Item Two', description: 'Description of Item Two' },
  ];
}
