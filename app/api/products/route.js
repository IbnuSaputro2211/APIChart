export async function GET() {
    try {
      // Fetch products from an external API
      const response = await fetch('https://fakestoreapi.com/products');
      let products = await response.json();
      
      // Add stock information to each product
      products = products.map(product => ({
        ...product,
        stock: Math.floor(Math.random() * 10) + 1 // Random stock between 1-10
      }));
      
      // Only return the first 12 products
      products = products.slice(0, 12);
      
      return Response.json(products);
    } catch (error) {
      return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
  }