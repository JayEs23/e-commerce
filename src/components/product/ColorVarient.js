export const ColorCircles = ({
  variations,
  setIndex,
  setQuantity,
  setTotalPrice,
  price,
}) => {
  const handleVariationChange = (index) => {
    setIndex(index);
    setQuantity(1);
    setTotalPrice(price);
  };
  const colors = variations.reduce((acc, variation) => {
    if (!acc.includes(variation.color_name)) {
      const red = parseInt(variation.color_name.slice(4, 6), 16); // 03 in hexadecimal to decimal
      const green = parseInt(variation.color_name.slice(6, 8), 16); // 2c in hexadecimal to decimal
      const blue = parseInt(variation.color_name.slice(8, 10), 16); // 13 in hexadecimal to decimal

      // Create an RGB color string
      const rgbColor = `rgb(${red}, ${green}, ${blue})`;
      acc.push(rgbColor);
    }
    return acc;
  }, []);
  return (
    <svg
      width="75"
      height="24"
      viewBox="0 0 75 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 1000001535">
        {colors.map((color, index) => (
          <circle
            key={index}
            cx={index * 17 + 12}
            cy="12"
            r="12"
            className="btn"
            onClick={() => handleVariationChange(index)}
            fill={color}
          />
        ))}
      </g>
    </svg>
  );
};
