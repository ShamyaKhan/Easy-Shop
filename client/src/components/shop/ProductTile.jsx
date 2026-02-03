import { Card } from "../ui/card";

function ShoppingProductTile({ product }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img src={product?.image} alt="" />
        </div>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
