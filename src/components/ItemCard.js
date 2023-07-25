import Image from "next/image";

const ItemCard = ({ item }) => {
  const { id, name, price, image } = item;

  return (
    <div className="item-card">
      <Image src={image} alt={name} loading='lazy' />
      <h3>{name}</h3>
      <p>${price}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ItemCard;
