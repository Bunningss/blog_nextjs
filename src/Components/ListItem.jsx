import Link from "next/link";
import styles from "@/styles/ListItem.module.css";

const ListItem = ({ item }) => {
  return (
    <Link href={item.href}>
      <li className={styles.listItem}>{item.name}</li>
    </Link>
  );
};

export default ListItem;
