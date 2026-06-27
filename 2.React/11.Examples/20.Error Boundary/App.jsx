import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      errorMessage: "",
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function BuggyComponent() {
  const [shouldThrowError, setShouldThrowError] = React.useState(false);

  if (shouldThrowError) {
    throw new Error("BuggyComponent crashed");
  }

  return (
    <div>
      <h3>Buggy Component</h3>

      <button onClick={() => setShouldThrowError(true)}>
        Throw Error
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;