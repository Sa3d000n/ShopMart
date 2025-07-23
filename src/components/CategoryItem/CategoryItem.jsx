import styles from "./CategoryItem.module.css";
function CategoryItem({ item }) {
  const { image, nameEn: name } = item;
  return (
    <div className="flex flex-col items-center gap-3">
      <img src={image} alt={name + "image"} className="size-24 rounded-full" />
      <p className="font-medium ">{name}</p>
    </div>
  );
}

export default CategoryItem;
