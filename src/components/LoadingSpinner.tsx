
const LoadingSpinner= () => {
  return (
    <div className="flex-center w-full h-32">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-white-50 opacity-25" />
        <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
