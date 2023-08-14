import cartData from '../../../public/cart.json';

export default function handler(req, res) {
  res.status(200).json(cartData);
}
