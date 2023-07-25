export const formatCurrency = (amount) => {
    // Format an amount into a user-friendly currency format
    return `$${amount.toFixed(2)}`;
  };
  
  export const truncateText = (text, maxLength) => {
    // Truncate long text and add ellipsis
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  