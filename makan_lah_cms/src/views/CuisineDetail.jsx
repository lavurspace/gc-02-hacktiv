import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import Button from '../components/Button';

export default function CuisineDetail() {
  const { id } = useParams();
  const [cuisine, setCuisine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    const mockCuisine = {
      id: 1,
      name: 'Nasi Goreng',
      price: 25000,
      category: 'Main Course',
      imgUrl: 'https://example.com/nasi-goreng.jpg',
      description: 'Traditional Indonesian fried rice with special spices',
      ingredients: ['Rice', 'Vegetables', 'Chicken', 'Spices'],
      preparationTime: '15 minutes',
      isAvailable: true
    };
    
    setTimeout(() => {
      setCuisine(mockCuisine);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">{cuisine.name}</h1>
          <p className="text-muted mb-0">Cuisine Details</p>
        </div>
        <div className="d-flex gap-2">
          <Link to={`/edit/${cuisine.id}`} className="text-decoration-none">
            <Button variant="primary">
              <i className="bi bi-pencil me-2"></i>
              Edit Cuisine
            </Button>
          </Link>
          <Link to="/" className="text-decoration-none">
            <Button variant="outline-secondary">
              <i className="bi bi-arrow-left me-2"></i>
              Back to List
            </Button>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <img
                    src={cuisine.imgUrl}
                    alt={cuisine.name}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">Basic Information</h5>
                  <div className="mb-2">
                    <span className="text-muted">Category:</span>
                    <span className="badge bg-primary ms-2">{cuisine.category}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Price:</span>
                    <span className="ms-2">Rp {cuisine.price.toLocaleString()}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Preparation Time:</span>
                    <span className="ms-2">{cuisine.preparationTime}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Status:</span>
                    <span className={`badge ms-2 ${cuisine.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                      {cuisine.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">Description</h5>
                <p className="text-muted mb-0">{cuisine.description}</p>
              </div>

              <div>
                <h5 className="fw-bold mb-3">Ingredients</h5>
                <div className="d-flex flex-wrap gap-2">
                  {cuisine.ingredients.map((ingredient, index) => (
                    <span key={index} className="badge bg-light text-dark">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Quick Actions</h5>
              <div className="d-grid gap-2">
                <Link to={`/upload-image/${cuisine.id}`} className="text-decoration-none">
                  <Button variant="outline-primary" className="w-100">
                    <i className="bi bi-image me-2"></i>
                    Update Image
                  </Button>
                </Link>
                <Button variant="outline-danger" className="w-100">
                  <i className="bi bi-trash me-2"></i>
                  Delete Cuisine
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
