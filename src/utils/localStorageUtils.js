export const getData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error getting data for key "${key}":`, error);
    return [];
  }
};

// Save (overwrite) data to localStorage
export const saveData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving data for key "${key}":`, error);
  }
};

// Add or update an item in the array stored in localStorage
export const upsertData = (key, newItem) => {
  const data = getData(key);
  const index = data.findIndex(item => item.id === newItem.id);
  if (index !== -1) {
    data[index] = newItem;
  } else {
    data.push(newItem);
  }
  saveData(key, data);
};

// Delete an item from localStorage by ID
export const deleteData = (key, id) => {
  const data = getData(key).filter(item => item.id !== id);
  saveData(key, data);
};
