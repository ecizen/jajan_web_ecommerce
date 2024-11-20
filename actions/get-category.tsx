const GetCategory = async () => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      console.log('Failed to fetch categories');
    }
    const category = await response.json();
    return category;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default GetCategory;