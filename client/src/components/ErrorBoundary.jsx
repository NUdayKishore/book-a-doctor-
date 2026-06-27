import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <div className="card auth-card p-4">
            <div className="text-danger mb-3" style={{ fontSize: '3rem' }}>⚠️</div>
            <h4>Something went wrong</h4>
            <p className="text-muted">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
